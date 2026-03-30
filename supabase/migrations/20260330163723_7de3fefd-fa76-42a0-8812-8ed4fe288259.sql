
-- Create a public view exposing only non-sensitive inventory fields
CREATE VIEW public.inventory_public
WITH (security_invoker = on) AS
  SELECT id, product_name, sku, brand, category, image_url,
         sale_price, original_price, quantity, is_active
  FROM public.inventory
  WHERE is_active = true;

-- Replace the anon SELECT policy: deny direct table access for anon
DROP POLICY IF EXISTS "Public can read active inventory" ON public.inventory;
CREATE POLICY "Public can read active inventory via view"
  ON public.inventory FOR SELECT
  TO anon
  USING (false);
