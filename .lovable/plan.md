

## Mevcut Durum

Yedekleme sistemi **sadece `inventory` (envanter)** tablosunu kapsıyor. `orders` (siparişler) ve `service_requests` (servis talepleri) tabloları yedeklenmiyor.

## Çözüm Planı

### Adım 1: Yeni snapshot tabloları oluştur (migration)

```sql
-- Sipariş yedekleri
CREATE TABLE public.order_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_at timestamptz NOT NULL DEFAULT now(),
  data jsonb NOT NULL,
  order_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.order_snapshots ENABLE ROW LEVEL SECURITY;
-- Aynı RLS: admin okuma/yazma
CREATE POLICY "Admins can read order snapshots" ON public.order_snapshots
  FOR SELECT TO authenticated USING (check_own_admin_status());
CREATE POLICY "Admins can insert order snapshots" ON public.order_snapshots
  FOR INSERT TO authenticated WITH CHECK (check_own_admin_status());

-- Servis talepleri yedekleri
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
```

### Adım 2: Snapshot RPC fonksiyonları oluştur (migration)

```sql
CREATE OR REPLACE FUNCTION public.create_order_snapshot() RETURNS void ...
-- orders tablosunu jsonb olarak order_snapshots'a kaydet

CREATE OR REPLACE FUNCTION public.create_service_snapshot() RETURNS void ...
-- service_requests tablosunu jsonb olarak service_snapshots'a kaydet

-- Mevcut create_inventory_snapshot'u güncelleyerek hepsini tek seferde çağıran
-- bir create_full_backup() fonksiyonu ekle
CREATE OR REPLACE FUNCTION public.create_full_backup() RETURNS void ...

-- Cleanup fonksiyonlarını da güncelle (5 gün retention)
```

### Adım 3: pg_cron zamanlamalarını güncelle (migration)

Mevcut saatlik envanter yedeklemesine ek olarak sipariş ve servis yedeklemelerini de ekle. Ya da `create_full_backup()` ile hepsini tek cron job'da birleştir.

### Adım 4: Restore edge function'ları oluştur

- `restore-orders` — sipariş snapshot'ından geri yükleme
- `restore-services` — servis snapshot'ından geri yükleme
- Mevcut `restore-inventory` pattern'ini takip edecekler

### Adım 5: AdminBackups.tsx UI güncellemesi

Sayfaya **sekmeler (Tabs)** ekle:
- **Envanter** (mevcut)
- **Siparişler** (yeni — `order_snapshots` tablosunu gösterir)
- **Servis Talepleri** (yeni — `service_snapshots` tablosunu gösterir)

Her sekme aynı kart yapısını kullanır (güne göre gruplu, geri yükleme butonu). "Manuel Yedek Al" butonu `create_full_backup()` çağırarak üç tabloyu birden yedekler.

### Değişecek dosyalar

```text
├── supabase/migrations/...       → Yeni tablolar, fonksiyonlar, cron
├── supabase/functions/restore-orders/index.ts    → Yeni edge function
├── supabase/functions/restore-services/index.ts  → Yeni edge function
└── src/pages/admin/AdminBackups.tsx               → Tabs UI
```

