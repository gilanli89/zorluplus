

## Plan: Şifre Sıfırlama/Değiştirme Sistemi

### Yapılacaklar

**1. Şifre validasyon kuralı (ortak)**
- Minimum 8 karakter, en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter
- `src/lib/passwordValidation.ts` dosyası oluştur — hem admin hem kullanıcı tarafında kullanılacak

**2. Edge function güncelleme: `supabase/functions/admin-users/index.ts`**
- PATCH action'a `action: "reset_password"` ekle
- Admin/super_admin herhangi bir kullanıcının şifresini sıfırlayabilsin (`serviceClient.auth.admin.updateUserById`)
- Şifre validasyonunu server-side uygula
- POST (kullanıcı oluşturma) ve PATCH (şifre sıfırlama) için aynı validasyon

**3. Admin panelinde şifre sıfırlama: `src/pages/admin/AdminUsers.tsx`**
- Kullanıcı detay dialog'una "Şifre Sıfırla" bölümü ekle
- Yeni şifre + onay alanları, validasyon göstergeleri
- Admin ve super_admin rolüne sahip kullanıcılar bu butonu görecek

**4. Kullanıcının kendi şifresini değiştirmesi**
- Yeni edge function gereksiz — `supabase.auth.updateUser({ password })` client-side çalışır (login olan kullanıcı kendi şifresini değiştirebilir)
- `src/pages/admin/AdminLayout.tsx` header'ına profil/şifre değiştir butonu ekle
- Şifre değiştirme dialog'u: mevcut şifre doğrulama + yeni şifre + onay + validasyon göstergeleri

**5. Yeni kullanıcı oluşturma formuna validasyon ekle**
- `AdminUsers.tsx` yeni kullanıcı dialog'undaki şifre alanına aynı validasyon kurallarını uygula

### Teknik Detay

- **Validasyon regex**: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/`
- **Dosyalar**: 
  - `src/lib/passwordValidation.ts` (yeni)
  - `supabase/functions/admin-users/index.ts` (PATCH güncelleme)
  - `src/pages/admin/AdminUsers.tsx` (şifre sıfırlama UI)
  - `src/pages/admin/AdminLayout.tsx` (kendi şifresini değiştirme butonu + dialog)

