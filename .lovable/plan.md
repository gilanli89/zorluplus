

## Ürün Ekleme Panelini Modernize Etme

### Özet
Mevcut `AddProductDialog` ve `EditProductDialog` bileşenlerini, referans görseldeki modern tasarıma dönüştürme. Çoklu görsel yükleme, arka plan kaldırma (remove.bg), otomatik ölçekleme/merkezleme, model alanı ve otomatik EN çeviri desteği ekleme.

### Değişiklikler

**Adım 1 — Veritabanı migration**

`inventory` tablosuna yeni alanlar ekle:
- `model` (text, nullable) — Model numarası
- `title_en` (text, nullable) — İngilizce başlık (otomatik çeviri)
- `description_en` (text, nullable) — İngilizce açıklama (otomatik çeviri)
- `images` (jsonb, default '[]') — Çoklu görsel URL dizisi

`inventory_public` view güncelle (model, title_en, description_en, images alanlarını ekle).

**Adım 2 — remove.bg API secret**

`hWB3QVjnXWUy84uzQEvkuUCk` anahtarını `REMOVEBG_API_KEY` olarak kaydet.

**Adım 3 — Edge Function: `process-product-image`**

Yeni edge function:
- Yüklenen görseli `product-images` bucket'ından alır
- Seçeneklere göre işler:
  - `removeBg: true` → remove.bg API ile arka plan kaldırma
  - `autoScale: true` → Sharp/Canvas ile vitrin standardına ölçekleme
  - `center: true` → Kare formata merkezleme
- İşlenmiş görseli bucket'a geri yükler, yeni URL döner

**Adım 4 — AddProductDialog'u yeniden tasarla**

Mevcut dialog yerine tam sayfa tarzı modern form:
- **Dropzone**: Sürükle-bırak + tıklama ile çoklu görsel yükleme (max 10). İlk görsel = kapak resmi
- **Görüntü işleme checkbox'ları**: Arka planı kaldır, Otomatik ölçekle, Merkeze yerleştir
- **Alan değişiklikleri**:
  - "Ürün Adı" → "İlan Başlığı *" (yanında "(Otomatik EN çeviri yapılır)" notu)
  - "Stok Kodu (SKU)" alanı kaldırıldı (SKU otomatik üretilecek veya null)
  - "İndirimli Fiyat" alanı kaldırıldı
  - Yeni "Model" alanı (Marka yanında)
  - Açıklama alanı yanında "(Otomatik EN çeviri yapılır)" notu
- **Özellikler**: Açıklamanın üstüne taşındı
- **Kaydet butonu**: "Ürünü Ekle ve Yayınla" + kaydet ikonu, tam genişlik
- **Arka plan**: Hafif gri (#f8f9fa) kart yapısı

**Adım 5 — EditProductDialog'u güncelle**

Aynı modern yapıyı edit dialog'a da yansıt:
- Çoklu görsel desteği
- Görüntü işleme checkbox'ları
- Model alanı
- Alan etiket güncellemeleri

**Adım 6 — Otomatik çeviri entegrasyonu**

Form kaydedildiğinde mevcut `ai-translate` edge function'ı kullanarak:
- `product_name` → `title_en`
- `description` → `description_en`
Çeviri asenkron yapılır, kaydetme işlemi bekletilmez.

**Adım 7 — Kategori bazlı otomatik özellikler (opsiyonel bonus)**

Kategori seçildiğinde o kategoriye ait varsayılan özellik şablonları otomatik eklenir:
- TV → Ekran Boyutu, Panel Türü, Çözünürlük
- Klima → BTU, Enerji Sınıfı
- Bulaşık Makinesi → Kapasite, Enerji Sınıfı

**Adım 8 — Test ve doğrulama**

Tüm varyantlar test edilecek:
- Yeni ürün ekleme (tüm alanlar dolu / minimum alanlar)
- Mevcut ürün düzenleme
- Çoklu görsel yükleme + arka plan kaldırma
- Aktif/pasif toggle
- Toplu işlemler (mevcut fonksiyonlar bozulmadı mı?)

### Teknik Özet

| Bileşen | Dosya |
|---------|-------|
| Migration | `model`, `title_en`, `description_en`, `images` alanları |
| Edge Function | `supabase/functions/process-product-image/index.ts` |
| Secret | `REMOVEBG_API_KEY` |
| UI | `AdminInventory.tsx` (AddProductDialog + EditProductDialog) |

### Önemli Notlar
- SKU alanı DB'de kalır (mevcut ürünler için), sadece formdan kaldırılır
- `sale_price` DB'de kalır (mevcut veriler için), sadece "Ürün Ekle" formundan kaldırılır
- Mevcut liste görünümü, publishChanges, toplu işlemler aynen korunur

