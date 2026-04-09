CREATE POLICY "Public can read inventory"
ON public.inventory
FOR SELECT
TO anon, authenticated
USING (true);