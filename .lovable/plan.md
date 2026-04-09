

## Plan: Yasal Sayfaları Premium Tasarıma Donusturme

### Hedef
5 yasal sayfayi (Mesafeli Satis Sozlesmesi, Cerez Politikasi, KVKK, Gizlilik Politikasi, Kullanim Kosullari) Surdurulebilirlik sayfasindaki premium tasarima uygun hale getirmek.

### Degisiklikler — `src/pages/ContentPages.tsx`

Her bir yasal sayfa icin su donusumler uygulanacak:

**1. Premium Hero Ekleme**
- Her sayfanin basina `PremiumIcon` (xl, glow variant) ile ikon ekleme
- Sayfa basligini ortalanmis hero blogu icine tasima
- Kisa aciklama metni ekleme (Surdurulebilirlik sayfasindaki gibi)

**2. Ikon Eslestirmeleri**
| Sayfa | Ikon |
|-------|------|
| Kullanim Kosullari | `FileText` |
| Gizlilik Politikasi | `ShieldCheck` |
| KVKK | `Lock` |
| Cerez Politikasi | `Cookie` |
| Mesafeli Satis Sozlesmesi | `FileSignature` / `ScrollText` |

**3. Icerik Kartlarina Premium Efekt**
- Her h2 bolumunu `rounded-2xl border border-border bg-card p-6 md:p-8` kartina sarma
- Kartlara `whileHover` animasyonu ve `inset boxShadow` pulse efekti ekleme
- Her kartin basina ilgili `PremiumIcon` (lg, glow) ekleme
- h2 basliklarına animasyonlu renk gecisi ekleme (mavi pulse)

**4. Mevcut Kart Yapilarini Koruma**
- Cerez Politikasi ve Mesafeli Satis Sozlesmesindeki mevcut grid kartlarina sadece `PremiumIcon` ekleme
- KVKK sayfasindaki mevcut kart yapisini koruyup PremiumIcon entegre etme

**5. Alt Slogan**
- Her sayfanin sonuna Surdurulebilirlik sayfasindaki gibi animasyonlu `Zorlu Digital Plaza | ...` slogani ekleme

### Kullanilacak Lucide Ikonlari
`FileText`, `ShieldCheck`, `Lock`, `Cookie`, `ScrollText`, `Shield`, `Eye`, `Database`, `UserCheck`, `Settings`, `BarChart3`, `AlertCircle`

### Dosya Degisiklikleri
| Dosya | Islem |
|-------|-------|
| `src/pages/ContentPages.tsx` | 5 yasal sayfa fonksiyonunu guncelle |

Toplam 5 fonksiyon: `KullanimKosullariPage`, `GizlilikPolitikasiPage`, `KvkkPage`, `CerezPolitikasiPage`, `MesafeliSatisSozlesmesiPage`

