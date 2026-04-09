

## Plan: BrandShowcase'ı Samsung ve LG Logoları ile Güncelle

### Yapılacak değişiklik

`src/components/home/BrandShowcase.tsx` dosyasında:

1. **Diğer markaları kaldır** — AUTHORIZED_BRANDS listesinden Samsung ve LG dışındaki tüm markaları sil
2. **Yazı yerine logo kullan** — Mevcut `/brands/samsung-logo.png` ve `/brands/lg-logo.png` dosyalarını `<img>` olarak göster
3. **"Yetkili" badge'ini koru** — Her iki markanın altında "Yetkili" etiketi kalsın
4. **Logo boyutlarını büyüt** — Sadece 2 marka olduğu için kart boyutunu artır (w-36 h-24 gibi) ve logoları `object-contain` ile göster

### Teknik detay

```tsx
const AUTHORIZED_BRANDS = [
  { name: "Samsung", logo: "/brands/samsung-logo.png" },
  { name: "LG", logo: "/brands/lg-logo.png" },
];
```

Kart içindeki `<span>` yazısı yerine `<img src={brand.logo}>` kullanılacak. Düzen iki marka için ortalanmış, daha geniş kartlarla gösterilecek.

### Dosya
- `src/components/home/BrandShowcase.tsx`

