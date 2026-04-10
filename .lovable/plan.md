

## Otomatik Oturum Kapatma (Idle Timeout) ve Test Kullanıcısı

### Sorun
Admin panelinde giriş yapan kullanıcılar süresiz oturum açık kalabiliyor. 5 dakika aktivite yoksa otomatik çıkış yapılması ve öncesinde 10 saniyelik uyarı popup'ı gösterilmesi gerekiyor.

### Çözüm Planı

#### Adım 1: `useIdleTimeout` hook'u oluştur
Yeni dosya: `src/hooks/useIdleTimeout.ts`
- Mouse hareketi, klavye, tıklama, scroll gibi olayları dinler
- Son aktiviteden 5 dakika (300 saniye) sonra uyarı popup'ını tetikler
- Popup açıldıktan 10 saniye içinde aktivite olmazsa `signOut()` çağırır
- Geri sayım süresini (10→0) state olarak döndürür
- `isWarningVisible` ve `resetTimer` fonksiyonları expose eder

#### Adım 2: `IdleTimeoutWarning` bileşeni oluştur
Yeni dosya: `src/components/admin/IdleTimeoutWarning.tsx`
- Dialog/modal olarak görünür
- "Oturumunuz 10 saniye içinde kapatılacak" mesajı + geri sayım gösterimi
- "Oturumu Uzat" butonu — tıklanınca timer sıfırlanır
- Geri sayım 0'a ulaşınca otomatik `signOut` + `/admin/giris`'e yönlendirme

#### Adım 3: `AdminLayout.tsx` güncellemesi
- `useIdleTimeout` hook'unu entegre et
- `IdleTimeoutWarning` bileşenini layout'a ekle
- Logout işleminde activity log kaydı (`idle_timeout_logout`)

#### Adım 4: Test kullanıcısı oluştur
- `admin-users` edge function üzerinden `test@zorluplus.com` kullanıcısı oluştur (şifre: `TestUser2026!`)
- `admin_emails` tablosuna ekle (admin yetkisi için)
- Bu kullanıcı ileride kullanıcı ile ilgili testler için saklanacak

### Değişecek Dosyalar
```text
├── src/hooks/useIdleTimeout.ts              → Yeni: idle detection hook
├── src/components/admin/IdleTimeoutWarning.tsx → Yeni: uyarı popup bileşeni
├── src/pages/admin/AdminLayout.tsx           → Hook + bileşen entegrasyonu
└── Migration / Edge Function                → Test kullanıcısı oluşturma
```

