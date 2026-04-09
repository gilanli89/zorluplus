
Sebep net:

1. Bu ürün hâlâ `public/data/products.csv` içinde duruyor.
   - `9223,JBL 2.1 Deep Bass Soundbar` kaydı CSV’de mevcut.
2. Frontend ürünleri iki kaynaktan topluyor:
   - `fetchProducts()` → CSV
   - `inventory_public` → veritabanı
3. `src/hooks/useProducts.ts` içindeki mevcut mantıkta:
   - Veritabanında ürün varsa onu birincil kabul ediyor
   - Ama veritabanından ürün fiziksel olarak silinirse, o SKU artık `seenSkus` içine girmiyor
   - Sonra alttaki “CSV-only ürünler” adımında ürün yeniden listeye ekleniyor
4. Sonuç:
   - Admin panelde “silme” işlemi DB kaydını kaldırıyor
   - Ama CSV aynı ürünü hâlâ yayınladığı için ürün sayfada görünmeye devam ediyor

Bu yüzden şu an sistemde:
- Pasife alma çalışır
- Fiziksel silme, CSV’de kayıt varsa görünürlüğü tamamen kaldıramaz

En doğru çözüm planı:

1. “Sil” davranışını hard delete yerine soft delete yap
   - `bulkDelete()` içindeki `delete()` çağrısını kaldır
   - Bunun yerine `is_active = false` güncelle
   - Böylece SKU veritabanında kalır ve frontend bu SKU’yu CSV’den geri eklemez

2. Frontend merge mantığını silinmiş/pasif ürünleri kesin engelleyecek şekilde netleştir
   - `useProducts.ts` içinde kural açık olmalı:
     - DB’de SKU varsa tek gerçek kaynak DB
     - `is_active = false` ise asla gösterme
     - CSV sadece DB’de hiç izi olmayan geçici ürünler için fallback olsun

3. Eğer gerçek “kalıcı silme” isteniyorsa ek bir engelleme katmanı kur
   - Seçenek A: `deleted_skus` gibi bir tablo tutup CSV fallback öncesi bu SKU’ları ele
   - Seçenek B: CSV fallback’i tamamen kaldır ve siteyi yalnızca veritabanından besle
   - Seçenek C: Admin panel değişikliklerinde CSV’yi otomatik senkronize eden bir backend akışı ekle

Önerdiğim uygulama sırası:

1. Hızlı ve güvenli çözüm:
   - Admin’de silmeyi “pasife al”ya çevir
2. Kalıcı mimari çözüm:
   - CSV’yi artık sadece import kaynağı yap, canlı katalog kaynağı olmaktan çıkar
3. Son aşama:
   - İstersen admin panelden yapılan ekleme/düzenleme/silme işlemlerini CSV export dosyasına da yazan senkron mekanizması kur

Bu özel ürün için teşhis:
- Sorun ürün sayfasında değil
- Sorun admin silme akışının DB kaydını kaldırması ve `public/data/products.csv` içinde 9223 satırının hâlâ bulunması
- Bu nedenle `/urun/9223-jbl-2-1-deep-bass-soundbar` slug’ı merged ürün listesinde yeniden oluşuyor

Uygulayacağım değişiklik planı:
1. `src/pages/admin/AdminInventory.tsx`
   - `bulkDelete()` fonksiyonunu soft delete yapısına çevirmek
   - UI metnini “Sil” yerine gerekirse “Pasife Al” / “Yayından Kaldır” yapmak
2. `src/hooks/useProducts.ts`
   - CSV fallback mantığını, DB’de izi olan SKU’larda kesinlikle geri ekleme yapmayacak şekilde sertleştirmek
3. Gerekirse sonraki adımda
   - Hard delete gerekiyorsa “silinmiş SKU kaydı” tablosu veya CSV senkronu eklemek

Beklenen sonuç:
- Admin panelden yayından kaldırılan ürün saniyeler içinde siteden kaybolur
- CSV’de dursa bile tekrar görünmez
- Aynı problem başka SKU’larda da tekrarlanmaz
