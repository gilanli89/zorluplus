

## Plan: Test Ürünlerini Temizle ve Sorunları Düzelt

### 1. Test Ürününü Sil

Veritabanından test ürünü `27e53aca-7195-477d-a487-b7eabff3407a` (Samsung 55 QE55S95D) silinecek — migration ile `DELETE` komutu.

### 2. Marka/Model Kaydedilmedi — Sonuç: Kod Hatası Yok

Kod incelendi: satır 326-327'de `brand: form.brand.trim() || null` ve `model: form.model.trim() || null` doğru çalışıyor. Sorun, browser otomasyonunun React `onChange` event'ini tetikleyememesinden kaynaklanıyordu. **Gerçek kullanıcı formda manuel yazarsa marka ve model doğru kaydedilir.** Kod değişikliği gerekmez.

### 3. Çeviri Fallback Sorunu — AI Gateway 402

**Kök neden:** `ai-translate` edge function'ı AI gateway'den **402 (Payment Required)** yanıtı alıyor. Bu durumda orijinal Türkçe metinleri `fallback: true` ile döndürüyor.

Test sonucu:
```json
{"fallback":true,"translations":["Midea Çamaşır Makinesi 9kg 1400 Devir","Tefal Ütü 2800W Buharlı"]}
```

**Düzeltme seçenekleri:**

- **Kısa vadeli:** `AddProductDialog`'da çeviri fallback olduğunda (`data.fallback === true`) `title_en`/`description_en`'i veritabanına **yazmamak** — böylece orijinal Türkçe metin İngilizce alan olarak kaydedilmez. Sonradan kota düzeldiğinde tekrar denenebilir.
- **Uzun vadeli:** Admin paneline "Çevirileri Yenile" butonu ekleyerek, `title_en` boş olan ürünlerin toplu çevirisini tetiklemek.

### Teknik Özet

| Adım | Dosya/Araç | Değişiklik |
|------|-----------|-----------|
| Test ürünü sil | DB migration | `DELETE FROM inventory WHERE id = '27e53aca...'` |
| Fallback kontrolü | `AdminInventory.tsx` satır 345-354 | `data.fallback === true` ise update'i atla |
| Retry butonu (opsiyonel) | `AdminInventory.tsx` | Çevirisi eksik ürünleri toplu çevir |

