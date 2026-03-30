
-- Fix leave_requests RLS: restrict SELECT and UPDATE to admins only
DROP POLICY IF EXISTS "Admins can read all leave requests" ON public.leave_requests;
CREATE POLICY "Admins can read all leave requests"
  ON public.leave_requests FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.jwt() ->> 'email'));

DROP POLICY IF EXISTS "Admins can update leave requests" ON public.leave_requests;
CREATE POLICY "Admins can update leave requests"
  ON public.leave_requests FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (public.is_admin(auth.jwt() ->> 'email'));

-- Fix is_admin oracle: replace with version that requires authentication
CREATE OR REPLACE FUNCTION public.is_admin(check_email text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = check_email
  );
END;
$$;

-- Revoke anon execute on is_admin
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM anon;
