-- Grant SELECT on inventory_public view to anon and authenticated roles
GRANT SELECT ON public.inventory_public TO anon, authenticated;

-- Fix zero-quantity items
UPDATE public.inventory SET quantity = GREATEST(quantity, 1) WHERE quantity <= 0;