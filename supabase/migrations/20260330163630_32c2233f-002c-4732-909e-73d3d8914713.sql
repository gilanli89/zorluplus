
-- Prevent public users from setting payment fields on INSERT
-- These should only be set server-side by the cardplus-callback edge function
CREATE OR REPLACE FUNCTION public.sanitize_order_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Strip payment fields on INSERT - only server (service_role) should set these
  NEW.payment_auth_code := NULL;
  NEW.payment_trans_id := NULL;
  RETURN NEW;
END;
$$;

CREATE TRIGGER sanitize_order_insert_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.sanitize_order_insert();
