

## Problem Analizi

Şifre değiştirme akışında iki kritik sorun var:

1. **Hata mesajları İngilizce**: `supabase.auth.updateUser()` hata döndüğünde ham Supabase mesajı gösteriliyor (örn. "New password should be different from the old password", "Password should be at least 6 characters"). `catch` bloğu da aynı şekilde ham `e.message` gösteriyor.

2. **Mevcut şifre doğrulama yöntemi session bozuyor**: Mevcut şifre doğrulamak için `signInWithPassword` çağrılıyor. Bu, auth state change tetikliyor ve `useAuth` hook'undaki listener devreye giriyor. Eğer bir hata olursa session tutarsız hale gelebilir.

## Çözüm Planı

### 1. AdminLayout.tsx - `handleChangePassword` fonksiyonunu düzelt

- Supabase'den gelen İngilizce hata mesajlarını Türkçe karşılıklarına çeviren bir `translateAuthError` yardımcı fonksiyonu ekle
- Yaygın hatalar:
  - "New password should be different from the old password" → "Yeni şifre mevcut şifreden farklı olmalıdır"
  - "Password should be at least 6 characters" → "Şifre en az 6 karakter olmalıdır"
  - "Auth session missing" → "Oturum süresi dolmuş, tekrar giriş yapın"
  - Bilinmeyen hatalar → "Şifre değiştirme sırasında bir hata oluştu. Lütfen tekrar deneyin."
- `catch` bloğundaki `e.message` yerine de aynı çeviri fonksiyonunu kullan
- `signInWithPassword` ile mevcut şifre doğrulama adımında hata olursa session'ın bozulmaması için try/catch ile sarmalayıp, hata durumunda mevcut session'ı korumak için `getSession()` kontrolü ekle

**Dosya:** `src/pages/admin/AdminLayout.tsx`

