

## Problem

AdminLogin sayfasındaki `useEffect` (satır 17-26) potansiyel bir race condition oluşturuyor:

1. Sayfa yüklendiğinde mevcut session'ı kontrol ediyor
2. `check_own_admin_status` RPC çağrısı ağ gecikmesi veya hata nedeniyle `null/undefined` dönerse → `!isAdmin` true olur → kullanıcı sign out ediliyor
3. Bu sign out ile yeni login denemesi çakışıyor
4. Ayrıca `handleSubmit` içinde RPC hatası durumunda hata detayı gösterilmiyor — sadece "admin yetkisine sahip değil" mesajı

## Çözüm

### Adım 1: AdminLogin useEffect'ini güvenli hale getir
- RPC hata durumunda sign out yapmamasını sağla (sadece `data === false` durumunda sign out yap, `null/undefined` durumunda değil)
- Mevcut geçerli session varsa ve admin ise direkt `/admin`'e yönlendir

### Adım 2: handleSubmit'e hata yakalama ekle
- RPC çağrısında `error` kontrolü ekle
- Hata durumunda detaylı console.log ekle (debug için)
- Ağ hatası durumunda "admin yetkisine sahip değil" yerine doğru hata mesajı göster

### Adım 3: AuthContext'teki race condition korumasını güçlendir
- `fetchAdminStatus` timeout'unda mevcut cache'li değerleri koru (zaten yapılmış, doğruluğunu kontrol et)

## Teknik Detay

**AdminLogin.tsx değişiklikleri:**
```typescript
// useEffect - sadece data === false olduğunda sign out
useEffect(() => {
  supabase.auth.getSession().then(async ({ data: { session } }) => {
    if (session) {
      const { data: isAdmin, error } = await supabase.rpc("check_own_admin_status");
      if (error) {
        console.error("Admin check error:", error);
        return; // Hata varsa sign out YAPMA
      }
      if (isAdmin === true) {
        navigate("/admin", { replace: true }); // Zaten admin, yönlendir
      } else if (isAdmin === false) {
        await supabase.auth.signOut(); // Kesin olarak admin değil
      }
    }
  });
}, []);

// handleSubmit - hata kontrolü ekle
const { data, error: rpcError } = await supabase.rpc("check_own_admin_status");
if (rpcError) {
  console.error("Admin status RPC error:", rpcError);
  toast.error("Yetki kontrolü yapılamadı. Lütfen tekrar deneyin.");
} else if (data) {
  navigate("/admin");
} else {
  await supabase.auth.signOut();
  toast.error("Bu hesap admin yetkisine sahip değil.");
}
```

