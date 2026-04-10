

## Hata Mesajlarının Kalıcı Olması

### Sorun
`toast.error()` ile gösterilen hata mesajları otomatik kapanıyor. Kullanıcı mesajı okuyamadan kayboluyor.

### Çözüm
`src/components/ui/sonner.tsx` dosyasındaki Sonner `<Toaster>` bileşenine `duration` ayarı eklenecek:
- Varsayılan toastlar normal sürede kapanmaya devam edecek
- `toast.error()` çağrılarına `duration: Infinity` eklenerek hata mesajları **yalnızca kullanıcı kapatana kadar** açık kalacak

İki yaklaşım mümkün:

**Yaklaşım (tek dosya değişikliği):** `sonner.tsx`'deki `toastOptions`'a global `duration` ayarı eklemek yerine, projede `toast.error` kullanılan tüm yerleri değiştirmemek için Sonner'ın `toastOptions` içinde error türü için `duration: Infinity` ayarlanacak. Ancak Sonner bunu doğrudan desteklemediği için en temiz yol: **tüm `toast.error()` çağrılarına `{ duration: Infinity }` eklemek** veya bir **wrapper fonksiyon** oluşturmak.

**Seçilen yaklaşım:** `src/lib/toast.ts` adında bir wrapper oluşturup tüm importları buna yönlendirmek yerine, daha basit olarak `sonner.tsx`'deki Toaster'a `duration={Infinity}` ekleyip sadece error toastlarını kalıcı yapmak mümkün değil (Sonner API kısıtı). Bu yüzden:

1. **`src/components/ui/sonner.tsx`** — Sonner bileşenine `closeButton={true}` ekle (tüm toastlarda kapatma butonu göster)
2. **Projede `toast.error()` kullanan ~14 dosyada** — `toast.error("mesaj", { duration: Infinity })` olarak güncelle

Bu sayede hata mesajları kullanıcı X butonuna basana kadar açık kalır, başarı mesajları normal sürede kapanır.

### Değişecek Dosyalar
```text
├── src/components/ui/sonner.tsx              → closeButton={true} eklenmesi
├── src/pages/admin/AdminLogin.tsx            → toast.error duration: Infinity
├── src/pages/admin/AdminUsers.tsx            → toast.error duration: Infinity
├── src/pages/admin/AdminService.tsx          → toast.error duration: Infinity
├── src/pages/admin/AdminInventory.tsx        → toast.error duration: Infinity
├── src/pages/admin/AdminLeads.tsx            → toast.error duration: Infinity
├── src/pages/admin/AdminActivityLogs.tsx     → toast.error duration: Infinity
├── src/pages/admin/AdminBackups.tsx          → toast.error duration: Infinity
├── src/pages/admin/AdminLayout.tsx           → toast.error duration: Infinity
├── src/pages/CheckoutPage.tsx               → toast.error duration: Infinity
├── src/components/QuoteForm.tsx             → toast.error duration: Infinity
└── (diğer toast.error içeren dosyalar)      → toast.error duration: Infinity
```

