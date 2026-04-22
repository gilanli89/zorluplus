# Edge Functions Deployment Guide

## 🚀 HIZLI DEPLOYMENT (Mac M4'den)

### Adım 1: Supabase CLI Kurulumu (Eğer yoksa)
```bash
brew install supabase/tap/supabase
```

### Adım 2: Login
```bash
supabase login
```

### Adım 3: Link Project
```bash
cd ~/zorluplus
supabase link --project-ref kyxfxzoqvkyeblwbjxjq
```

### Adım 4: Deploy Edge Functions
```bash
# Her iki function'ı deploy et
supabase functions deploy cardplus-initiate
supabase functions deploy cardplus-callback

# Veya hepsini birden:
supabase functions deploy
```

### Adım 5: Secrets Ayarla
```bash
# Production secrets (CardPlus'tan alacaksın)
supabase secrets set CARDPLUS_CLIENT_ID=xxxxx
supabase secrets set CARDPLUS_STORE_KEY=xxxxx
supabase secrets set SITE_URL=https://zorluplus.com

# Verify
supabase secrets list
```

---

## 🌐 VEYA: Supabase Dashboard'dan Deploy

### Option A: Dashboard Upload

1. **https://supabase.com/dashboard/project/kyxfxzoqvkyeblwbjxjq/functions**
2. **Create Function** → Upload:
   - `supabase/functions/cardplus-initiate/index.ts`
   - `supabase/functions/cardplus-callback/index.ts`

### Option B: GitHub Integration (En Kolay)

1. **Push to GitHub:**
   ```bash
   cd ~/zorluplus
   git add supabase/functions/
   git commit -m "fix: Hash v3 implementation per NestPay spec"
   git push origin main
   ```

2. **Supabase Dashboard:**
   - Settings → Edge Functions → Enable GitHub Integration
   - Auto-deploy on push

---

## 🔐 Secrets (ZORUNLU!)

**Dashboard → Settings → Edge Functions → Secrets:**

```
CARDPLUS_CLIENT_ID      = [CardPlus merchant panel'den]
CARDPLUS_STORE_KEY      = [CardPlus merchant panel'den]
SITE_URL                = https://zorluplus.com
```

**⚠️ Secrets olmadan ödeme çalışmaz!**

---

## ✅ Deployment Doğrulama

### Test 1: Function Çalışıyor mu?
```bash
curl -i --location --request POST \
  'https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-initiate' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"cardNumber":"5570236447313486","expMonth":"12","expYear":"30","cvv":"000","orderId":"TEST123","okUrl":"https://test.com","failUrl":"https://test.com"}'
```

Beklenen: `400` veya `404` (order not found) → ✅ Function çalışıyor
Hata: `500` veya timeout → ❌ Secrets eksik veya kod hatası

### Test 2: Callback URL Erişilebilir mi?
```bash
curl -i https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback
```

Beklenen: Redirect HTML → ✅ Çalışıyor

---

## 🧪 Gerçek Ödeme Testi

1. **Test ürünü sepete ekle** (5 TL demo product)
2. **Checkout'a git**: `/odeme?orderId=XXX`
3. **Test kartı gir:**
   - Kart: `5570 2364 4731 3486`
   - Ay/Yıl: `12/30`
   - CVV: `000`
4. **Complete Payment**
5. **3D Secure** → Şifre gir (CardPlus test şifresi)
6. **Callback** → `/odeme/sonuc?status=success&orderId=XXX`

---

## 📊 Callback Flow

```
User → Checkout → cardplus-initiate
                        ↓
                   CardPlus Gateway (3D Secure)
                        ↓
                   Bank Authentication
                        ↓
                   cardplus-callback ← POST from bank
                        ↓
                   DB Update (orders table)
                        ↓
                   Redirect → /odeme/sonuc?status=success
```

---

## 🐛 Troubleshooting

**"Ödeme başlatılamadı" hatası:**
- ✅ Secrets set edildi mi? `supabase secrets list`
- ✅ Order DB'de var mı? Status `pending` mi?
- ✅ Edge function logs: Dashboard → Edge Functions → Logs

**Callback çalışmıyor:**
- ✅ CardPlus panel → Callback URL registered:
  `https://kyxfxzoqvkyeblwbjxjq.supabase.co/functions/v1/cardplus-callback`
- ✅ Hash verification passed?
- ✅ Logs: Dashboard → Edge Functions → cardplus-callback → Logs

**Hash hatası:**
- ✅ storeKey doğru mu?
- ✅ Parametreler alfabetik sırada mı? (Kod artık otomatik yapıyor)
- ✅ Escape karakterleri doğru mu? (Kod artık otomatik yapıyor)

---

## 📝 Deployment Checklist

- [ ] Supabase CLI installed
- [ ] `supabase login` successful
- [ ] Project linked
- [ ] Edge functions deployed
- [ ] Secrets set (CLIENT_ID, STORE_KEY, SITE_URL)
- [ ] Callback URL registered in CardPlus panel
- [ ] Test product created (5 TL)
- [ ] Test ödeme successful
- [ ] DB order status updated to `paid`
- [ ] Redirect to `/odeme/sonuc` working

---

**Deployment sonrası bana haber ver, test ödeme yapalım! 🚀**
