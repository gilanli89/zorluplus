
-- Restrict leave_requests INSERT to authenticated users only
DROP POLICY IF EXISTS "Anyone can insert leave requests" ON public.leave_requests;
CREATE POLICY "Authenticated users can submit leave requests"
  ON public.leave_requests FOR INSERT
  TO authenticated
  WITH CHECK (
    full_name IS NOT NULL AND full_name <> '' AND
    start_date IS NOT NULL AND
    end_date IS NOT NULL AND
    end_date >= start_date
  );
