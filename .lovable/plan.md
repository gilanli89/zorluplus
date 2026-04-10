

## Saatlik Envanter Yedekleme ve Geri Yükleme Sistemi

### Özet
Her saat başı envanter tablosunun anlık görüntüsünü (snapshot) kaydeden ve en az 4 gün geriye dönülebilen bir yedekleme sistemi kurulacak. Geri yükleme admin panelinden yapılabilecek.

### Mimari

```text
┌─────────────┐   pg_cron (her saat)   ┌──────────────────────┐
│  inventory   │ ───────────────────▶  │  inventory_snapshots  │
│  (239 ürün)  │                        │  (saatlik kayıtlar)   │
└─────────────┘                        └──────────────────────┘
                                              │
                                    Edge Function (restore)
                                              │
                                       ┌──────▼──────┐
                                       │ Admin Panel  │
                                       │ Geri Yükleme │
                                       └─────────────┘
```

### Adım 1 — Veritabanı: `inventory_snapshots` tablosu

Yeni tablo oluşturulacak:
- `id` (uuid, PK)
- `snapshot_at` (timestamptz) — snapshot zamanı
- `data` (jsonb) — tüm inventory satırlarının dizisi
- `product_count` (integer) — kaç ürün kaydedildi
- `created_at` (timestamptz)

RLS: Sadece admin okuyabilir ve geri yükleyebilir. 239 ürün × 24 saat × 5 gün ≈ ~30 MB (JSONB sıkıştırmalı, çok küçük).

### Adım 2 — Veritabanı fonksiyonu: `create_inventory_snapshot()`

`SECURITY DEFINER` fonksiyon:
```sql
INSERT INTO inventory_snapshots (snapshot_at, data, product_count)
SELECT now(), jsonb_agg(row_to_json(i)), count(*)
FROM inventory i;
```

### Adım 3 — Temizlik fonksiyonu: `cleanup_old_snapshots()`

5 günden eski snapshot'ları silen fonksiyon (4 gün garanti + 1 gün tampon):
```sql
DELETE FROM inventory_snapshots WHERE snapshot_at < now() - interval '5 days';
```

### Adım 4 — pg_cron zamanlanmış görevler

- Her saat başı: `create_inventory_snapshot()` çalıştır
- Günde 1 kez: `cleanup_old_snapshots()` çalıştır

`pg_cron` ve `pg_net` extension'ları etkinleştirilecek.

### Adım 5 — Geri yükleme Edge Function: `restore-inventory`

POST endpoint. Admin auth kontrolü yapar, seçilen snapshot'taki `data` JSONB dizisini alır ve her ürünü `UPDATE` ile geri yazar. Sadece değişen alanları günceller: `quantity`, `original_price`, `sale_price`, `brand`, `category`, `is_active`, `image_url`, `description`, `attributes`, `product_name`.

### Adım 6 — Admin paneline "Yedekler" sayfası

`AdminBackups.tsx` sayfası:
- Snapshot listesi (tarih, ürün sayısı)
- Her snapshot için "Geri Yükle" butonu (onay dialogu ile)
- Snapshot detayı: o andaki ürün listesi ve mevcut durumla fark karşılaştırması (diff)
- Manuel snapshot alma butonu

### Adım 7 — Admin routing

`AdminLayout.tsx`'e yeni menü öğesi ve route eklenir.

### Teknik Detaylar

| Bileşen | Dosya/Konum |
|---------|-------------|
| Migration | `inventory_snapshots` tablo + fonksiyonlar + pg_cron |
| Edge Function | `supabase/functions/restore-inventory/index.ts` |
| Admin UI | `src/pages/admin/AdminBackups.tsx` |
| Route | `AdminLayout.tsx` güncelleme |

### Veri boyutu tahmini
- 239 ürün × ~500 byte/ürün = ~120 KB/snapshot
- 24 snapshot/gün × 5 gün = 120 snapshot
- Toplam: ~14 MB (ihmal edilebilir)

