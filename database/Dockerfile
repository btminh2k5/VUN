# syntax=docker/dockerfile:1

# =============================================================================
# VietFashion PostgreSQL — image database tự chứa.
#
# Multi-stage:
#   stage "seed"     : sinh SQL import từ chính thư mục ảnh dataset (node).
#                      Nhờ vậy image luôn khớp với số ảnh thực tế, không phụ
#                      thuộc vào việc lập trình viên có nhớ chạy generator hay không.
#   stage "runtime"  : postgres:18, chỉ copy các file .sql đã sinh sang.
#                      Node và dataset ảnh KHÔNG đi vào image cuối.
#
# Build context là gốc repository:
#   docker build -f database/Dockerfile -t vietfashion-db .
# =============================================================================

# ---------- stage 1: sinh SQL seed từ dataset ----------
FROM node:22-alpine AS seed

WORKDIR /build

# Generator không có dependency ngoài, chỉ cần source + ảnh để đọc tên file.
COPY database/postgresql/dataset_v2/ ./database/postgresql/dataset_v2/
COPY public/images/dataset/ ./public/images/dataset/

# Generator ghi đè 02_import_dataset.sql và 06_import_styling_items.sql.
# Nó tự fail nếu có file ảnh không khớp mappings — build dừng ngay tại đây
# thay vì đẩy một database thiếu dữ liệu lên runtime.
RUN node database/postgresql/dataset_v2/generate-import.mjs

# ---------- stage 2: image database chạy thật ----------
FROM postgres:18 AS runtime

ENV POSTGRES_INITDB_ARGS="--encoding=UTF8"

# docker-entrypoint-initdb.d chạy theo thứ tự tên file, nên đánh số rõ ràng.
COPY --from=seed /build/database/postgresql/dataset_v2/01_schema.sql \
     /docker-entrypoint-initdb.d/01_schema.sql
COPY --from=seed /build/database/postgresql/dataset_v2/02_import_dataset.sql \
     /docker-entrypoint-initdb.d/02_seed.sql
COPY --from=seed /build/database/postgresql/dataset_v2/04_update_type_information.sql \
     /docker-entrypoint-initdb.d/03_type_information.sql
COPY --from=seed /build/database/postgresql/dataset_v2/05_styling_items_schema.sql \
     /docker-entrypoint-initdb.d/04_styling_items_schema.sql
COPY --from=seed /build/database/postgresql/dataset_v2/06_import_styling_items.sql \
     /docker-entrypoint-initdb.d/05_import_styling_items.sql

COPY --from=seed /build/database/postgresql/dataset_v2/10_verified_item_metadata.sql \
     /docker-entrypoint-initdb.d/06_verified_item_metadata.sql

EXPOSE 5432

HEALTHCHECK --interval=5s --timeout=5s --retries=12 --start-period=20s \
    CMD pg_isready -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" || exit 1
