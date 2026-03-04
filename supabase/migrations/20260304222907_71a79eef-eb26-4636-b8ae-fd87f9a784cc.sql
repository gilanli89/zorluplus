
-- 1. Lead kaynağı enum
CREATE TYPE public.lead_source AS ENUM ('zorluplus', 'zorluservis', 'whatsapp', 'phone', 'other');
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');
CREATE TYPE public.service_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded');

-- 2. Leads tablosu
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source lead_source NOT NULL DEFAULT 'zorluplus',
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  product_interest TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Servis talepleri
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source lead_source NOT NULL DEFAULT 'zorluservis',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  brand TEXT,
  product_type TEXT,
  issue_description TEXT NOT NULL,
  address TEXT,
  preferred_date DATE,
  status service_status NOT NULL DEFAULT 'pending',
  technician_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Siparişler
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  customer_email TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  status order_status NOT NULL DEFAULT 'pending',
  payment_method TEXT DEFAULT 'cardplus',
  payment_auth_code TEXT,
  payment_trans_id TEXT,
  shipping_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Stok / Envanter
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE,
  product_name TEXT NOT NULL,
  category TEXT,
  brand TEXT,
  quantity INTEGER NOT NULL DEFAULT 0,
  min_quantity INTEGER NOT NULL DEFAULT 5,
  unit_price NUMERIC(12,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Admin e-posta whitelist
CREATE TABLE public.admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Admin rolü kontrolü için fonksiyon
CREATE OR REPLACE FUNCTION public.is_admin(check_email TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails WHERE email = check_email
  )
$$;

-- 8. RLS aktif et
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- 9. Public insert policies (sitelerden veri gelecek)
CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can create service requests" ON public.service_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can create orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 10. Admin read/update/delete policies
CREATE POLICY "Admins can read leads" ON public.leads FOR SELECT TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Admins can update leads" ON public.leads FOR UPDATE TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can read service_requests" ON public.service_requests FOR SELECT TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Admins can update service_requests" ON public.service_requests FOR UPDATE TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Admins can delete service_requests" ON public.service_requests FOR DELETE TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can read orders" ON public.orders FOR SELECT TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Admins can manage inventory" ON public.inventory FOR ALL TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));
CREATE POLICY "Public can read active inventory" ON public.inventory FOR SELECT TO anon USING (is_active = true);

CREATE POLICY "Admins can manage admin_emails" ON public.admin_emails FOR ALL TO authenticated USING (public.is_admin(auth.jwt() ->> 'email'));

-- 11. Updated_at trigger fonksiyonu
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER service_requests_updated_at BEFORE UPDATE ON public.service_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER inventory_updated_at BEFORE UPDATE ON public.inventory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
