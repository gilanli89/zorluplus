
Sorunun temel sebebini kod ve yetki yapısından net olarak çıkardım:

1. Veritabanı yetkisi tarafı ana sorun değil  
- `inventory` tablosunda authenticated admin için `ALL` yetkili bir politika var.
- Yani checkbox ile seçilen ürünü pasife alma/silme akışı RLS yüzünden bloklanmıyor.

2. Asıl kırılma noktası `bulkDelete()` içindeki akış kontrolü  
`src/pages/admin/AdminInventory.tsx` içinde bulk silme akışı şu sırayla çalışıyor:
- `setBulkProcessing(true)`
- `await supabase.auth.getSession()`
- sonra asıl `update({ is_active: false }).in("id", chunk)` çağrısı
- sadece DB update çağrısına 5 saniyelik timeout uygulanıyor

Buradaki kritik hata:
- `supabase.auth.getSession()` için hiçbir timeout yok
- token yenileme / auth refresh takılırsa kod DB update kısmına hiç ulaşmıyor
- bu yüzden:
  - `bulkProcessing` true kalıyor
  - popup kapanmıyor
  - 5s timeout devreye girmiyor
  - toast hata mesajı hiç çalışmıyor

Yani “5 saniyeden uzun bekliyor ve hata vermiyor” davranışının kesin sebebi, timeout’un yanlış yere uygulanmış olması.

3. Neden tekli switch bazen çalışıyor ama checkbox sonrası popup akışı takılıyor?
- Tekli switch daha kısa ve doğrudan update akışında çalışıyor
- Bulk delete ise popup + processing state + auth refresh + chunk loop içeriyor
- auth adımı askıda kaldığında popup spinner sonsuz görünüyor

Kesin çözüm

`src/pages/admin/AdminInventory.tsx` içinde ortak bir güvenli yardımcı fonksiyon oluşturulmalı ve tüm admin mutasyonları bunun içinden geçmeli:

A. Auth kontrolünü de timeout içine alın
```ts
const withTimeout = <T,>(promise: Promise<T>, ms = 5000) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);
```

B. Session doğrulamayı güvenli hale getirin
```ts
const ensureAdminSession = async () => {
  const { data, error } = await withTimeout(supabase.auth.getSession(), 3000);
  if (error || !data.session) {
    throw new Error("session");
  }

  const adminCheck = await withTimeout(
    supabase.rpc("check_own_admin_status"),
    3000
  );

  if (adminCheck.error || !adminCheck.data) {
    throw new Error("not-admin");
  }

  return data.session;
};
```

C. Bulk delete akışını tek `finally` bloğuyla kapatın
- `setBulkProcessing(false)` mutlaka `finally` içinde çalışmalı
- `setBulkConfirm(null)` de `finally` içinde çalışmalı
- böylece hiçbir yol spinner’ı açık bırakmamalı

D. Hata mesajını kesin üretin
- `timeout` → “İşlem 5 saniyede tamamlanamadı. Oturum veya ağ bağlantısını kontrol edin.”
- `session` → “Oturum doğrulanamadı. Lütfen tekrar giriş yapın.”
- `not-admin` → “Bu işlem için admin yetkisi doğrulanamadı.”
- DB error → doğrudan `error.message` gösterin

E. Aynı güvenli yapı şu fonksiyonlara da taşınmalı
- `bulkDelete`
- `bulkSetActive`
- `bulkSetCategory`
- `publishChanges`
- `handleToggleActive`
- Add/Edit product save işlemleri

Uygulama planı
1. `AdminInventory.tsx` içine ortak `withTimeout`, `ensureAdminSession` ve `getErrorMessage` helper’ları ekleyeceğim.
2. `bulkDelete()` fonksiyonunu:
- önce 3s auth timeout
- sonra 5s mutation timeout
- her durumda `finally` ile state temizliği
şeklinde yeniden kuracağım.
3. Aynı hatanın tekrar etmemesi için diğer tüm admin güncelleme akışlarını da bu ortak helper’lara bağlayacağım.
4. Bulk delete için kullanıcı deneyimini netleştireceğim:
- işlem başlarsa spinner
- en geç 5s içinde başarı veya açıklayıcı hata
- sonsuz bekleme olmayacak

Beklenen sonuç
- Checkbox ile seçilmiş ürünü “Sil” sonrası popup artık sonsuza kadar açık kalmayacak
- Auth refresh takılsa bile en geç 3 saniyede hata gösterecek
- DB işlemi takılırsa en geç 5 saniyede hata gösterecek
- Her hata durumunda popup kapanacak ve kullanıcı kilitli kalmayacak

Teknik not
Şu anki kodda timeout sadece veritabanı update çağrısına uygulanmış. Problemli bölüm auth/session doğrulama aşaması olduğu için kullanıcı hiç hata görmüyor. Kalıcı çözüm, timeout’u sadece mutation’a değil auth doğrulamasına da koymak ve state temizliğini `finally` ile garanti altına almak.
