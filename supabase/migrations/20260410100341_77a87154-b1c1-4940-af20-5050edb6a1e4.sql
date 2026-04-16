
CREATE OR REPLACE FUNCTION public.is_admin(check_email text)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF check_email IS NULL THEN RETURN FALSE; END IF;
  RETURN EXISTS (SELECT 1 FROM public.admin_emails WHERE email = check_email)
      OR EXISTS (
        SELECT 1 FROM public.user_roles ur
        JOIN auth.users u ON u.id = ur.user_id
        WHERE u.email = check_email
          AND ur.role IN ('super_admin', 'admin', 'moderator')
      );
END;
$$;
