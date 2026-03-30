
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'super_admin'::app_role
FROM auth.users u
WHERE u.email = 'halilkavaz@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
