import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Wrench, MessageCircle, Phone, CheckCircle2, Star } from "lucide-react";
import { PremiumIconInline, PremiumBadgeIcon } from "@/components/PremiumIcon";
import PremiumIcon from "@/components/PremiumIcon";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES, BRAND, BRANCHES } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import QuoteForm from "@/components/QuoteForm";

// SEO-optimized category landing page content
const CATEGORY_LANDING_DATA: Record<string, {
  headline: string;
  subheadline: string;
  description: string;
  benefits: string[];
  metaTitle: string;
  metaDesc: string;
  gradient: string;
}> = {
  "beyaz-esya": {
    headline: "Beyaz Eşyada Güvenilir Adres",
    subheadline: "Samsung & LG Yetkili Bayisinden 2 Yıl Garantili Beyaz Eşya",
    description: "Buzdolabı, çamaşır makinesi, bulaşık makinesi ve daha fazlası — yetkili garantiyle evinize gelsin. Ücretsiz montaj ve kişiye özel fiyatlarla hayalinizdeki mutfağa kavuşun.",
    benefits: ["Ücretsiz Kurulum & Montaj", "2 Yıl Resmi Garanti", "Eski Cihaz Değişim İmkanı", "Taksitli Ödeme Seçenekleri"],
    metaTitle: "Beyaz Eşya | Samsung & LG Yetkili Bayi - Zorlu Digital Plaza",
    metaDesc: "Beyaz eşyada en uygun fiyatlar. Samsung, LG buzdolabı, çamaşır makinesi, bulaşık makinesi. 2 yıl garanti, ücretsiz montaj. Kıbrıs'ın güvenilir beyaz eşya mağazası.",
    gradient: "from-blue-600 to-blue-800",
  },
  "ankastre": {
    headline: "Ankastre Mutfak Çözümleri",
    subheadline: "Modern Mutfağınız İçin Premium Ankastre Ürünler",
    description: "Fırın, ocak ve davlumbaz — mutfağınıza şıklık ve fonksiyonellik katın. En son teknoloji ankastre ürünlerle hayalinizdeki mutfağı tasarlayın.",
    benefits: ["Profesyonel Montaj Hizmeti", "Mutfak Tasarım Desteği", "2 Yıl Garanti", "Komple Set Avantajı"],
    metaTitle: "Ankastre Ürünler | Fırın, Ocak, Davlumbaz - Zorlu Digital Plaza",
    metaDesc: "Ankastre fırın, ocak, davlumbaz. Samsung, LG ankastre mutfak ürünleri. Ücretsiz montaj, 2 yıl garanti. Kıbrıs ankastre mağazası.",
    gradient: "from-amber-600 to-orange-700",
  },
  "klima-isitma": {
    headline: "Klima & İklimlendirme",
    subheadline: "Evinize 4 Mevsim Konfor — Yetkili Servis Güvencesiyle",
    description: "Split klima, portatif klima ve ısıtıcılarda özel fiyatlar. Samsung ve LG'nin en verimli klimalarıyla yazın serin, kışın sıcak kalın.",
    benefits: ["Ücretsiz Keşif & Montaj", "Enerji Tasarruflu Modeller", "7/24 Servis Desteği", "5 Yıla Kadar Kompresör Garantisi"],
    metaTitle: "Klima Fiyatları | Samsung & LG Klima - Zorlu Digital Plaza",
    metaDesc: "Klima fiyatları, split klima, inverter klima modelleri. Samsung, LG yetkili klima bayisi. Ücretsiz montaj dahil. Kıbrıs klima satış ve montaj.",
    gradient: "from-cyan-600 to-teal-700",
  },
  "tv-goruntu": {
    headline: "TV & Görüntü Sistemleri",
    subheadline: "OLED, QLED ve Smart TV'lerde Yetkili Bayi Farkı",
    description: "Samsung ve LG'nin en yeni OLED, QLED ve NanoCell televizyonları. Sinema deneyimini evinize getirin — soundbar ve ses sistemleriyle birlikte.",
    benefits: ["Ücretsiz Duvar Montajı", "Soundbar Kombo Fırsatları", "4K & 8K Seçenekleri", "Yetkili Bayi Garantisi"],
    metaTitle: "TV Fiyatları | Samsung & LG OLED TV - Zorlu Digital Plaza",
    metaDesc: "Samsung, LG OLED TV, QLED TV fiyatları. 4K, 8K televizyon modelleri. Ücretsiz duvar montajı. Kıbrıs TV mağazası, yetkili bayi.",
    gradient: "from-purple-600 to-indigo-800",
  },
  "mutfak-aletleri": {
    headline: "Mutfak Aletleri",
    subheadline: "Pratik Mutfak Çözümleri — Air Fryer'dan Kahve Makinesine",
    description: "Air fryer, mikrodalga, kahve makinesi ve daha fazlası. Mutfağınızda zaman kazandıran, hayatınızı kolaylaştıran küçük ev aletleri.",
    benefits: ["Geniş Ürün Yelpazesi", "2 Yıl Garanti", "Uygun Fiyat Garantisi", "Hızlı Teslimat"],
    metaTitle: "Mutfak Aletleri | Air Fryer, Kahve Makinesi - Zorlu Digital Plaza",
    metaDesc: "Air fryer, mikrodalga fırın, kahve makinesi, su sebili fiyatları. 2 yıl garanti. Kıbrıs mutfak aletleri mağazası.",
    gradient: "from-rose-600 to-pink-700",
  },
  "kucuk-ev-aletleri": {
    headline: "Küçük Ev Aletleri",
    subheadline: "Evinizin Her Köşesi İçin Akıllı Çözümler",
    description: "Robot süpürge, ütü, vantilatör ve daha fazlası. Ev işlerinizi kolaylaştıran akıllı küçük ev aletleri yetkili garantiyle kapınızda.",
    benefits: ["Ücretsiz Kargo", "2 Yıl Garanti", "Kolay İade", "En İyi Fiyat"],
    metaTitle: "Küçük Ev Aletleri | Süpürge, Ütü - Zorlu Digital Plaza",
    metaDesc: "Robot süpürge, dikey süpürge, ütü, vantilatör fiyatları. 2 yıl garanti ile küçük ev aletleri. Kıbrıs.",
    gradient: "from-emerald-600 to-green-700",
  },
  "ses-sistemleri": {
    headline: "Ses Sistemleri",
    subheadline: "Premium Ses Deneyimi — Bluetooth Hoparlörden Soundbar'a",
    description: "Bluetooth hoparlör, kulaklık ve soundbar modelleriyle müziğin keyfini çıkarın. Samsung ve LG ses sistemlerinde yetkili bayi avantajı.",
    benefits: ["Mağazada Deneme İmkanı", "2 Yıl Garanti", "Ücretsiz Kargo", "Taksit Seçenekleri"],
    metaTitle: "Ses Sistemleri | Bluetooth Hoparlör, Soundbar - Zorlu Digital Plaza",
    metaDesc: "Bluetooth hoparlör, kulaklık, soundbar fiyatları. Samsung, LG ses sistemleri. 2 yıl garanti. Kıbrıs.",
    gradient: "from-violet-600 to-purple-800",
  },
  "aksesuar": {
    headline: "Aksesuarlar",
    subheadline: "TV Askı Aparatları, Temizlik Ürünleri ve Daha Fazlası",
    description: "TV askı aparatları, cihaz temizlik ürünleri ve uydu ekipmanları. Cihazlarınız için ihtiyacınız olan her aksesuar tek adreste.",
    benefits: ["Geniş Ürün Seçeneği", "Uygun Fiyatlar", "Hızlı Teslimat", "Uzman Destek"],
    metaTitle: "Aksesuar | TV Askı, Temizlik Ürünleri - Zorlu Digital Plaza",
    metaDesc: "TV askı aparatları, uydu ekipmanları, temizlik ürünleri. Zorlu Digital Plaza aksesuarlar.",
    gradient: "from-slate-600 to-gray-800",
  },
  "oyun": {
    headline: "Oyun Dünyası",
    subheadline: "Oyun Aksesuarları ve Ekipmanları",
    description: "Oyun deneyiminizi üst seviyeye taşıyacak aksesuarlar. En yeni oyun ekipmanları yetkili garantiyle.",
    benefits: ["Orijinal Ürün Garantisi", "Geniş Aksesuar Seçeneği", "2 Yıl Garanti", "Hızlı Teslimat"],
    metaTitle: "Oyun Aksesuarları | Gaming - Zorlu Digital Plaza",
    metaDesc: "Oyun aksesuarları, gaming ekipmanları. Orijinal ürün garantisi. Zorlu Digital Plaza.",
    gradient: "from-red-600 to-red-800",
  },
  "elektronik-aksesuar": {
    headline: "Diğer Elektronik Ürünler",
    subheadline: "Teknolojinin Her Alanında Yanınızdayız",
    description: "İhtiyacınız olan tüm elektronik ürün ve aksesuarlar tek bir adreste. Yetkili bayi güvencesiyle alışveriş yapın.",
    benefits: ["Yetkili Bayi Güvencesi", "2 Yıl Garanti", "Uzman Danışmanlık", "Uygun Fiyat"],
    metaTitle: "Elektronik Ürünler | Zorlu Digital Plaza",
    metaDesc: "Elektronik ürünler ve aksesuarlar. Samsung, LG yetkili bayi. 2 yıl garanti. Kıbrıs.",
    gradient: "from-sky-600 to-blue-700",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const trustItems = [
  { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
  { icon: Award, label: "2 Yıl Garanti", desc: "Tüm ürünlerde" },
  { icon: Wrench, label: "Ücretsiz Montaj", desc: "Uygun ürünlerde" },
  { icon: Star, label: "Müşteri Memnuniyeti", desc: "%98 memnuniyet" },
];

export default function CategoryLandingPage() {
  const { categorySlug } = useParams();
  const { data: products = [] } = useProducts();

  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const landing = CATEGORY_LANDING_DATA[categorySlug || ""];
  const categoryProducts = useMemo(
    () => getProductsByCategory(products, categorySlug || ""),
    [products, categorySlug]
  );
  const featuredProducts = categoryProducts.filter(p => p.isFeatured).slice(0, 8);
  const displayProducts = featuredProducts.length >= 4 ? featuredProducts : categoryProducts.slice(0, 8);

  if (!category || !landing) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Kategori bulunamadı.</p>
      </div>
    );
  }

  // Set document title for SEO
  if (typeof document !== "undefined") {
    document.title = landing.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", landing.metaDesc);
  }

  return (
    <>
      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${landing.gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAyYzguODM3IDAgMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2LTE2LTcuMTYzLTE2LTE2IDcuMTYzLTE2IDE2LTE2eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="container relative py-14 md:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-5 border border-white/20">
              <PremiumIconInline icon={Shield} size={14} /> {BRAND.name} — Yetkili Bayi
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4 text-white">
              {landing.headline}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              {landing.subheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#urunler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg">
                  Ürünleri Gör <PremiumIconInline icon={ArrowRight} size={16} />
                </Button>
              </a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="font-semibold gap-2 rounded-full px-6 shadow-lg border-0"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                >
                  <PremiumIconInline icon={MessageCircle} size={16} /> Hemen Bilgi Al
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-3"
              >
                <PremiumIcon icon={item.icon} size="sm" variant="glow" />
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Benefits */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Neden {BRAND.shortName}?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {landing.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {landing.benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3.5"
                  >
                    <PremiumBadgeIcon icon={CheckCircle2} size={20} />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                Ücretsiz Teklif Alın
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Bilgilerinizi bırakın, size özel fiyat teklifimizi sunalım.
              </p>
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      {category.children.length > 0 && (
        <section className="py-8 bg-muted/40">
          <div className="container">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 text-center">
              Alt Kategoriler
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {category.children.map((sub, i) => (
                <motion.div key={sub.slug} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link
                    to={`/kategori/${category.slug}/${sub.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all shadow-sm"
                  >
                    {sub.name} <PremiumIconInline icon={ArrowRight} size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section id="urunler" className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Öne Çıkan {category.name}
              </h2>
              <p className="text-muted-foreground mt-1">{displayProducts.length} ürün listeleniyor</p>
            </div>
            <Link
              to={`/kategori/${category.slug}`}
              className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block"
            >
              Tümünü Gör →
            </Link>
          </div>

          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {displayProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-border bg-card">
              <p className="text-muted-foreground mb-4">Bu kategoride henüz ürün eklenmemiş.</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full gap-2" style={{ backgroundColor: "#25D366", color: "#fff" }}>
                  <PremiumIconInline icon={MessageCircle} size={16} /> WhatsApp ile Sorun
                </Button>
              </a>
            </div>
          )}

          <div className="text-center mt-6 sm:hidden">
            <Link to={`/kategori/${category.slug}`}>
              <Button variant="outline" className="rounded-full">Tüm Ürünleri Gör</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hemen İletişime Geçin
            </h2>
            <p className="text-muted-foreground">
              Mağazalarımızı ziyaret edin veya bize ulaşın. Uzman ekibimiz size yardımcı olmaya hazır.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="card-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-success/40 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                <PremiumIconInline icon={MessageCircle} size={24} />
              </div>
              <div>
                <p className="font-bold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Hızlı yanıt alın</p>
              </div>
            </a>
            <a
              href={`tel:${BRAND.phone}`}
              className="card-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <PremiumIconInline icon={Phone} size={24} />
              </div>
              <div>
                <p className="font-bold text-foreground">Telefon</p>
                <p className="text-sm text-muted-foreground">{BRAND.phoneDisplay}</p>
              </div>
            </a>
            <Link
              to="/subelerimiz"
              className="card-lift flex items-center gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors sm:col-span-2 lg:col-span-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <PremiumIconInline icon={ArrowRight} size={24} />
              </div>
              <div>
                <p className="font-bold text-foreground">Mağazalarımız</p>
                <p className="text-sm text-muted-foreground">{BRANCHES.length} lokasyon</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
