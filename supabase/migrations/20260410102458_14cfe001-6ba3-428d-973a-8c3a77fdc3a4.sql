
-- Sipariş yedekleri tablosu
CREATE TABLE public.order_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  order_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.order_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read order snapshots" ON public.order_snapshots
  FOR SELECT TO authenticated USING (check_own_admin_status());
CREATE POLICY "Admins can insert order snapshots" ON public.order_snapshots
  FOR INSERT TO authenticated WITH CHECK (check_own_admin_status());

-- Servis talepleri yedekleri tablosu
CREATE TABLE public.service_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  request_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.service_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read service snapshots" ON public.service_snapshots
  FOR SELECT TO authenticated USING (check_own_admin_status());
CREATE POLICY "Admins can insert service snapshots" ON public.service_snapshots
  FOR INSERT TO authenticated WITH CHECK (check_own_admin_status());

-- Sipariş snapshot RPC
CREATE OR REPLACE FUNCTION public.create_order_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.order_snapshots (snapshot_at, data, order_count)
  SELECT now(),
         COALESCE(jsonb_agg(row_to_json(o)), '[]'::jsonb),
         count(*)
  FROM public.orders o;
END;
$$;

-- Servis snapshot RPC
CREATE OR REPLACE FUNCTION public.create_service_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.service_snapshots (snapshot_at, data, request_count)
  SELECT now(),
         COALESCE(jsonb_agg(row_to_json(s)), '[]'::jsonb),
         count(*)
  FROM public.service_requests s;
END;
$$;

-- Birleşik yedekleme fonksiyonu
CREATE OR REPLACE FUNCTION public.create_full_backup()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  PERFORM create_inventory_snapshot();
  PERFORM create_order_snapshot();
  PERFORM create_service_snapshot();
END;
$$;

-- Cleanup fonksiyonunu güncelle (sipariş ve servis yedeklerini de temizle)
CREATE OR REPLACE FUNCTION public.cleanup_old_snapshots()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.inventory_snapshots WHERE snapshot_at < now() - interval '5 days';
  DELETE FROM public.order_snapshots WHERE snapshot_at < now() - interval '5 days';
  DELETE FROM public.service_snapshots WHERE snapshot_at < now() - interval '5 days';
END;
$$;
