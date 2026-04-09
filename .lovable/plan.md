

## Admin Paneli — Tüm Eylemler ve Kullanıcı Yönetimi Sayfası Planı

---

### 1. Admin Panelindeki Mevcut Eylemler (Kategorize Edilmiş)

#### 📊 ÖZET (Dashboard) — `/admin`
- Sipariş, ürün, servis talebi ve düşük stok sayılarını görüntüleme
- Son 5 siparişi listeleme
- Son 5 servis talebini listeleme

#### 🛒 SİPARİŞLER — `/admin/siparisler`
- Tüm siparişleri listeleme ve görüntüleme
- Sipariş durumunu değiştirme (Beklemede → Ödendi → Kargoda → Teslim Edildi → İptal → İade)

#### 📦 STOK YÖNETİMİ — `/admin/stok`
- Ürün ekleme (ad, marka, SKU, kategori, açıklama, fiyat, indirimli fiyat, stok, görsel, özellikler)
- Ürün bilgilerini düzenleme (fiyat, açıklama, kategori, marka vb.)
- Ürün aktif/pasif toggle (Switch ile anında)
- Ürün silme (soft delete)
- Toplu işlemler: toplu silme, toplu aktif/pasif yapma, toplu kategori değiştirme
- Değişiklikleri yayınlama (Batch Publish)
- Ürün arama ve filtreleme (kategori, marka, stok durumu)
- Görsel yükleme (Storage'a upload)

#### 🔧 SERVİS TALEPLERİ — `/admin/servis`
- Tüm servis taleplerini listeleme
- Servis durumunu değiştirme (Beklemede → Devam Ediyor → Tamamlandı → İptal)

#### 📋 MÜŞTERİ TALEPLERİ — `/admin/talepler` (route mevcut, menüden gizli)
- Lead listesini görüntüleme
- Lead durumunu değiştirme (Yeni → İletişime Geçildi → Nitelikli → Dönüştürüldü → Kayıp)

#### 📅 İZİN TALEPLERİ — `/admin/izinler` (route mevcut, menüden gizli)
- İzin taleplerini listeleme ve takvim görünümü
- İzin talebini onaylama / reddetme
- Admin notu ekleme

#### 🔐 KİMLİK DOĞRULAMA
- Admin girişi (email/şifre)
- Oturum yönetimi ve çıkış

#### ❌ HENÜZ MEVCUT OLMAYAN
- **Kullanıcı yönetimi** (ekleme, silme, yetkilendirme, askıya alma)
- Rol atama/değiştirme

---

### 2. Kullanıcı Yönetimi Sayfası Planı

Yeni bir **"Kullanıcılar"** sayfası oluşturulacak: `/admin/kullanicilar`

#### Özellikler

**Kullanıcı Listeleme:**
- `user_roles` tablosundaki tüm kullanıcıları listeleme
- Auth kullanıcı bilgilerini (email, oluşturulma tarihi) edge function ile çekme
- Rol, durum ve email bilgilerini tablo formatında gösterme

**Kullanıcı Ekleme:**
- Email + şifre ile yeni admin/moderator kullanıcı oluşturma (edge function üzerinden `supabase.auth.admin.createUser`)
- Rol atama (admin, moderator, user)

**Rol Yönetimi:**
- Mevcut kullanıcının rolünü değiştirme (Select dropdown)
- `user_roles` tablosuna update/insert

**Kullanıcı Askıya Alma / Aktifleştirme:**
- Edge function üzerinden `supabase.auth.admin.updateUserById({ ban_duration })` ile askıya alma
- Askıya alınmış kullanıcıyı tekrar aktifleştirme

**Kullanıcı Silme:**
- Onay dialog'u ile kullanıcı silme
- Edge function üzerinden `supabase.auth.admin.deleteUser`
- İlgili `user_roles` kaydı cascade ile silinir

#### Teknik Detaylar

**Yeni dosyalar:**
- `src/pages/admin/AdminUsers.tsx` — Kullanıcı yönetimi sayfası
- `supabase/functions/admin-users/index.ts` — Auth Admin API işlemleri için edge function

**Edge function (`admin-users`):**
- `GET` — Tüm auth kullanıcılarını listele
- `POST` — Yeni kullanıcı oluştur + rol ata
- `PATCH` — Kullanıcıyı askıya al / aktifleştir
- `DELETE` — Kullanıcıyı sil

Edge function içinde `check_own_admin_status` veya `is_super_admin` RPC ile yetki doğrulaması yapılacak. Sadece super_admin rolündeki kullanıcılar bu işlemleri yapabilecek.

**Mevcut dosya değişiklikleri:**
- `src/pages/admin/AdminLayout.tsx` — Sidebar'a "Kullanıcılar" menü öğesi ekleme
- `src/App.tsx` — `/admin/kullanicilar` route ekleme

**Güvenlik:**
- Tüm işlemler `service_role` key ile edge function üzerinden yapılacak
- Frontend'den gelen isteklerde JWT doğrulaması + super_admin kontrolü
- Normal admin'ler bu sayfayı göremeyecek (sadece super_admin)

