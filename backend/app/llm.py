"""Provider-agnostic LLM client.

Chỉ dùng cho endpoint tư vấn (/advice). Pipeline gợi ý phối đồ
(/recommendations) hoàn toàn không gọi LLM.

Hỗ trợ: gemini | openai | anthropic | openrouter | none
Tất cả đều gọi qua HTTP (httpx) nên không cần SDK riêng cho từng provider.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass

import httpx


SUPPORTED_PROVIDERS = ("gemini", "openai", "anthropic", "openrouter")


class LLMNotConfigured(RuntimeError):
    """LLM bị tắt hoặc thiếu cấu hình. Caller nên dùng tư vấn theo luật."""


class LLMCallFailed(RuntimeError):
    """Gọi provider thất bại (sai tên model, hết quota, timeout...)."""


@dataclass(frozen=True)
class LLMConfig:
    provider: str
    model: str
    api_key: str
    base_url: str
    timeout: float
    temperature: float
    max_tokens: int


def _env_float(name: str, default: float) -> float:
    try:
        return float(os.getenv(name, "") or default)
    except ValueError:
        return default


def _env_int(name: str, default: int) -> int:
    try:
        return int(os.getenv(name, "") or default)
    except ValueError:
        return default


def _placeholder(value: str) -> bool:
    cleaned = value.strip().strip('"').strip("'")
    return not cleaned or cleaned.upper().startswith("MY_") or cleaned in {"changeme", "xxx"}


def load_config() -> LLMConfig:
    """Đọc cấu hình LLM từ env. Raise LLMNotConfigured nếu chưa dùng được."""
    provider = (os.getenv("LLM_PROVIDER") or "none").strip().lower()
    if provider in {"", "none", "off", "disabled"}:
        raise LLMNotConfigured("LLM_PROVIDER=none — đang dùng tư vấn theo luật.")
    if provider not in SUPPORTED_PROVIDERS:
        raise LLMNotConfigured(
            f"LLM_PROVIDER='{provider}' không hợp lệ. Chọn một trong: {', '.join(SUPPORTED_PROVIDERS)}, none."
        )

    defaults = {
        "gemini": ("GEMINI", "gemini-2.5-flash", "https://generativelanguage.googleapis.com"),
        "openai": ("OPENAI", "gpt-4.1-mini", "https://api.openai.com/v1"),
        "anthropic": ("ANTHROPIC", "claude-sonnet-4-5", "https://api.anthropic.com"),
        "openrouter": ("OPENROUTER", "anthropic/claude-sonnet-4.5", "https://openrouter.ai/api/v1"),
    }
    prefix, default_model, default_base = defaults[provider]

    api_key = os.getenv(f"{prefix}_API_KEY", "")
    if _placeholder(api_key):
        raise LLMNotConfigured(
            f"Thiếu {prefix}_API_KEY cho LLM_PROVIDER={provider}. Điền vào .env hoặc đặt LLM_PROVIDER=none."
        )

    model = (os.getenv(f"{prefix}_MODEL") or "").strip() or default_model
    base_url = ((os.getenv(f"{prefix}_BASE_URL") or "").strip() or default_base).rstrip("/")
    return LLMConfig(
        provider=provider,
        model=model,
        api_key=api_key.strip().strip('"').strip("'"),
        base_url=base_url,
        timeout=_env_float("LLM_TIMEOUT_SECONDS", 30.0),
        temperature=_env_float("LLM_TEMPERATURE", 0.2),
        max_tokens=_env_int("LLM_MAX_TOKENS", 1200),
    )


def _request_for(config: LLMConfig, system: str, user: str) -> tuple[str, dict[str, str], dict[str, object]]:
    """Trả về (url, headers, json body) cho từng provider. Đều yêu cầu JSON output."""
    if config.provider == "gemini":
        return (
            f"{config.base_url}/v1beta/models/{config.model}:generateContent",
            {"Content-Type": "application/json", "x-goog-api-key": config.api_key},
            {
                "systemInstruction": {"parts": [{"text": system}]},
                "contents": [{"role": "user", "parts": [{"text": user}]}],
                "generationConfig": {
                    "temperature": config.temperature,
                    "maxOutputTokens": config.max_tokens,
                    "responseMimeType": "application/json",
                },
            },
        )

    if config.provider == "anthropic":
        return (
            f"{config.base_url}/v1/messages",
            {
                "Content-Type": "application/json",
                "x-api-key": config.api_key,
                "anthropic-version": "2023-06-01",
            },
            {
                "model": config.model,
                "system": system,
                "messages": [{"role": "user", "content": user}],
                "temperature": config.temperature,
                "max_tokens": config.max_tokens,
            },
        )

    # openai + openrouter dùng cùng giao thức chat completions.
    headers = {"Content-Type": "application/json", "Authorization": f"Bearer {config.api_key}"}
    if config.provider == "openrouter":
        headers["HTTP-Referer"] = os.getenv("APP_URL", "http://localhost:3000")
        headers["X-Title"] = "VietFashion AI Stylist"
    return (
        f"{config.base_url}/chat/completions",
        headers,
        {
            "model": config.model,
            "messages": [
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
            "temperature": config.temperature,
            "max_tokens": config.max_tokens,
            "response_format": {"type": "json_object"},
        },
    )


def _extract_text(provider: str, payload: dict[str, object]) -> str:
    try:
        if provider == "gemini":
            parts = payload["candidates"][0]["content"]["parts"]  # type: ignore[index]
            return "".join(str(part.get("text", "")) for part in parts)
        if provider == "anthropic":
            blocks = payload["content"]  # type: ignore[index]
            return "".join(str(block.get("text", "")) for block in blocks if block.get("type") == "text")
        return str(payload["choices"][0]["message"]["content"])  # type: ignore[index]
    except (KeyError, IndexError, TypeError) as error:
        raise LLMCallFailed(f"Không đọc được nội dung trả về từ {provider}: {error}") from error


def _parse_json(text: str) -> dict[str, object]:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = cleaned.split("```")[1] if "```" in cleaned[3:] else cleaned[3:]
        cleaned = cleaned.removeprefix("json").strip()
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError as error:
        raise LLMCallFailed(f"LLM không trả về JSON hợp lệ: {error}") from error
    if not isinstance(parsed, dict):
        raise LLMCallFailed("LLM trả về JSON nhưng không phải object.")
    return parsed


async def complete_json(system: str, user: str, config: LLMConfig | None = None) -> tuple[dict[str, object], LLMConfig]:
    """Gọi provider đang cấu hình và trả về JSON đã parse.

    Lỗi được raise rõ ràng (không fallback âm thầm) để caller quyết định
    hiển thị tư vấn theo luật kèm lý do.
    """
    config = config or load_config()
    url, headers, body = _request_for(config, system, user)
    try:
        async with httpx.AsyncClient(timeout=config.timeout) as client:
            response = await client.post(url, headers=headers, json=body)
    except httpx.HTTPError as error:
        raise LLMCallFailed(f"Không kết nối được {config.provider}: {error}") from error

    if response.status_code >= 400:
        detail = response.text[:400]
        hint = ""
        if response.status_code in (400, 404) and config.model:
            hint = f" Kiểm tra lại tên model '{config.model}' trong danh sách model của {config.provider}."
        raise LLMCallFailed(f"{config.provider} trả về HTTP {response.status_code}: {detail}{hint}")

    return _parse_json(_extract_text(config.provider, response.json())), config


def describe_config() -> dict[str, object]:
    """Dùng cho /llm/health — không bao giờ trả về API key."""
    try:
        config = load_config()
    except LLMNotConfigured as error:
        return {"enabled": False, "provider": (os.getenv("LLM_PROVIDER") or "none"), "reason": str(error)}
    return {"enabled": True, "provider": config.provider, "model": config.model, "base_url": config.base_url}
