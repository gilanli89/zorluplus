
-- Allow anon to read active inventory (the view already filters is_active=true)
DROP POLICY IF EXISTS "Public can read active inventory via view" ON public.inventory;
CREATE POLICY "Public can read active inventory"
  ON public.inventory FOR SELECT
  TO anon
  USING (is_active = true);
