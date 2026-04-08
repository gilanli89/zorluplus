
-- Create product-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read product images
CREATE POLICY "Public can read product images" ON storage.objects
FOR SELECT TO anon, authenticated
USING (bucket_id = 'product-images');

-- Allow authenticated admins to upload product images
CREATE POLICY "Admins can upload product images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'product-images' AND is_admin((auth.jwt() ->> 'email'::text)));

-- Allow authenticated admins to delete product images
CREATE POLICY "Admins can delete product images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'product-images' AND is_admin((auth.jwt() ->> 'email'::text)));
