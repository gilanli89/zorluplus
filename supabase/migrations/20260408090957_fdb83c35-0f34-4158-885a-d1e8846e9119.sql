-- 1. Drop anon SELECT on inventory (route public reads through inventory_public view)
DROP POLICY IF EXISTS "Public can read active inventory" ON public.inventory;

-- 2. Restrict leave_requests INSERT to admins only (external app disabled)
DROP POLICY IF EXISTS "Authenticated users can submit leave requests" ON public.leave_requests;
CREATE POLICY "Admins can create leave requests"
  ON public.leave_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    is_admin((auth.jwt() ->> 'email'::text))
    AND full_name IS NOT NULL
    AND full_name <> ''
    AND start_date IS NOT NULL
    AND end_date IS NOT NULL
    AND end_date >= start_date
  );

-- 3. Add JSONB array check on orders items
ALTER TABLE public.orders ADD CONSTRAINT items_is_array
  CHECK (jsonb_typeof(items) = 'array');