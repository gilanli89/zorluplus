
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS sale_price NUMERIC(12,2);
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS original_price NUMERIC(12,2);
ALTER TABLE public.inventory ADD COLUMN IF NOT EXISTS price_updated_at TIMESTAMPTZ;
