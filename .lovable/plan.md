

## Plan: 5 Sayfayı Sürdürülebilirlik Sayfası Gibi Premium Yap

### Hedef
B2B, Destek, İade Koşulları, Ödeme Yöntemleri ve Sipariş Takip sayfalarına Sürdürülebilirlik sayfasındaki premium pattern'i uygula: PremiumIcon hero, section kartlarında PremiumIcon, ve alt slogan.

### Mevcut Durum
- **Destek**: Hero'da PremiumIcon yok, section kartlarında kısmen PremiumIcon var
- **İade Koşulları**: Hero'da PremiumIcon yok, prose content — kartlara bölünmemiş
- **Ödeme Yöntemleri**: Hero'da PremiumIcon yok, inline SVG ikonlar kullanılıyor
- **Sipariş Takip**: Hero'da PremiumIcon yok
- **B2B** (`B2BPage.tsx`): Zaten PremiumIcon kullanıyor ama marka logoları eski `.png` uzantılarıyla

### Yapılacaklar

**1. `src/pages/ContentPages.tsx` — DestekPage (satır ~845)**
- Centered PremiumIcon hero ekleme (icon: `Wrench`, size: `xl`, variant: `glow`)
- Trust kartlarına PremiumIcon (sm/lg) ekleme
- Alt slogan ekleme

**2. `src/pages/ContentPages.tsx` — IadeKosullariPage (satır ~1279)**
- Centered PremiumIcon hero ekleme (icon: `ScrollText`, size: `xl`, variant: `glow`)
- Prose içeriği section kartlarına bölme, her karta PremiumIcon (lg, glow) ekleme
- Alt slogan ekleme

**3. `src/pages/ContentPages.tsx` — SiparisTakipPage (satır ~1709)**
- Centered PremiumIcon hero ekleme (icon: `Package`, size: `xl`, variant: `glow`)
- İletişim kartına PremiumIcon ekleme
- Alt slogan ekleme

**4. `src/pages/ContentPages.tsx` — OdemeYontemleriPage (satır ~1819)**
- Centered PremiumIcon hero ekleme (icon: `CreditCard`, size: `xl`, variant: `glow`)
- Inline SVG ikonları PremiumIcon (sm, glow) ile değiştirme
- Alt slogan ekleme

**5. `src/pages/B2BPage.tsx` — Marka logoları güncelleme**
- `.png` uzantılı logo yollarını güncel `.svg` uzantılarına güncelleme (sharp, tcl, tefal, toshiba, bosch, jbl, indesit, atlantic, krups, midea, philips)

### İkon Eşleştirmeleri
| Sayfa | Hero İkonu |
|-------|-----------|
| Destek | `Wrench` |
| İade Koşulları | `ScrollText` |
| Sipariş Takip | `Package` |
| Ödeme Yöntemleri | `CreditCard` |

### Dosya Değişiklikleri
| Dosya | İşlem |
|-------|-------|
| `src/pages/ContentPages.tsx` | 4 sayfa fonksiyonunu güncelle |
| `src/pages/B2BPage.tsx` | Logo yollarını güncelle |

