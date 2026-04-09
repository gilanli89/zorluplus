

## Tespit Raporu ve Düzeltme Planı

### 1. GÖRSEL UYUŞMAZLIKLARI (Yanlış Fotoğraflar)

Veritabanında bazı ürünlerin görselleri başka modellere ait:

| SKU | Ürün | Görsel URL'deki Model | Sorun |
|-----|------|----------------------|-------|
| **8758** | LG 43" NanoCell TV | `SKU_55UR8100.webp` | 55" UR8100 görseli 43" NanoCell'e atanmış |
| **43NANO81T3A** | LG 43" NanoCell TV | `Zorlu-TV-Tempalte.png` | Şablon görsel, gerçek ürün değil |
| **8745 vs 8759** | Her ikisi de LG 32L063806LC | İki farklı SKU ile aynı ürün, farklı görseller | Mükerrer kayıt |

**Bu bugünkü değişikliklerden kaynaklanmıyor.** Bunlar veritabanına ürünler ilk eklenirken yanlış atanmış görseller. Bugünkü değişiklikler sadece `index.css`, `Footer.tsx` ve `useProducts.ts` dosyalarını etkiledi.

### 2. GÖRSELİ OLMAYAN ÜRÜNLER (`image_url = NULL`)

9 aktif ürünün görseli yok — bunlar sitede fallback görsellerle gösteriliyor veya gösterilmiyor:
- Samsung 65" 4K Led TV (UE65U8000F)
- Samsung 50" 4K QLED TV (QE50Q60D) 
- Samsung 85" 4K Led TV (UE85U8092U)
- Samsung 43" 4K QLED TV (QE430Q8F)
- Samsung 65" 4K QLED TV (QE65Q6F)
- Samsung 65" OLED TV (QE65S85F)
- LG GN-B392SMBB Buzdolabı
- 2x Samsung Buzdolabı

### 3. TV FİLTRELERDE EKSİK EKRAN BOYUTLARI VE TİPLERİ

**Kök neden:** Veritabanında `category = "tv-goruntu"` olan ürünlerin çoğu aksesuar (askı aparatı, HDMI kablo, temizleme kiti). Gerçek TV'ler `"Video / Audio > Televizyonlar"` kategorisinde.

`useProducts.ts`'deki merge mantığı CSV ile DB'yi birleştirirken, DB'deki kategori CSV'yi eziyor. DB'de `category = "tv-goruntu"` olan TV'ler alt kategorisiz kalıyor (`subcategory = ""`), bu yüzden `/kategori/tv-goruntu/tv` sayfasında görünmüyorlar.

**Asıl sorun:** DB'deki TV ürünlerinin kategorisi standartlaştırılmamış:
- Bazıları `"tv-goruntu"` (ham slug, alt kategori yok)  
- Bazıları `"Video / Audio > Televizyonlar"` (doğru WooCommerce formatı)
- `"Diğer Ürünler"` olarak atanmış TV'ler var

`normalizeCategorySlug()` fonksiyonu CSV'deki WooCommerce formatını doğru çözüyor ama `useProducts.ts`'deki DB merge kodu `inv.category` ham değerini doğrudan atıyor — normalize etmiyor.

### 4. FOOTER LİNKLERİ

`src/lib/constants.ts`'deki `FOOTER_LINKS.kategoriler` içinde hatalı linkler:
- `Televizyon` → `https://zorluplus.com/kategori/tv-goruntu` (dış site linki, kendi sitesine yönlenmeli)
- `Beyaz Eşya` → `/beyaz-esya` (landing page, `/kategori/beyaz-esya` olmalı)
- Birçok kategori linki landing page'lere gidiyor, kategori sayfalarına değil
- `Projeksiyon`, `Ses Sistemi`, `Soundbar`, `Duvar Aparatı`, `Yedek Kumanda` → hepsi `/kategori/elektronik-aksesuar`'a gidiyor (bu kategori yok)

### 5. MÜKERRER ÜRÜNLER

Aynı fiziksel ürün birden fazla SKU ile kayıtlı:
- LG 32LQ63806LC: SKU `32LQ63806LC`, `32LQ63806LC-1`, `8745`, `8759` (4 kayıt!)
- LG 43" NanoCell: SKU `43NANO81T3A`, `8758`, `8760` (3 kayıt)

---

### DÜZELTME PLANI

#### A. useProducts.ts — DB kategori normalizasyonu (Kritik)
DB'den gelen `inv.category` değerini `normalizeCategorySlug()` fonksiyonundan geçir. Bu, tüm `"Video / Audio > Televizyonlar"` kategorisindeki TV'lerin doğru `tv-goruntu/tv` alt kategorisine düşmesini sağlayacak ve filtreler çalışacak.

#### B. constants.ts — Footer link düzeltmeleri
- `Televizyon` linkini `/kategori/tv-goruntu/tv` olarak düzelt
- Landing page linklerini kategori sayfalarına yönlendir
- Var olmayan `/kategori/elektronik-aksesuar` linklerini doğru kategorilere yönlendir

#### C. Veritabanı — Görsel ve mükerrer temizliği (Migration)
- Görseli olmayan 9 ürünü `is_active = false` yap (Production Mode kuralı)
- Mükerrer SKU'ları deaktive et (her ürün için tek doğru SKU bırak)
- Yanlış görsel atanmış ürünlerin image_url'lerini düzelt (8758 için doğru NanoCell görseli)

#### D. Bugünkü değişikliklerin etkisi
Bugünkü 3 değişiklik (CSS mask fix, footer updated_at, explicit select) bu sorunların **hiçbirine** neden olmadı. Tüm sorunlar veritabanına veri girilirken oluşmuş mevcut tutarsızlıklar.

### Dosya Değişiklikleri
1. `src/hooks/useProducts.ts` — DB kategorilerini normalizeCategorySlug ile normalize et
2. `src/lib/constants.ts` — Footer linklerini düzelt
3. DB migration — Mükerrer/görselsiz ürünleri deaktive et, yanlış görselleri düzelt

