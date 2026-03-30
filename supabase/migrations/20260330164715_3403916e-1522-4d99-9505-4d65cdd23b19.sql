
-- Enforce status = 'pending' on public order inserts
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
    payment_trans_id IS NULL AND
    status = 'pending'
  );
