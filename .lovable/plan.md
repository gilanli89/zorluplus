

## Plan: Admin Login E-posta Girişi Düzeltmesi

### Sorun
`AdminLogin.tsx` dosyasında kullanıcı adı alanı yalnızca `[a-z0-9]` karakterlerine izin veriyor ve otomatik olarak `@zorluplus.com` ekliyor. Farklı domainli kullanıcılar (örn. `deniz@zorludigitalplaza.com`) giriş yapamıyor.

### Çözüm
Kullanıcı adı alanını tam e-posta adresi girişine dönüştür.

### Değişiklikler — `src/pages/admin/AdminLogin.tsx`

1. `username` state'ini `email` olarak değiştir
2. Input'u `type="email"` yap, karakter filtresini kaldır
3. `const email = \`\${username}@zorluplus.com\`` satırını kaldır, doğrudan girilen e-postayı kullan
4. Placeholder'ı `"admin@zorluplus.com"` gibi bir e-posta örneğine güncelle
5. Label'ı "Kullanıcı Adı" yerine "E-posta" yap

### Tek dosya değişikliği
- `src/pages/admin/AdminLogin.tsx`

