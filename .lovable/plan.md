

## Plan: Marka Logolarını SVG ile Güncelle

Kullanıcı 10 marka için yüksek kaliteli SVG logolar yükledi. Mevcut PNG logolar bu SVG'lerle değiştirilecek.

### Yüklenecek Dosyalar

| Marka | Kaynak | Hedef |
|-------|--------|-------|
| Samsung | `user-uploads://samsung.png` | `public/brands/samsung-logo.png` |
| LG | `user-uploads://lg.png` | `public/brands/lg-logo.png` |
| Atlantic | `user-uploads://atlantic-2.svg` | `public/brands/atlantic.svg` |
| Bosch | `user-uploads://bosch-2.svg` | `public/brands/bosch.svg` |
| Indesit | `user-uploads://indesit-1.svg` | `public/brands/indesit.svg` |
| JBL | `user-uploads://jbl-3.svg` | `public/brands/jbl.svg` |
| Krups | `user-uploads://krups-2.svg` | `public/brands/krups.svg` |
| Midea | `user-uploads://midea-1.svg` | `public/brands/midea.svg` |
| Philips | `user-uploads://philips.svg` | `public/brands/philips.svg` |
| Sharp | `user-uploads://sharp.png` | `public/brands/sharp.png` |

### Kod Degisiklikleri

**`src/components/BrandLogo.tsx`** — `BRAND_LOGOS` haritasindaki yollari SVG dosyalarina guncelle (atlantic, bosch, indesit, jbl, krups, midea, philips). Samsung, LG ve Sharp PNG olarak kalir (yüklenen dosyalar PNG).

**`src/components/home/BrandShowcase.tsx`** — Samsung ve LG logolarinin yollarini guncelle (eger degistiyse).

### Dosya Listesi
| Dosya | Islem |
|-------|-------|
| `public/brands/` | 10 logo dosyasi kopyala |
| `src/components/BrandLogo.tsx` | Logo yollarini guncelle |

