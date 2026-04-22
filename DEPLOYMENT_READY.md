# 🚀 CardPlus Payment Integration - READY TO DEPLOY

## ✅ TAMAMLANAN İŞLER

### 1. Hash Bug Fix (KRİTİK)
- ✅ Hash Version 3 spec'e göre düzeltildi
- ✅ Alfabetik sıralama uygulandı
- ✅ Escape karakterleri eklendi (\\ ve \|)
- ✅ Callback hash verification iki yöntem destekliyor

**Dosyalar:**
- `supabase/functions/cardplus-initiate/index.ts` (yenilendi)
- `supabase/functions/cardplus-callback/index.ts` (yenilendi)

### 2. Deployment Scripts
- ✅ `deploy-cardplus.sh` - One-click deployment
- ✅ `DEPLOY_EDGE_FUNCTIONS.md` - Detaylı guide
- ✅ `CARDPLUS_SETUP.md` - Merchant panel config

---

## 🎯 HIZLI BAŞLANGIÇ (Mac M4'den)

### Tek Komut:
```bash
cd ~/zorluplus
bash deploy-cardplus.sh
```

Bu script:
1. Supabase CLI check eder (yoksa install eder)
2. Login yapar
3. Project'i link eder
4. Her iki edge function'ı deploy eder
5. Secrets durumunu kontrol eder

---

## 🔐 ZORUNLU: Secrets Ayarla

CardPlus merchant panel'den al:

```bash
supabase secrets set CARDPLUS_CLIENT_ID=xxxxx
supabase secrets set CARDPLUS_STORE_KEY=xxxxx
supabase secrets set SITE_URL=https://zorluplus.com
```

**Doğrula:**
```bash
supabase secrets list
```

---

## 🏦 ZORUNLU: CardPlus Panel Config

**Callback URL kaydet:**
```
https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback
```

**Detay:** `CARDPLUS_SETUP.md` dosyasına bak

---

## 🧪 TEST AKIŞI

### 1. Test Ürünü Ekle (Manual)

**Supabase Dashboard → SQL Editor:**
```sql
INSERT INTO products (
  sku, name, slug, brand, category, subcategory,
  price, currency, image, images, description, specs,
  in_stock, is_new, is_featured, tags
) VALUES (
  'TEST-PAYMENT-001',
  'Test Ürünü - Ödeme Sistemi Testi',
  'test-urun-odeme-sistemi-testi',
  'TEST',
  'aksesuar',
  'diger',
  5.00,
  'TRY',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800'],
  'Test ürünü - Sadece ödeme testi için',
  '{"Test": "Evet", "Fiyat": "5 TL"}'::jsonb,
  true,
  true,
  false,
  ARRAY['test', 'demo']
);
```

### 2. Test Ödeme

1. **Site'ye git:** https://zorluplus.com/urun/test-urun-odeme-sistemi-testi
2. **Sepete ekle**
3. **Checkout**
4. **Test kartı gir:**
   - Kart: `5570 2364 4731 3486`
   - Ay/Yıl: `12/30`
   - CVV: `000`
5. **Complete Payment**
6. **3D Secure** → Şifre gir (CardPlus'tan al)
7. **Bekle** → Callback
8. **Success page** → `/odeme/sonuc?status=success&orderId=XXX`

### 3. Doğrula

**Supabase Dashboard → Table Editor → orders:**
- Order bulundu mu?
- Status = "paid" mi?
- payment_auth_code dolu mu?

✅ **Hepsi OK** → Production hazır!

---

## 📊 DEPLOYMENT DURUMU

| Bileşen | Durum | Not |
|---------|-------|-----|
| Hash Fix | ✅ Tamamlandı | NestPay v3 spec |
| Edge Functions | ⏳ Deploy bekliyor | `deploy-cardplus.sh` |
| Supabase Secrets | ⏳ Set edilmeli | CardPlus credentials |
| Callback URL | ⏳ CardPlus'a register | Merchant panel |
| Test Product | ⏳ DB'ye insert | SQL script hazır |
| Test Ödeme | ⏳ Credentials sonrası | 5 TL demo |

---

## 🐛 TROUBLESHOOTING

### "Ödeme başlatılamadı"
```bash
# Secrets kontrolü
supabase secrets list

# Function logs
# Dashboard → Edge Functions → cardplus-initiate → Logs

# Test request
curl -X POST https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-initiate \
  -H "Authorization: Bearer ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Hash Hatası
- ✅ Kod artık doğru!
- ⚠️ CardPlus panel → Hash Version 3 enabled?
- ⚠️ Store Key doğru mu?

### Callback Çalışmıyor
- ✅ URL registered in CardPlus panel?
- ⚠️ HTTPS mi? (HTTP olmaz)
- ⚠️ Trailing slash yok mu?

**Logs:** Dashboard → Edge Functions → cardplus-callback → Logs

---

## 📁 OLUŞTURULAN DOSYALAR

```
zorluplus/
├── deploy-cardplus.sh              # One-click deployment
├── DEPLOY_EDGE_FUNCTIONS.md        # Detaylı deployment guide
├── CARDPLUS_SETUP.md               # Merchant panel config
├── test-product-insert.sql         # Test ürünü SQL
└── supabase/functions/
    ├── cardplus-initiate/
    │   └── index.ts                # ✅ Hash fix uygulandı
    └── cardplus-callback/
        └── index.ts                # ✅ Hash fix uygulandı
```

---

## 🎯 ŞİMDİ NE YAPMALI?

### Mac M4'ten (Terminal):

```bash
# 1. Deploy et
cd ~/zorluplus
bash deploy-cardplus.sh

# 2. Secrets set et (CardPlus'tan sonra)
supabase secrets set CARDPLUS_CLIENT_ID=xxxxx
supabase secrets set CARDPLUS_STORE_KEY=xxxxx
supabase secrets set SITE_URL=https://zorluplus.com

# 3. Test product ekle (SQL yukarıda)

# 4. Test ödeme yap
```

### CardPlus Panel:
1. Callback URL register et
2. Client ID & Store Key al
3. Test kartı bilgilerini al
4. Hash Version 3 enabled kontrol et

---

## ✅ SUCCESS KRİTERLERİ

Deployment başarılı sayılır:
- ✅ Edge functions deploy edildi
- ✅ Secrets set edildi
- ✅ Callback URL registered
- ✅ Test ödeme başarılı
- ✅ DB'de status = "paid"
- ✅ Success redirect çalışıyor

**Hepsi ✅ → Production LIVE! 🎉**

---

**Hazır mısın? Deploy et ve bana haber ver! 🚀**
