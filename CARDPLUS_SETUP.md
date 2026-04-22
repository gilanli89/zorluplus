# CardPlus Merchant Panel Konfigürasyonu

## 🏦 Gerekli Ayarlar

### 1. Callback URL (ZORUNLU!)

**CardPlus Merchant Panel → Settings → 3D Secure Settings**

```
Callback URL (Success): https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback
Callback URL (Fail):    https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback
```

**Önemli:** Her iki URL de aynı! Bizim callback handler hem success hem fail'i handle ediyor.

---

### 2. Credentials (Supabase Secrets için gerekli)

**CardPlus Panel → Settings → API Keys/Credentials:**

```
Client ID:  [Kopyala → Supabase secrets]
Store Key:  [Kopyala → Supabase secrets]
```

**Supabase'e kaydet:**
```bash
supabase secrets set CARDPLUS_CLIENT_ID=xxxxx
supabase secrets set CARDPLUS_STORE_KEY=xxxxx
supabase secrets set SITE_URL=https://zorluplus.com
```

---

### 3. Test/Production Mode

**Test Mode için:**
- Gateway URL: Test gateway URL'i kullanılmalı
- Test kartları geçerli olmalı

**Production Mode için:**
- Gateway URL: Production gateway
- Gerçek kartlar geçerli

**Mevcut kod:** Production gateway kullanıyor
```typescript
const GATEWAY_3D = "https://sanalpos.card-plus.net/fim/est3Dgate";
```

---

## 🔐 Hash Version 3 Settings

CardPlus panel'de **Hash Algorithm** ayarı varsa:

```
Hash Algorithm: Version 3 (SHA-512)
Hash Parameter: Enabled
```

---

## 🧪 Test Kartları

CardPlus test kartları (merchant panel'den confirm et):

```
Kart Numarası: 5570 2364 4731 3486
Son Kullanma:  12/30
CVV:           000
3D Şifre:      123456 (veya CardPlus'ın test şifresi)
```

---

## 📋 Callback Response Format

CardPlus'tan gelen POST callback:

```
mdStatus:        1,2,5,6,7 (success codes)
Response:        "Approved"
ProcReturnCode:  "00"
AuthCode:        "ABC123"
TransId:         "123456789"
oid:             "ORDER-123"
amount:          "5.00"
HASH:            "base64_encoded_hash"
HASHPARAMS:      "param1:param2:param3" (optional)
```

Bizim callback handler otomatik kontrol ediyor:
- ✅ Hash verification (HASHPARAMS veya alphabetical)
- ✅ mdStatus validation
- ✅ Response = "Approved"
- ✅ ProcReturnCode = "00"
- ✅ DB update (orders table)
- ✅ Redirect to /odeme/sonuc

---

## 🚨 Sorun Giderme

### "Callback URL not registered" hatası
- CardPlus panel → Settings → Callback URL'leri kontrol et
- HTTP/HTTPS mismatch yok mu?
- Trailing slash var mı? (olmamalı)

### "Invalid hash" hatası
- Store Key doğru mu?
- Hash algorithm Version 3 olarak set edilmiş mi?
- Bizim kod artık doğru, panel ayarını kontrol et

### "Transaction failed" 
- Test kartı doğru mu?
- 3D şifre doğru mu?
- Merchant hesap aktif mi?
- Test/Production mode uyuşuyor mu?

---

## 📞 CardPlus Support

Sorun devam ederse CardPlus desteğe sor:

1. **Callback URL kayıtlı mı?**
2. **Hash algorithm Version 3 aktif mi?**
3. **Test kartları hangileri?**
4. **3D Secure şifresi nedir?**
5. **Merchant ID aktif mi?**

---

## ✅ Deployment Checklist

- [ ] CardPlus panel'de callback URL set edildi
- [ ] Client ID ve Store Key alındı
- [ ] Supabase secrets set edildi
- [ ] Edge functions deploy edildi
- [ ] Test kartı bilgileri alındı
- [ ] Test ödeme başarılı
- [ ] DB'de order status = "paid"
- [ ] Success redirect çalışıyor

**Hepsi ✅ olunca production'a geç! 🚀**
