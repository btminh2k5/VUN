-- Includes drafts for development/pgAdmin. New items have not been reviewed.
SELECT item_group, count(*) AS number_of_images
FROM wardrobe.styling_items GROUP BY item_group ORDER BY item_group;

SELECT id, category, name, color, image_url, review_status
FROM wardrobe.styling_items
WHERE item_group = 'accessories' ORDER BY category, id;

SELECT id, category, name, color, image_url, review_status
FROM wardrobe.styling_items
WHERE item_group = 'footwear' ORDER BY category, id;

-- NULL means not yet recorded, not that the item has no color.
SELECT id, name, dataset_path FROM wardrobe.styling_items
WHERE color IS NULL ORDER BY id;
