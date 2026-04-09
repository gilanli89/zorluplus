

## Sorun Analizi

### Kök Neden
`normalizeCategorySlug("tv-goruntu")` fonksiyonu, veritabanında `category = "tv-goruntu"` olan **tüm** ürünleri (askı aparatları, HDMI kablolar, temizleme kiti dahil) keyword fallback'ten geçirip `subcategory: "tv"` olarak atıyor. Çünkü `"tv-goruntu".includes("tv")` → `true` döner ve hepsi televizyon alt kategorisine düşer.

Bu durum sadece CSV'deki ürünleri etkilemiyor (onlar `parseRow()`'daki isim bazlı override'lardan geçiyor), ama **veritabanından gelen ürünler** bu override'lardan geçmiyor.

### Etkilenen Ürünler (DB'de `category = "tv-goruntu"`)

| Ürün Tipi | Adet | Olması Gereken Subcategory | Şu An |
|-----------|------|---------------------------|-------|
| TV Askı Aparatları | 14 | `tv-aski-aparatlari` | `tv` |
| HDMI Kablolar | 3 | `tv-aksesuar` | `tv` |
| Ekran Temizleme Kiti | 1 | `tv-aksesuar` | `tv` |
| Gerçek TV'ler | 1 | `tv` | `tv` ✓ |

Ayrıca `"Video / Audio > Aksesuar, Diğer Ürünler"` kategorisindeki 27 kumanda da kontrol edildi — bunlar `normalizeCategorySlug`'dan `tv-goruntu/kumanda` olarak geçiyor (isim bazlı override CSV'de çalışıyor ama DB merge'de çalışmıyor).

### Çözüm Planı

#### 1. İsim bazlı override'ları paylaşılan fonksiyona çıkar
`src/lib/products.ts`'de `parseRow()` içindeki isim+marka bazlı kategori override mantığını ayrı bir `export function applyCategoryOverrides(name, brand, category, subcategory)` fonksiyonuna taşı.

#### 2. DB merge ve dbToProduct'ta override uygula
`src/hooks/useProducts.ts`'de:
- `dbToProduct()` fonksiyonunda `normalizeCategorySlug` sonrası `applyCategoryOverrides` çağır
- CSV+DB merge bloğunda da aynı override'ı uygula

Bu sayede askı aparatları → `tv-aski-aparatlari`, HDMI kablolar → `tv-aksesuar`, kumandalar → `kumanda`, soundbar kumandaları → `kumanda`, temizleme kiti → `tv-aksesuar`, klima kumandaları → doğru kategoriye atanacak.

#### 3. `normalizeCategorySlug` keyword fallback düzeltmesi
`"tv"` keyword'ünün `"tv-goruntu"` slug'ını yanlışlıkla yakalamasını önlemek için, keyword kontrolüne word-boundary koruması veya slug-format kontrolü ekle — eğer giriş zaten bir slug ise (`-` içeriyorsa) keyword fallback'e düşmesin.

### Dosya Değişiklikleri
1. **`src/lib/products.ts`** — `applyCategoryOverrides()` fonksiyonu çıkar ve export et; `parseRow()`'da bu fonksiyonu çağır; `normalizeCategorySlug`'da slug formatı girişlerde keyword fallback'i atla
2. **`src/hooks/useProducts.ts`** — `applyCategoryOverrides`'ı import et; `dbToProduct()` ve merge bloğunda uygula

