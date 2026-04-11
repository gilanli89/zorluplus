-- Update role from moderator to admin
UPDATE public.user_roles
SET role = 'admin'
WHERE user_id = '330c2630-b303-4b82-961f-8d6243a5b3a9' AND role = 'moderator';

-- Also add to admin_emails for belt-and-suspenders
INSERT INTO public.admin_emails (email)
VALUES ('magosazorlu@gmail.com')
ON CONFLICT DO NOTHING;