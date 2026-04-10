

## Sorun Analizi

Admin panelindeki yavaşlığın birden fazla kaynağı var:

### 1. useAuth — Çift RPC çağrısı
`useAuth.ts` hem `onAuthStateChange` hem de `getSession` içinde aynı iki RPC fonksiyonunu (`check_own_admin_status` + `is_super_admin`) çağırıyor. Bu, her sayfa yüklemesinde **4 ayrı veritabanı çağrısı** demek (olması gereken 2 yerine). Ayrıca bu çağrılarda timeout yok — RPC yavaş yanıt verirse sayfa sonsuza kadar "Yükleniyor..." durumunda kalıyor.

### 2. React Query — staleTime ve timeout eksikliği
Tüm admin sayfalarındaki `useQuery` çağrıları (Dashboard'da 6 adet, Orders, Service, Leads, Users, Activity Logs) hiçbirinde `staleTime` yok. Sekme değiştirip geri dönünce her seferinde tüm sorgular yeniden çalışıyor. Ayrıca hiçbirinde timeout yok — AdminInventory hariç.

### 3. AdminUsers — Edge Function timeout'suz
`callAdminUsers` fonksiyonu `fetch` kullanarak edge function çağırıyor ama `AbortController` ile timeout koruması yok.

## Çözüm Planı

### Adım 1: useAuth'a timeout ve dedup ekleme
- `getSession` bloğunu ana auth kontrol noktası olarak tutup, `onAuthStateChange` içindeki RPC çağrılarını sadece `SIGNED_IN` / `SIGNED_OUT` event'lerinde çalıştır (her token yenilemesinde değil)
- Her iki RPC çağrısına 5 saniyelik `Promise.race` timeout ekle
- Timeout durumunda `loading: false` olarak fallback yap

### Adım 2: Global React Query ayarları
- `queryClient` default options'a `staleTime: 30_000` (30 saniye) ekle — bu sayede kısa sürede aynı veriler tekrar çekilmez
- Tüm admin sorgularında veri çekme süresini sınırlamak için bir yardımcı `withTimeout` wrapper kullan (5 saniye)

### Adım 3: Admin sayfalarına timeout ekleme
- `AdminDashboard`, `AdminOrders`, `AdminService`, `AdminLeads`, `AdminActivityLogs` query fonksiyonlarına `withTimeout(promise, 5000)` wrapper'ı ekle
- `AdminUsers` `callAdminUsers` fonksiyonuna `AbortController` ile 5 saniyelik timeout ekle

### Adım 4: Loading state iyileştirmesi
- Tüm admin sayfalarında timeout sonrası kullanıcıya "Veri yüklenemedi, tekrar deneyin" mesajı göster (sonsuz spinner yerine)

### Teknik Detay

```text
Değişecek dosyalar:
├── src/hooks/useAuth.ts          → Timeout + dedup
├── src/main.tsx veya App.tsx     → QueryClient staleTime
├── src/pages/admin/AdminDashboard.tsx  → withTimeout
├── src/pages/admin/AdminOrders.tsx     → withTimeout  
├── src/pages/admin/AdminService.tsx    → withTimeout
├── src/pages/admin/AdminLeads.tsx      → withTimeout
├── src/pages/admin/AdminActivityLogs.tsx → withTimeout
├── src/pages/admin/AdminUsers.tsx      → AbortController timeout
└── src/lib/adminQueryHelpers.ts  → Yeni: paylaşılan withTimeout util
```

Mevcut AdminInventory'deki `withTimeout` pattern'i zaten doğru çalışıyor; aynı yaklaşım diğer tüm admin sayfalarına genelleştirilecek.

