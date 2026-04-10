

## Tespit Edilen Sorunlar ve Düzeltme Planı

### Sorun 1 — Çeviri sonuçları veritabanına kaydedilmiyor

**Neden:** `AddProductDialog` satır 324-351'de `.insert()` sonrası dönen `data`'dan ürün ID'si alınmıyor. Çeviri tamamlansa bile güncelleme yapılacak bir ID yok.

**Düzeltme:** `.insert({...}).select("id")` kullanarak dönen ID'yi al, çeviri sonuçlarını bu ID ile `inventory` tablosuna güncelle.

```
const { data: insertedRows, error } = await withTimeout(
  supabase.from("inventory").insert({...}).select("id"), 8000
);
// insertedRows[0].id ile çeviri sonrası update yap
```

### Sorun 2 — `as any` tip güvensizlikleri

**Neden:** `EditProductDialog` satır 520-543'te `(item as any).model`, `(item as any).description`, `(item as any).images`, `(item as any).attributes` kullanılıyor. Oysa `InventoryItem` tipinde bu alanlar zaten tanımlı (satır 488-493).

**Düzeltme:** Tüm `(item as any).xxx` ifadelerini `item.xxx` olarak değiştir — tip zaten doğru tanımlı.

### Sorun 3 — `EditableFields` tipi eksik

**Neden:** Satır 496-505'teki `EditableFields` tipinde `model`, `description`, `images`, `title_en`, `description_en`, `attributes` alanları yok. Bu yüzden insert/update'lerde `as any` kullanılmak zorunda kalınıyor.

**Düzeltme:** `EditableFields`'e eksik alanları ekle, insert/update ifadelerinden `as any` kaldır.

### Teknik Özet

| Dosya | Satır | Değişiklik |
|-------|-------|-----------|
| `AdminInventory.tsx` | 324-335 | `.select("id")` ekle, dönen ID ile çeviri güncelle |
| `AdminInventory.tsx` | 496-505 | `EditableFields`'e yeni alanlar ekle |
| `AdminInventory.tsx` | 520-543 | `as any` kaldır, doğrudan `item.xxx` kullan |

