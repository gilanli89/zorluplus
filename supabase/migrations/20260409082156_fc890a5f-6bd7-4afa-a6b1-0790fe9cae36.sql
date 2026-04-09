
-- Drop and recreate inventory_public view with all editable fields
DROP VIEW IF EXISTS public.inventory_public;

CREATE VIEW public.inventory_public
WITH (security_invoker = on) AS
SELECT
  id,
  sku,
  product_name,
  brand,
  category,
  description,
  attributes,
  image_url,
  original_price,
  sale_price,
  quantity,
  is_active
FROM public.inventory;

-- Grant access
GRANT SELECT ON public.inventory_public TO anon, authenticated;
