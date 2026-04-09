

## Plan: Kullanıcı Adına Tıklayınca Rol Detay/Düzenleme Dialog'u

### Mevcut Durum
Şu an roller tablo içinde inline Select ile değiştiriliyor. Kullanıcı, email'e tıklayarak bir detay dialog'u açmak ve rolü oradan yönetmek istiyor.

### Yapılacaklar

**`src/pages/admin/AdminUsers.tsx` güncellemesi:**

1. Kullanıcı email'ini tıklanabilir yap (cursor-pointer, underline, hover efekti)
2. Tıklandığında bir **Dialog** aç:
   - Kullanıcı email'i ve kayıt tarihi
   - Mevcut rol (Badge olarak)
   - Rol değiştirme Select dropdown'u
   - "Kaydet" butonu ile rol güncelleme
3. Tablo içindeki mevcut inline Select'i kaldır, yerine sadece rol Badge'i koy (daha temiz görünüm)

### Teknik Detay

- Yeni state: `selectedUser` (tıklanan kullanıcı) ve `editRole` (seçilen yeni rol)
- Dialog içinde mevcut `handleRoleChange` fonksiyonu kullanılacak
- Tek dosya değişikliği: `src/pages/admin/AdminUsers.tsx`

