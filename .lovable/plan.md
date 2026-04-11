

## Problem Analizi

Admin panelinde sayfalar arası geçişte login ekranına geri dönme sorununun iki kök nedeni var:

### 1. `useAuth` Hook, Context Değil
`useAuth` bir React Context/Provider değil, bağımsız bir hook. Her çağrıldığında kendi state'ini oluşturuyor. AdminLayout mount olduğunda `loading=true, user=null, isAdmin=false` ile başlıyor. Normalde AdminLayout Outlet pattern ile mount kalır, ama Suspense boundary veya herhangi bir üst bileşen yeniden render olursa hook sıfırdan başlar ve `loading` bitene kadar geçen sürede yanlışlıkla redirect tetiklenebilir.

### 2. `fetchAdminStatus` Timeout Sorunu
RPC çağrıları (`check_own_admin_status`, `is_super_admin`) 5 saniyelik timeout ile sarılmış. Ağ yavaşsa veya Supabase gecikmeli yanıt verirse timeout oluşuyor ve `isAdmin: false` dönüyor → redirect tetikleniyor.

### 3. `TOKEN_REFRESHED` Event'i Session Bozabiliyor
Auth logs'ta `refresh_token_not_found` hatası görülüyor. Supabase token refresh sırasında `INITIAL_SESSION` veya `TOKEN_REFRESHED` event'i tetikliyor ama `onAuthStateChange` handler'ı bunları ignore ediyor. Bu sırada `getSession()` eski/geçersiz session dönerse AdminLayout redirect yapıyor.

---

## Çözüm Planı

### Adım 1: `useAuth`'u Shared Context'e Dönüştür
- `src/contexts/AuthContext.tsx` oluştur — `useAuth` mantığını bir Provider'a taşı
- `App.tsx`'te `<AuthProvider>` ekle (BrowserRouter içine)
- `useAuth` artık context'ten okuyacak — her bileşen aynı state'i paylaşacak
- AdminLayout dahil tüm tüketici bileşenler mount/unmount olsa bile auth state sıfırlanmayacak

### Adım 2: Timeout ve Race Condition Düzeltmeleri
- `AUTH_TIMEOUT`'u 5s → 10s'ye çıkar
- `fetchAdminStatus`'ta timeout olduğunda `isAdmin: false` döndürmek yerine mevcut değeri koru (sadece başarılı yanıtlarda güncelle)
- `onAuthStateChange`'de `TOKEN_REFRESHED` event'ini de handle et (session'ı güncelle ama admin check'i tekrarlama)

### Adım 3: AdminLayout Guard Mantığını Güçlendir
- `loading` durumunda redirect yapmak yerine loading spinner göster (mevcut davranış korunuyor)
- Route değişiminde `getSession()` kontrolünü kaldır — session zaten `onAuthStateChange` ile takip ediliyor, bu ekstra kontrol race condition'a neden oluyor

---

## Teknik Detaylar

**Yeni dosya:** `src/contexts/AuthContext.tsx`
- createContext + AuthProvider + useAuth hook
- Tek bir `useEffect` ile session yönetimi
- `TOKEN_REFRESHED` event handling

**Düzenlenen dosyalar:**
- `src/App.tsx` — AuthProvider ekleme
- `src/hooks/useAuth.ts` — Context'ten re-export
- `src/pages/admin/AdminLayout.tsx` — Route change session check kaldırma

