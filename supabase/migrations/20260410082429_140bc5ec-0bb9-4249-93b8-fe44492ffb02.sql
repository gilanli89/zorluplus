-- Add new columns to inventory table
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS model text;
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS description_en text;
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS images jsonb DEFAULT '[]'::jsonb;

-- Drop and recreate view with new columns
DROP VIEW IF EXISTS public.inventory_public;

CREATE VIEW public.inventory_public AS
SELECT
  id,
  sku,
  product_name,
  brand,
  category,
  description,
  attributes,
  quantity,
  original_price,
  sale_price,
  is_active,
  image_url,
  updated_at,
  model,
  title_en,
  description_en,
  images
FROM public.inventory;