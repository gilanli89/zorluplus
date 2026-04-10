

## Problem
Idle timeout sonrası `supabase.auth.signOut()` çağrılıyor ancak tarayıcıda `navigate("/admin/giris")` kullanılıyor. Kullanıcı browser back butonu ile önceki admin sayfasına dönebiliyor ve localStorage'daki eski session token'ı ile oturuma devam edebiliyor.

## Root Cause
- `navigate()` tarayıcı geçmişine yeni kayıt ekler, back ile geri dönülebilir
- `signOut()` async olduğundan, session temizlenmeden sayfa geçişi olabilir
- AdminLayout sadece ilk yüklemede auth kontrolü yapıyor, back ile gelince mevcut state ile render edebilir

## Plan

### 1. IdleTimeoutWarning - `navigate` yerine `replace` kullan
- Timeout logout sonrası `navigate("/admin/giris", { replace: true })` kullanarak browser history'den admin sayfalarını temizle
- "Şimdi Çıkış Yap" butonunda da aynı şekilde `replace: true`

### 2. AdminLayout - Her route değişiminde session doğrulama
- `useEffect` içinde `location.pathname` değiştiğinde aktif session'ı `supabase.auth.getSession()` ile tekrar kontrol et
- Session yoksa veya geçersizse `navigate("/admin/giris", { replace: true })` ile yönlendir
- Bu sayede back butonu ile gelinen sayfalarda da oturum doğrulanır

### 3. AdminLogin - Mevcut session'ı temizle
- Login sayfası mount olduğunda `supabase.auth.getSession()` kontrol et
- Eğer aktif session varsa ve admin değilse, `signOut()` çağır (eski/geçersiz session temizliği)
- Login sayfasına `replace` ile yönlendirme yaparak back butonuyla admin paneline dönüşü engelle

**Dosyalar:** `IdleTimeoutWarning.tsx`, `AdminLayout.tsx`, `AdminLogin.tsx`

