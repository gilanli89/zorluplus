GRANT EXECUTE ON FUNCTION public.is_admin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_own_admin_status() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_super_admin(uuid) TO authenticated;