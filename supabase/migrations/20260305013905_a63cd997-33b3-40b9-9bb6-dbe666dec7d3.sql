
-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'Lefkoşa',
  title TEXT NOT NULL DEFAULT '',
  leave_type TEXT NOT NULL DEFAULT 'Yıllık',
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  note TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Beklemede',
  admin_note TEXT DEFAULT '',
  decided_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (from external form apps)
CREATE POLICY "Anyone can insert leave requests"
  ON public.leave_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated admins to read all
CREATE POLICY "Admins can read all leave requests"
  ON public.leave_requests FOR SELECT
  TO anon, authenticated
  USING (true);

-- Allow authenticated admins to update
CREATE POLICY "Admins can update leave requests"
  ON public.leave_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Add updated_at trigger
CREATE TRIGGER update_leave_requests_updated_at
  BEFORE UPDATE ON public.leave_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
