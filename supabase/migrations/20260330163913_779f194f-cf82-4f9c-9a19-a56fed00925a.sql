
-- Tighten INSERT policies with basic field validation instead of bare WITH CHECK (true)

-- Orders: require customer_name and order_number
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    customer_name IS NOT NULL AND
    customer_name <> '' AND
    order_number IS NOT NULL AND
    order_number <> '' AND
    total_amount >= 0
  );

-- Leads: require full_name
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
CREATE POLICY "Anyone can create leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL AND
    full_name <> ''
  );

-- Service requests: require full_name, phone, issue_description
DROP POLICY IF EXISTS "Anyone can create service requests" ON public.service_requests;
CREATE POLICY "Anyone can create service requests"
  ON public.service_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL AND
    full_name <> '' AND
    phone IS NOT NULL AND
    phone <> '' AND
    issue_description IS NOT NULL AND
    issue_description <> ''
  );

-- Leave requests: require full_name, start_date, end_date
DROP POLICY IF EXISTS "Anyone can insert leave requests" ON public.leave_requests;
CREATE POLICY "Anyone can insert leave requests"
  ON public.leave_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL AND
    full_name <> '' AND
    start_date IS NOT NULL AND
    end_date IS NOT NULL AND
    end_date >= start_date
  );
