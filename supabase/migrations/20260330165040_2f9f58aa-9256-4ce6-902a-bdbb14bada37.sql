
-- Fix is_admin to verify email ownership via auth.users
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
    SELECT 1
    FROM public.admin_emails ae
    JOIN auth.users u ON u.email = ae.email
    WHERE u.id = auth.uid()
      AND ae.email = check_email
  );
END;
$$;

-- Also fix check_own_admin_status to use the same pattern
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
    SELECT 1
    FROM public.admin_emails ae
    JOIN auth.users u ON u.email = ae.email
    WHERE u.id = auth.uid()
  );
END;
$$;

-- Ensure permissions are correct
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin(text) FROM authenticated;
