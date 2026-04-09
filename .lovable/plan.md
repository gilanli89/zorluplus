

## Plan: Rol Yönetimi Sayfası

### Yapılacaklar

**1. Yeni sayfa: `src/pages/admin/AdminRoles.tsx`**

Her rolün (super_admin, admin, moderator, user) yetkilerini gösteren bir karşılaştırma tablosu:
- Satırlar: yetki alanları (Siparişler, Stok, Servis, Kullanıcılar, Roller, İzinler, Talepler vb.)
- Sütunlar: roller
- Her hücrede ✓ / ✗ ikonu ile hangi rolün neye erişebildiği gösterilir
- Rol bazlı kullanıcı sayısı (edge function'dan çekilir)
- Her rolün altında kısa açıklama

Ayrıca sayfanın alt kısmında **kullanıcı rol atama** bölümü:
- Mevcut kullanıcıları listele (edge function üzerinden)
- Her kullanıcının yanında rol değiştirme dropdown'u
- Değişiklik yapınca mevcut `callAdminUsers` PATCH fonksiyonu ile güncelle

**2. Routing ve navigasyon**

- `src/App.tsx`: `/admin/roller` route ekle
- `src/pages/admin/AdminLayout.tsx`: Sidebar'a "Roller" menü öğesi ekle (Shield ikonu ile)

### Teknik Detay

- Yetki matrisi statik veri olarak tanımlanır (DB'de yetki tablosu yok, RLS policy'lere dayalı)
- Kullanıcı listesi ve rol değişikliği mevcut `admin-users` edge function'ı kullanır
- Yeni edge function gerekmez
- 3 dosya değişikliği: 1 yeni sayfa + App.tsx route + AdminLayout.tsx nav item

