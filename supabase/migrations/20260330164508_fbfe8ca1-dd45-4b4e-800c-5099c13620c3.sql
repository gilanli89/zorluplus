
-- 1. Create a safe function that only checks the CALLING user's admin status
CREATE OR REPLACE FUNCTION public.check_own_admin_status()
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
    SELECT 1 FROM public.admin_emails
    WHERE email = (auth.jwt() ->> 'email')
  );
END;
$$;

-- 2. Revoke is_admin from authenticated to prevent enumeration
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM PUBLIC;

-- 3. Add admin DELETE policy for leave_requests
CREATE POLICY "Admins can delete leave requests"
  ON public.leave_requests FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.jwt() ->> 'email'));
