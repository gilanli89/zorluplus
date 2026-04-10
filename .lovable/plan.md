

## Sorun Analizi

**Kök neden:** Sipariş ve servis talepleri tablolarının RLS politikaları `is_admin()` fonksiyonunu kullanıyor. Bu fonksiyon **sadece `admin_emails` tablosunu** kontrol ediyor, `user_roles` tablosunu dikkate almıyor.

- `admin@zorluplus.com` → `admin_emails` tablosunda VAR → veri görebiliyor ✓
- `deniz@zorludigitalplaza.com` → `admin_emails` tablosunda YOK → veri göremiyor ✗
- `halilkavaz@gmail.com` → `admin_emails` tablosunda VAR → veri görebilir ✓
- `gilanli89@gmail.com` → `admin_emails` tablosunda VAR ama `user_roles`'da YOK
- `info@zorludigitalplaza.com` → `admin_emails` tablosunda VAR ama `user_roles`'da YOK

**Etkilenen tablolar:** `orders`, `service_requests`, `leads`, `leave_requests`, `inventory` (yazma), `admin_emails` — hepsi `is_admin()` kullanıyor.

## Çözüm Planı

Mevcut `is_admin()` fonksiyonunu, `admin_emails` tablosuna **ek olarak** `user_roles` tablosunu da kontrol edecek şekilde güncelleyeceğiz. Bu sayede `check_own_admin_status()` fonksiyonuyla tutarlı hale gelecek.

### Adım 1: `is_admin` fonksiyonunu güncelle

```sql
CREATE OR REPLACE FUNCTION public.is_admin(check_email text)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.admin_emails ae
    JOIN auth.users u ON u.email = ae.email
    WHERE u.id = auth.uid() AND ae.email = check_email
  ) OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('super_admin', 'admin')
  );
END;
$$;
```

### Adım 2: `deniz@zorludigitalplaza.com`'u `admin_emails` tablosuna ekle

Tutarlılık için bu e-postayı da `admin_emails` tablosuna ekleyeceğiz.

Bu iki adım, hem `deniz@zorludigitalplaza.com` hem de gelecekte `user_roles` üzerinden admin/super_admin atanan tüm kullanıcıların verilere erişebilmesini sağlar. Mevcut RLS politikalarında başka değişiklik gerekmez.

