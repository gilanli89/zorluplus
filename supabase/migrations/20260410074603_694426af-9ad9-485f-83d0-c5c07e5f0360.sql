
-- Create inventory_snapshots table
CREATE TABLE public.inventory_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  product_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inventory_snapshots ENABLE ROW LEVEL SECURITY;

-- Only admins can read snapshots
CREATE POLICY "Admins can read snapshots"
  ON public.inventory_snapshots
  FOR SELECT
  TO authenticated
  USING (public.check_own_admin_status());

-- Only admins can insert snapshots (manual trigger)
CREATE POLICY "Admins can insert snapshots"
  ON public.inventory_snapshots
  FOR INSERT
  TO authenticated
  WITH CHECK (public.check_own_admin_status());

-- Index for fast lookup by time
CREATE INDEX idx_inventory_snapshots_at ON public.inventory_snapshots (snapshot_at DESC);

-- Function to create a snapshot
CREATE OR REPLACE FUNCTION public.create_inventory_snapshot()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.inventory_snapshots (snapshot_at, data, product_count)
  SELECT now(),
         COALESCE(jsonb_agg(row_to_json(i)), '[]'::jsonb),
         count(*)
  FROM public.inventory i;
END;
$$;

-- Function to cleanup old snapshots (keep 5 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_snapshots()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.inventory_snapshots
  WHERE snapshot_at < now() - interval '5 days';
END;
$$;

-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Schedule hourly snapshot
SELECT cron.schedule(
  'hourly-inventory-snapshot',
  '0 * * * *',
  $$SELECT public.create_inventory_snapshot()$$
);

-- Schedule daily cleanup at 3 AM
SELECT cron.schedule(
  'daily-snapshot-cleanup',
  '0 3 * * *',
  $$SELECT public.cleanup_old_snapshots()$$
);

-- Create first snapshot immediately
SELECT public.create_inventory_snapshot();
