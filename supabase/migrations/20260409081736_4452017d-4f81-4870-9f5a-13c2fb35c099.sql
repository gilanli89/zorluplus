-- Fix zero-quantity items
UPDATE public.inventory SET quantity = GREATEST(quantity, 1) WHERE quantity <= 0;