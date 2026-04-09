

## Plan: Kalan Marka Logolarını Güncelle

Kullanıcı 6 marka için yeni logo yükledi. Bunlar mevcut PNG dosyalarının yerine geçecek.

### Dosya Kopyalama

| Marka | Kaynak | Hedef |
|-------|--------|-------|
| Sharp | `user-uploads://sharp.svg` | `public/brands/sharp.svg` |
| Sony | `user-uploads://sony.png` | `public/brands/sony.png` |
| TCL | `user-uploads://tcl-3.svg` | `public/brands/tcl.svg` |
| Tefal | `user-uploads://tefal-1.svg` | `public/brands/tefal.svg` |
| Toshiba | `user-uploads://toshiba-3.svg` | `public/brands/toshiba.svg` |
| Xiaomi | `user-uploads://xiaomi.png` | `public/brands/xiaomi.png` |

### Kod Değişiklikleri

**`src/components/BrandLogo.tsx`** — 5 markanın uzantısını PNG'den SVG'ye güncelle:
- `sharp` → `/brands/sharp.svg`
- `sony` → `/brands/sony.png` (PNG kalır)
- `tcl` → `/brands/tcl.svg`
- `tefal` → `/brands/tefal.svg`
- `toshiba` → `/brands/toshiba.svg`
- `xiaomi` → `/brands/xiaomi.png` (PNG kalır)

### Dosya Listesi
| Dosya | İşlem |
|-------|-------|
| `public/brands/` | 6 logo dosyası kopyala/üzerine yaz |
| `src/components/BrandLogo.tsx` | Logo yollarını güncelle |

