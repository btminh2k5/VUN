-- Add accessories and footwear to an existing wardrobe database.
-- Safe to rerun. Does not modify clothing rows or infer outfit compatibility.
BEGIN;
CREATE TABLE IF NOT EXISTS wardrobe.styling_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_group TEXT NOT NULL CHECK (item_group IN ('accessories', 'footwear')),
    type_code TEXT NOT NULL CHECK (btrim(type_code) <> ''),
    category TEXT NOT NULL CHECK (btrim(category) <> ''),
    name TEXT NOT NULL CHECK (btrim(name) <> ''),
    dataset_path TEXT NOT NULL UNIQUE,
    image_url TEXT NOT NULL CHECK (btrim(image_url) <> ''),
    color TEXT,
    description TEXT,
    cultural_notes TEXT,
    source TEXT,
    image_source TEXT,
    image_license TEXT,
    review_status TEXT NOT NULL DEFAULT 'draft'
        CHECK (review_status IN ('draft', 'needs_review', 'reviewed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_styling_items_group_type
    ON wardrobe.styling_items(item_group, type_code);
DROP TRIGGER IF EXISTS touch_styling_items ON wardrobe.styling_items;
CREATE TRIGGER touch_styling_items BEFORE UPDATE ON wardrobe.styling_items
FOR EACH ROW EXECUTE FUNCTION wardrobe.touch_updated_at();
COMMIT;
