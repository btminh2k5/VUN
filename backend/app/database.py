import os
from typing import Any

import asyncpg


class WardrobeRepository:
    def __init__(self) -> None:
        self.pool: asyncpg.Pool | None = None

    async def connect(self) -> None:
        self.pool = await asyncpg.create_pool(
            host=os.getenv("POSTGRES_HOST", "postgres"),
            port=int(os.getenv("POSTGRES_PORT", "5432")),
            database=os.getenv("POSTGRES_DB", "vietfashion"),
            user=os.getenv("POSTGRES_USER", "vietfashion"),
            password=os.getenv("POSTGRES_PASSWORD", "123456"),
            min_size=1,
            max_size=5,
            timeout=5,
        )

    async def close(self) -> None:
        if self.pool:
            await self.pool.close()

    async def healthy(self) -> bool:
        if not self.pool:
            return False
        try:
            return await self.pool.fetchval("SELECT TRUE") is True
        except Exception:
            return False

    async def load_catalog(self) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
        if not self.pool:
            raise RuntimeError("PostgreSQL connection is not available")
        async with self.pool.acquire() as connection:
            garments = await connection.fetch(
                """
                SELECT id, category, name, color, image_url, region, occasion, style,
                       variant_description AS description, cultural_meaning,
                       cultural_notes, source, type_review_status, image_review_status
                FROM wardrobe.outfit_catalog
                ORDER BY category, color, id
                """
            )
            styling = await connection.fetch(
                """
                SELECT id, item_group, type_code, category, name, color, image_url,
                       description, cultural_notes, source, review_status
                FROM wardrobe.styling_items
                ORDER BY item_group, category, id
                """
            )
        return [dict(row) for row in garments], [dict(row) for row in styling]
