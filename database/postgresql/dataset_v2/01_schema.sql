-- Run once in your existing VUNdata database. Does not change public.outfits.
BEGIN;
CREATE SCHEMA wardrobe;
CREATE TABLE wardrobe.garment_types (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    region TEXT,
    occasion TEXT[] NOT NULL DEFAULT '{}',
    style TEXT[] NOT NULL DEFAULT '{}',
    description TEXT,
    origin TEXT,
    cultural_meaning TEXT,
    cultural_notes TEXT,
    source TEXT,
    review_status TEXT NOT NULL DEFAULT 'draft'
        CHECK (review_status IN ('draft', 'needs_review', 'reviewed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE wardrobe.garment_variants (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    garment_type_id BIGINT NOT NULL REFERENCES wardrobe.garment_types(id),
    dataset_path TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    audience TEXT,
    color TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    accessories TEXT[] NOT NULL DEFAULT '{}',
    image_source TEXT,
    image_license TEXT,
    review_status TEXT NOT NULL DEFAULT 'draft'
        CHECK (review_status IN ('draft', 'needs_review', 'reviewed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_variants_type_color ON wardrobe.garment_variants(garment_type_id, color);
CREATE FUNCTION wardrobe.touch_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;
CREATE TRIGGER touch_types BEFORE UPDATE ON wardrobe.garment_types
FOR EACH ROW EXECUTE FUNCTION wardrobe.touch_updated_at();
CREATE TRIGGER touch_variants BEFORE UPDATE ON wardrobe.garment_variants
FOR EACH ROW EXECUTE FUNCTION wardrobe.touch_updated_at();

-- View gives one spreadsheet-like listing without duplicating shared information.
CREATE VIEW wardrobe.outfit_catalog AS
SELECT v.id, t.name AS category, v.name, v.audience, v.color,
       t.region, t.occasion, t.style, v.image_url, v.dataset_path,
       t.description AS type_description, v.description AS variant_description,
       t.origin, t.cultural_meaning, t.cultural_notes, t.source,
       v.accessories, v.image_source, v.image_license,
       t.review_status AS type_review_status, v.review_status AS image_review_status
FROM wardrobe.garment_variants v
JOIN wardrobe.garment_types t ON t.id = v.garment_type_id;
COMMIT;
