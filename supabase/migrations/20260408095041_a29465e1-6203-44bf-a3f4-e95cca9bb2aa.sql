
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS attributes jsonb DEFAULT '{}'::jsonb;
