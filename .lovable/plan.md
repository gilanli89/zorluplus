

## Veritabanını Birincil Kaynak Yap

### Mevcut Durum
Şu an ürün verileri şu sırayla yükleniyor:
1. CSV dosyası (`public/data/products.csv`) okunuyor
2. Veritabanı (`inventory_public`) okunuyor
3. İkisi birleştiriliyor — DB alanları CSV'yi eziyor

**Sorun:** Admin panelden bir ürün silinse/deaktive edilse bile, CSV'de hâlâ varsa sitede görünmeye devam ediyor. Ayrıca CSV'deki ürünler DB'de yoksa hiçbir admin kontrolü olmadan yayınlanıyor.

### Yeni Mantık: DB Birincil

Merge sırası tersine çevrilecek:

1. **DB ürünleri birincil** — veritabanındaki tüm aktif ürünler önce listeye alınır
2. **CSV sadece tamamlayıcı** — CSV'deki bir ürün DB'de **hiç yoksa** (SKU eşleşmesi yok), CSV'den eklenir. Ama DB'de varsa ve `is_active = false` ise **CSV verisi de gösterilmez**
3. DB'de olan ürünler için CSV verileri sadece DB'de `null/boş` olan alanları doldurmak için kullanılır (fallback)

### Davranış Değişikliği

| Senaryo | Şu An | Yeni |
|---------|-------|------|
| DB'de silindi/deaktive, CSV'de var | Görünür ❌ | Gizli ✓ |
| DB'de düzenlendi, CSV'de eski | DB ezar ✓ | DB ezar ✓ |
| CSV'de var, DB'de yok | Görünür | Görünür (fallback) |
| Sadece DB'de var | Görünür ✓ | Görünür ✓ |

### Dosya Değişiklikleri

**`src/hooks/useProducts.ts`** — `fetchProductsWithInventory()` fonksiyonundaki merge mantığı:
- DB ürünlerini önce işle (birincil)
- CSV'yi sadece DB'de bulunmayan SKU'lar için fallback olarak kullan
- DB'de `is_active = false` olan ürünleri CSV'de olsa bile hariç tut
- CSV-only ürünlerde eksik alanlar (görsel, açıklama) için CSV verisini kullan

