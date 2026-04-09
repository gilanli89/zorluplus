

## Chrome vs Firefox Fark Raporu

### Tespit Edilen Sorunlar

#### 1. Footer "Son güncelleme" tarihi Firefox'ta görünmüyor
**Neden:** Network loglarında `updated_at` sorgusu hiç görünmüyor — bu, sorgunun hata verip sessizce `null` döndürdüğü anlamına geliyor. RLS politikası eklendi ama deployment henüz tam yansımamış olabilir, veya Firefox'un cache'i eski kodu tutuyor.

**Çözüm:** Footer'daki `updated_at` sorgusunu daha dayanıklı hale getirmek — hata durumunda `console.warn` ile loglamak ve `retry: 3` ile artırmak.

#### 2. `inventory_public` sorgusu eski sütunları çekiyor
**Neden:** Network logları `select=sku,quantity,original_price,sale_price,is_active` gösteriyor (sadece 5 sütun), ancak kod `select("*")` yapıyor. Bu, preview'ın henüz yeni kodu deploy etmemiş olduğunu gösteriyor. Types dosyası güncel (13 sütun mevcut) ancak runtime'da eski bundle çalışıyor.

**Çözüm:** Yeni bir deploy tetiklendiğinde bu otomatik düzelecek. Ancak `select("*")` yerine açık sütun listesi kullanmak daha güvenli olacaktır.

#### 3. CSS `mask-composite` Firefox uyumsuzluğu
**Neden:** `index.css`'te `.glass-border::after` ve `.premium-card::after` sınıflarında:
```css
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
```
Firefox `mask-composite: exclude` destekler ama `-webkit-mask-composite: xor` yoktur. Sorun şu ki `mask` (prefix'siz) property tanımlanmamış — sadece `-webkit-mask` var. Firefox prefix'siz `mask` kullanır, bu yüzden gradient kenarlık efekti Firefox'ta görünmez.

**Çözüm:** Prefix'siz `mask` property'lerini de eklemek:
```css
-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
```

#### 4. `backdrop-filter` Firefox desteği
**Neden:** `backdrop-filter` Firefox'ta varsayılan olarak desteklenir (Firefox 103+), ancak eski Firefox sürümlerinde `layout.css.backdrop-filter.enabled` flag'i gerekir. Kodda `-webkit-backdrop-filter` doğru eklenmiş, bu sorun yok.

**Durum:** Modern Firefox sürümlerinde sorun yok. Sadece çok eski Firefox (<103) kullananlar etkilenir.

---

### Yapılacaklar

**Dosya: `src/index.css`**
- `.glass-border::after` ve `.premium-card::after` için prefix'siz `mask` property ekle (2 satır değişiklik)

**Dosya: `src/components/layout/Footer.tsx`**
- Hata loglaması ekle (debug kolaylığı)

**Dosya: `src/hooks/useProducts.ts`**
- `select("*")` yerine açık sütun listesi kullan (tarayıcı cache uyumsuzluklarını önler)

Bu değişiklikler küçük ve low-risk, tüm tarayıcılarda tutarlı görünüm sağlayacak.

