

## Footer'a Veritabanı Son Güncelleme Tarihi Ekleme

Footer'ın alt kısmında, telif hakkı yazısının yanına veritabanındaki (inventory tablosu) en son güncelleme tarih-saat-dakikasını göstereceğiz.

### Teknik Yaklaşım

1. **Veritabanı sorgusu**: `inventory` tablosundaki `updated_at` sütununun `MAX()` değerini `inventory_public` view'ından çekeceğiz. View'a bu aggregation'ı eklemek yerine, doğrudan frontend'den `supabase.from("inventory_public").select("updated_at").order("updated_at", { ascending: false }).limit(1)` sorgusu yapacağız.

2. **Footer bileşeni güncelleme** (`src/components/layout/Footer.tsx`):
   - `useQuery` ile en son `updated_at` değerini çekecek bir sorgu eklenecek
   - Tarih Türkçe formatında gösterilecek: `"Son güncelleme: 09.04.2026 14:35"`
   - Telif hakkı yazısının hemen altına küçük font ile yerleştirilecek

### Dosya Değişiklikleri
- `src/components/layout/Footer.tsx` — useQuery + supabase import ekle, tarih gösterimi ekle

