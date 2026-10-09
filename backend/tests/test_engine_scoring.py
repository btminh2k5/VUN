"""Kiểm chứng các bất biến của engine chấm điểm. Không cần database.

Chạy:  cd backend && python3 tests/test_engine_scoring.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import app.engine as E
from app.engine import build_recommendations, build_data_quality
from app.models import RecommendationRequest

# Áo dài: CÓ occasion. Áo yếm: occasion rỗng (đúng như DB thật). style: rỗng cả hai.
garments = [
    dict(id=1, category='Áo dài', name='Áo dài màu đỏ', color='Đỏ',
         image_url='/i/ad.jpg', region='VN', occasion=['Tết','Cưới hỏi'], style=None,
         description=None, cultural_meaning='x', cultural_notes=None, source='Nguồn A',
         type_review_status='needs_review', image_review_status='draft'),
    dict(id=2, category='Áo yếm', name='Áo yếm màu đỏ', color='Đỏ',
         image_url='/i/ay.jpg', region=None, occasion=[], style=None,
         description=None, cultural_meaning='y', cultural_notes=None, source='Nguồn B',
         type_review_status='needs_review', image_review_status='draft'),
    dict(id=3, category='Áo dài', name='Áo dài màu vàng', color='Vàng',
         image_url='/i/ad-vang.jpg', region='VN', occasion=['Tết'], style=['Hiện đại'],
         description=None, cultural_meaning='z', cultural_notes=None, source='Nguồn C',
         type_review_status='needs_review', image_review_status='draft'),
]
styling = [
    dict(id=10, item_group='accessories', type_code='nonla', category='Nón lá', name='Nón lá',
         color=None, image_url='/i/nl.jpg', description=None, cultural_notes=None,
         source=None, review_status='draft'),
    dict(id=11, item_group='footwear', type_code='guocmoc', category='Guốc mộc', name='Guốc mộc',
         color=None, image_url='/i/gm.jpg', description=None, cultural_notes=None,
         source=None, review_status='draft'),
]

req = RecommendationRequest(occasion='Tết', style='Hiện đại', color='Đỏ', limit=4, max_per_category=2)
res = build_recommendations(req, garments, styling)
print(f"Số outfit: {len(res)}  (quota 2/loại)")
for r in res:
    b = r.score_breakdown
    print(f"\n  {r.title[:46]}")
    print(f"    điểm {r.score} | màu={b.color} style={b.style} bối cảnh={b.occasion} văn hoá={b.cultural}")
    print(f"    dùng: {r.score_basis.dimensions_used} | thiếu: {r.score_basis.dimensions_missing}")
    print(f"    trọng số hiệu dụng: {r.score_basis.effective_weights}")
    print(f"    reviewed={r.reviewed} | warnings={len(r.warnings)}")
    print(f"    {r.explanation}")

print("\n--- Kiểm chứng các bất biến ---")
assert all(r.score_basis.effective_weights == {} or abs(sum(r.score_basis.effective_weights.values()) - 1.0) < 0.01 for r in res), "trọng số không chuẩn hoá về 1"
print("  OK: trọng số luôn chuẩn hoá về 1.0")
# style: garment_types.style rỗng NHƯNG phụ kiện mang phong cách, nên chiều này
# vẫn phải được chấm — nếu không, lựa chọn phong cách của người dùng vô tác dụng.
assert all(r.score_breakdown.style is not None for r in res), "style phải được chấm từ phụ kiện"
print("  OK: style trống ở DB nhưng vẫn chấm được từ phụ kiện")

ad = [r for r in res if 'dài' in r.title][0]
ay = [r for r in res if 'yếm' in r.title][0]
print(f"  Áo dài  (CÓ occasion):  bối cảnh={ad.score_breakdown.occasion}, thiếu={ad.score_basis.dimensions_missing}")
print(f"  Áo yếm  (occasion rỗng): bối cảnh={ay.score_breakdown.occasion}, thiếu={ay.score_basis.dimensions_missing}")
assert all(not any('kiểm duyệt' in w and 'Metadata phụ kiện' in w for w in r.warnings) for r in res)
print("  OK: warnings không còn chứa cảnh báo kiểm duyệt toàn database")
assert all(r.reviewed is False for r in res)
print("  OK: reviewed=False vì không có dòng nào 'reviewed'")

dq = build_data_quality(garments, styling, res)
print(f"\n--- DataQuality (cấp response, nói MỘT lần) ---")
print(f"  trang phục đã duyệt {dq.garments_reviewed}/{dq.garments_total} | phụ kiện {dq.styling_items_reviewed}/{dq.styling_items_total}")
print(f"  thiếu: {dq.missing_dimensions}")
for n in dq.notes: print(f"  - {n}")

print("\n--- Quota: max_per_category=1 ---")
res1 = build_recommendations(RecommendationRequest(occasion='Tết', style='Hiện đại', color='Đỏ', limit=4, max_per_category=1), garments, styling)
cats = [next(i.category for i in r.items if i.group=='garment') for r in res1]
print(f"  loại trang phục theo thứ tự: {cats}")
print(f"  điểm giảm dần: {[r.score for r in res1]}")
assert res1 == sorted(res1, key=lambda r: -r.score), "thứ tự điểm bị đảo"
print("  OK: quota không đảo thứ tự điểm")


# --- Tư vấn theo luật phải sống được khi MỌI tiêu chí đều thiếu dữ liệu ---
# Hồi quy: advice.py từng làm round(cultural * 10) và crash khi cultural=None.
from app.advice import rule_based_advice
from app.models import (Item, MockupLayer, OutfitMockup2D, OutfitRecommendation,
                        ScoreBasis, ScoreBreakdown)

print("\n--- Tư vấn theo luật với mọi tiêu chí = None ---")
bare = OutfitRecommendation(
    id='o-none', title='Trang phục thiếu metadata',
    items=[Item(id='garment-9', group='garment', category='Áo yếm',
                name='Áo yếm', color=None, image_url='/i/y.jpg')],
    score=0.0,
    score_breakdown=ScoreBreakdown(color=None, style=None, occasion=None, cultural=None),
    score_basis=ScoreBasis(dimensions_used=[],
                           dimensions_missing=['color', 'cultural', 'occasion', 'style'],
                           effective_weights={}),
    explanation='x',
    mockup_2d=OutfitMockup2D(layers=[MockupLayer(item_id='garment-9', role='garment',
                                                 image_url='/i/y.jpg', z_index=10)]),
)
advice = rule_based_advice(req, bare)
assert advice.cultural_check.score == 0
print("  OK: không crash, cultural_check.score = 0")
blob = advice.color_harmony_note + ' '.join(advice.styling_tips) + advice.gen_z_concept
assert 'None' not in blob, "lộ chuỗi 'None' ra giao diện"
print("  OK: không in chuỗi 'None' ra bất kỳ field nào")


# --- Pool phụ kiện không được cắt trước bằng điểm ------------------------------
print("\n--- Hard filter và độ phủ pool ---")
import inspect
src = inspect.getsource(E.build_recommendations)
assert 'rank_item' not in src, "pre-sort phụ kiện theo affinity đã quay lại"
assert '[:6]' not in src and '[:8]' not in src and '[:4]' not in src, "lại cắt pool bằng điểm"
print("  OK: không cắt pool phụ kiện bằng affinity trước khi chấm")

# Chỉ soi CODE: bỏ docstring và comment, nếu không chính lời giải thích
# "không được dùng affinity" lại bị tính là vi phạm.
import ast as _ast
def code_only(fn):
    tree = _ast.parse(inspect.getsource(fn).strip())
    body = tree.body[0].body
    if body and isinstance(body[0], _ast.Expr) and isinstance(body[0].value, _ast.Constant):
        body = body[1:]          # bỏ docstring
    return "\n".join(_ast.unparse(node) for node in body)

hf_src = code_only(E.hard_filter)
for forbidden in ('_score(', 'affinity', '== 10.0', '> 16'):
    assert forbidden not in hf_src, f"hard_filter dùng điểm: {forbidden}"
print("  OK: hard_filter chỉ dùng điều kiện bắt buộc, không dùng điểm")

# --- Khớp màu theo từ, không theo substring -----------------------------------
# Hồi quy: "Đỏ" -> 'do' và "Xanh (chưa xác định sắc độ)" chứa 'do' trong 'sắc độ',
# nên áo yếm xanh từng được chấm 10/10 cho yêu cầu màu đỏ.
print("\n--- Khớp màu ---")
fake = lambda c: {'color': c}
assert E.garment_color_score(fake('Xanh (chưa xác định sắc độ)'), 'Đỏ') == 3.5, "khớp màu giả quay lại"
print("  OK: 'Xanh (chưa xác định sắc độ)' không còn khớp 'Đỏ'")
assert E.garment_color_score(fake('Đỏ'), 'Đỏ') == 10.0
assert E.garment_color_score(fake('Vàng be'), 'Vàng') == 8.5
assert E.garment_color_score(fake('Trắng'), 'Đỏ') == 7.5
assert E.garment_color_score(fake(None), 'Đỏ') is None
print("  OK: bốn mức điểm màu đúng (10.0 / 8.5 / 7.5 / 3.5) và None khi thiếu dữ liệu")

# Màu trên form là constraint của áo chính. "Cùng hệ màu" chỉ dành cho đánh
# giá phối màu, tuyệt đối không cho áo vàng lọt vào kết quả khi chọn đỏ.
assert res and all(
    next(item.color for item in outfit.items if item.group == 'garment') == 'Đỏ'
    for outfit in res
), "chọn Đỏ vẫn trả trang phục màu khác"
assert build_recommendations(
    RecommendationRequest(occasion='Tết', style='Hiện đại', color='Đen'),
    garments, styling,
) == [], "không có áo đúng màu phải trả rỗng, không tự đổi màu"
print("  OK: chọn màu là ràng buộc cứng; Đỏ không trả Vàng, màu không có trả rỗng")

# --- Đa dạng hoá chạy SAU khi chấm, không đảo thứ tự điểm ---------------------
print("\n--- Đa dạng hoá ---")
rows = [{'raw_items': ({'name': f'g{i}'},), 'category': 'A' if i < 4 else 'B',
         'accessory_code': 'x' if i % 2 else 'y', 'garment_key': str(i),
         'total': 10 - i * 0.1} for i in range(8)]
picked = E.diversify(rows, limit=4, max_per_category=2, max_per_accessory=2)
assert [r['total'] for r in picked] == sorted([r['total'] for r in picked], reverse=True), "đa dạng hoá đảo thứ tự điểm"
assert len(picked) == 4, "không trả đủ limit khi có đủ áo khác nhau"
print("  OK: giữ thứ tự điểm và trả đủ limit khi có đủ áo khác nhau")

# Cùng một chiếc áo không được xuất hiện hai lần: hai gợi ý chỉ khác phụ kiện
# trông như trùng lặp, vì Step 2 hiển thị ảnh và tên của trang phục chính.
same = [{'raw_items': ({'name': f'a{i}'},), 'category': 'A',
         'accessory_code': f'acc{i}', 'garment_key': 'G1', 'total': 10 - i * 0.1}
        for i in range(5)]
picked = E.diversify(same, limit=5, max_per_category=5, max_per_accessory=5)
assert len(picked) == 1, "không được dùng lại cùng một chiếc áo để lấp đủ limit"
first_pass = E.diversify(same, limit=1, max_per_category=5, max_per_accessory=5)
assert len(first_pass) == 1
print("  OK: quota max_per_garment=1 luôn chặn tên/ảnh áo trùng ở cả hai lượt")
