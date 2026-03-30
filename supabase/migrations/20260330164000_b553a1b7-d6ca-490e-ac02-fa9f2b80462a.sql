
-- Update orders INSERT policy: enforce payment fields null at RLS level too
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name IS NOT NULL AND
    customer_name <> '' AND
    order_number IS NOT NULL AND
    order_number <> '' AND
    total_amount >= 0 AND
    payment_auth_code IS NULL AND
    payment_trans_id IS NULL
  );

-- Add admin DELETE policy
CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.jwt() ->> 'email'));
