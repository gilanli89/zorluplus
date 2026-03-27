
-- Assign super_admin to existing users
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'super_admin'::app_role
FROM auth.users
WHERE email IN ('halilkavaz@gmail.com', 'deniz@zorludigitalplaza.com')
ON CONFLICT (user_id, role) DO NOTHING;
