

## Plan: Kullanıcı Aktivite Logları

### Genel Bakış
Admin panelinde yapılan tüm işlemleri (sipariş güncelleme, stok değişikliği, kullanıcı yönetimi, rol değişikliği vb.) veritabanına kaydeden bir aktivite log sistemi kurulacak. Log görüntüleme yalnızca `super_admin` rolüne açık olacak.

### 1. Veritabanı — `activity_logs` tablosu oluştur

```sql
CREATE TABLE public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  action text NOT NULL,          -- örn: 'order_status_update', 'user_create', 'role_change'
  entity_type text NOT NULL,     -- örn: 'order', 'inventory', 'user', 'leave_request'
  entity_id text,                -- ilgili kaydın ID'si
  details jsonb DEFAULT '{}'::jsonb,  -- ek bilgi (eski değer, yeni değer vb.)
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Sadece super_admin okuyabilir
CREATE POLICY "Super admins can read logs"
  ON public.activity_logs FOR SELECT
  TO authenticated
  USING (public.is_super_admin(auth.uid()));

-- Authenticated kullanıcılar log yazabilir (kendi aksiyonları)
CREATE POLICY "Authenticated users can insert logs"
  ON public.activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE INDEX idx_activity_logs_created ON public.activity_logs (created_at DESC);
CREATE INDEX idx_activity_logs_entity ON public.activity_logs (entity_type, entity_id);
```

### 2. Frontend — `logActivity` yardımcı fonksiyonu

`src/lib/activityLogger.ts` dosyası oluşturulacak:
- `logActivity(action, entityType, entityId, details)` — mevcut oturumdan `user_id` ve `user_email` alıp `activity_logs` tablosuna INSERT yapar
- Hata durumunda sessizce loglar (kullanıcı deneyimini bozmaz)

### 3. Mevcut admin sayfalarına log çağrıları ekle

Aşağıdaki işlem noktalarına `logActivity` çağrısı eklenecek:

| Dosya | Aksiyon | entity_type |
|-------|---------|-------------|
| `AdminOrders.tsx` | Sipariş durumu değiştirme | `order` |
| `AdminInventory.tsx` | Ürün ekleme/güncelleme/silme | `inventory` |
| `AdminUsers.tsx` | Kullanıcı oluşturma/ban/silme/şifre sıfırlama | `user` |
| `AdminRoles.tsx` | Rol değiştirme | `user_role` |
| `AdminService.tsx` | Servis talebi güncelleme | `service_request` |
| `AdminLeads.tsx` | Lead güncelleme | `lead` |
| `AdminLeaveRequests.tsx` | İzin talebi onay/red | `leave_request` |
| `AdminLayout.tsx` | Kendi şifresini değiştirme | `self` |

### 4. Yeni sayfa — `AdminActivityLogs.tsx`

- `/admin/aktivite-loglari` rotasına eklenir
- Sadece `super_admin` rolünde görünür (sidebar'da ve sayfa içinde kontrol)
- Tablo: Tarih, Kullanıcı, Aksiyon, Varlık Tipi, Detay
- Filtreleme: entity_type ve tarih aralığı
- Sayfalama (25 kayıt/sayfa)

### 5. Sidebar ve Routing

- `AdminLayout.tsx` — sidebar'a "Aktivite Logları" menü öğesi ekle (sadece `super_admin` için göster, `useAuth` hook'undaki kullanıcıya `is_super_admin` RPC kontrolü ile)
- `useAuth.ts` — `isSuperAdmin` state'i ekle
- `App.tsx` — `/admin/aktivite-loglari` rotası ekle

### Dosya Değişiklikleri

| Dosya | İşlem |
|-------|-------|
| Migration SQL | Yeni tablo + RLS |
| `src/lib/activityLogger.ts` | Yeni dosya |
| `src/pages/admin/AdminActivityLogs.tsx` | Yeni sayfa |
| `src/hooks/useAuth.ts` | `isSuperAdmin` ekle |
| `src/pages/admin/AdminLayout.tsx` | Sidebar öğesi ekle |
| `src/App.tsx` | Rota ekle |
| `AdminOrders.tsx` | Log çağrısı |
| `AdminInventory.tsx` | Log çağrısı |
| `AdminUsers.tsx` | Log çağrısı |
| `AdminRoles.tsx` | Log çağrısı |
| `AdminService.tsx` | Log çağrısı |
| `AdminLeads.tsx` | Log çağrısı |
| `AdminLeaveRequests.tsx` | Log çağrısı |
| `AdminLayout.tsx` | Şifre değişikliği log çağrısı |

