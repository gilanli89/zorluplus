import { motion } from "framer-motion";
import { Building2, Package, Truck, HeadphonesIcon, BadgeCheck, Users, Wrench, Phone, Mail, ChevronRight } from "lucide-react";
import PremiumIcon, { PremiumBadgeIcon } from "@/components/PremiumIcon";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

const pulse = {
  boxShadow: [
    "inset 0 0 30px hsl(221,83%,53%,0.0)",
    "inset 0 0 30px hsl(221,83%,53%,0.1)",
    "inset 0 0 30px hsl(221,83%,53%,0.0)",
  ],
};

const colorCycle = {
  color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"],
};

const brands = [
  { name: "Samsung", logo: "/brands/samsung-logo.png" },
  { name: "LG", logo: "/brands/lg-logo.png" },
  { name: "Midea", logo: "/brands/midea.png" },
  { name: "AUX", logo: "/brands/aux.png" },
  { name: "Toshiba", logo: "/brands/toshiba.png" },
  { name: "Philips", logo: "/brands/philips.png" },
  { name: "Krups", logo: "/brands/krups.png" },
  { name: "Sharp", logo: "/brands/sharp.png" },
];

export default function B2BPage() {
  const { t, lang } = useLanguage();

  const productGroups = lang === "tr" ? [
    "Her Boy Televizyonlar – 55\" / 65\" / 75\" / 85\" Smart TV",
    "Soundbar ve Ses Sistemleri",
    "Bluetooth Kulaklık ve Ses Teknolojileri",
    "Inverter Klima Sistemleri",
    "Inverter Buzdolapları",
    "Çamaşır ve Kurutma Makineleri",
    "Bulaşık Makineleri",
    "Filtre ve Kapsüllü Kahve Makineleri",
    "Air Fryer ve Multi Cooker",
    "Ankastre Mutfak Setleri",
    "Smart Projeksiyon Sistemleri",
    "Fan ve Konvektör Isıtıcılar",
    "Su Sebilleri",
    "TV Duvar Aparatları (Sabit ve dönebilen modeller)",
    "Yedek Kumandalar ve Elektronik Aksesuarlar",
  ] : [
    "All Size TVs – 55\" / 65\" / 75\" / 85\" Smart TV",
    "Soundbar and Audio Systems",
    "Bluetooth Headphones and Audio Technologies",
    "Inverter AC Systems",
    "Inverter Refrigerators",
    "Washing and Dryer Machines",
    "Dishwashers",
    "Filter and Capsule Coffee Machines",
    "Air Fryer and Multi Cooker",
    "Built-in Kitchen Sets",
    "Smart Projection Systems",
    "Fan and Convector Heaters",
    "Water Dispensers",
    "TV Wall Mounts (Fixed and swivel models)",
    "Remote Controls and Electronic Accessories",
  ];

  const advantages = lang === "tr" ? [
    { icon: BadgeCheck, text: "Kurumsal müşterilere özel fiyat teklifleri" },
    { icon: Package, text: "Toplu alım avantajları" },
    { icon: Building2, text: "Proje bazlı teknoloji çözümleri" },
    { icon: HeadphonesIcon, text: "Satış öncesi profesyonel danışmanlık" },
    { icon: Wrench, text: "Satış sonrası teknik destek" },
    { icon: Truck, text: "Hızlı sevkiyat ve teslimat süreçleri" },
    { icon: Users, text: "Kurulum ve teknik servis desteği" },
  ] : [
    { icon: BadgeCheck, text: "Special price offers for corporate customers" },
    { icon: Package, text: "Bulk purchase advantages" },
    { icon: Building2, text: "Project-based technology solutions" },
    { icon: HeadphonesIcon, text: "Pre-sales professional consultancy" },
    { icon: Wrench, text: "After-sales technical support" },
    { icon: Truck, text: "Fast shipping and delivery processes" },
    { icon: Users, text: "Installation and technical service support" },
  ];

  const corporateSolutions = lang === "tr" ? [
    "Ofis ve ticari alanlar için TV ve ekran çözümleri",
    "Restoran ve kafeler için profesyonel mutfak ekipmanları",
    "Oteller ve turizm işletmeleri için elektronik çözümler",
    "Toplantı ve konferans sistemleri",
    "Güvenlik kamera sistemleri",
    "İklimlendirme ve klima çözümleri",
  ] : [
    "TV and screen solutions for offices and commercial spaces",
    "Professional kitchen equipment for restaurants and cafes",
    "Electronic solutions for hotels and tourism businesses",
    "Meeting and conference systems",
    "Security camera systems",
    "Climate control and AC solutions",
  ];

  const processSteps = lang === "tr" ? [
    "İhtiyaç analizi",
    "Ürün ve teknoloji danışmanlığı",
    "Kurumsal fiyat teklifi",
    "Hızlı sipariş ve sevkiyat",
    "Kurulum ve teknik destek",
    "Satış sonrası servis ve destek",
  ] : [
    "Needs analysis",
    "Product and technology consultancy",
    "Corporate price quotation",
    "Fast ordering and shipping",
    "Installation and technical support",
    "After-sales service and support",
  ];

  const finalAdvantages = lang === "tr" ? [
    "Kurumsal müşterilere özel fiyat avantajı",
    "Toplu alım fırsatları",
    "Dünya markaları ile geniş ürün portföyü",
    "Profesyonel teknoloji danışmanlığı",
    "Satış sonrası teknik servis desteği",
    "Hızlı teslimat ve kurulum hizmeti",
    "Kurumsal müşteri destek hattı",
  ] : [
    "Special price advantages for corporate customers",
    "Bulk purchase opportunities",
    "Wide product portfolio with world brands",
    "Professional technology consultancy",
    "After-sales technical service support",
    "Fast delivery and installation service",
    "Corporate customer support line",
  ];

  const seoTags = lang === "tr" ? [
    "B2B Elektronik Satış KKTC", "Kurumsal Teknoloji Tedarik", "Toplu Alım Elektronik",
    "Samsung Kurumsal Satış", "LG Kurumsal Çözümler", "Otel Elektronik Çözümleri",
    "Ofis Teknoloji Çözümleri", "KKTC Kurumsal Klima", "Restoran Ekipmanları KKTC",
  ] : [
    "B2B Electronics Sales N.Cyprus", "Corporate Technology Procurement", "Bulk Electronics Purchase",
    "Samsung Corporate Sales", "LG Corporate Solutions", "Hotel Electronics Solutions",
    "Office Technology Solutions", "N.Cyprus Corporate AC", "Restaurant Equipment N.Cyprus",
  ];

  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      {/* Hero */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6 flex justify-center">
          <PremiumIcon icon={Building2} size="xl" variant="glow" />
        </div>
        <motion.h1
          className="heading-1 mb-4"
          animate={colorCycle}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("b2b.heroTitle")}
        </motion.h1>
        <p className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-4">Zorlu Digital Trade &amp; Services Ltd.</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("b2b.heroDesc1")}</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3">{t("b2b.heroDesc2")}</p>
      </motion.div>

      <SectionCard title={t("b2b.procurement")} delay={0}>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("b2b.procurementDesc")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.brands")} delay={0.1}>
        <p className="text-sm text-muted-foreground mb-4">{t("b2b.brandsDesc")}</p>
        <div className="flex flex-wrap gap-3">
          {brands.map((b) => (
            <motion.div key={b.name} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/50" whileHover={{ scale: 1.05, borderColor: "hsl(221,83%,53%)" }}>
              <img src={b.logo} alt={b.name} className="h-6 w-auto object-contain" />
              <span className="text-sm font-medium text-foreground">{b.name}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{t("b2b.brandsNote")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.productGroups")} delay={0.15}>
        <p className="text-sm text-muted-foreground mb-4">{t("b2b.productGroupsDesc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {productGroups.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
               <PremiumBadgeIcon icon={ChevronRight} size={14} />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={t("b2b.advantages")} delay={0.2}>
        <p className="text-sm text-muted-foreground mb-4">{t("b2b.advantagesDesc")}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {advantages.map((a) => (
            <motion.div key={a.text} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 card-premium relative overflow-hidden" whileHover={{ y: -2 }}>
              <motion.div className="absolute inset-0 rounded-xl pointer-events-none" animate={pulse} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
              <PremiumIcon icon={a.icon} size="sm" variant="glow" containerClassName="shrink-0 relative z-10" />
              <span className="text-sm text-foreground relative z-10">{a.text}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{t("b2b.advantagesNote")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.customSolutions")} delay={0.25}>
        <p className="text-sm text-muted-foreground mb-4">{t("b2b.customSolutionsDesc")}</p>
        <div className="space-y-2">
          {corporateSolutions.map((s) => (
            <div key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
              <PremiumBadgeIcon icon={ChevronRight} size={14} />
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{t("b2b.customSolutionsNote")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.sme")} delay={0.3}>
        <p className="text-sm text-muted-foreground mb-3">{t("b2b.smeDesc1")}</p>
        <p className="text-sm text-muted-foreground">{t("b2b.smeDesc2")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.enterprise")} delay={0.35}>
        <p className="text-sm text-muted-foreground mb-3">{t("b2b.enterpriseDesc1")}</p>
        <p className="text-sm text-muted-foreground">{t("b2b.enterpriseDesc2")}</p>
      </SectionCard>

      <SectionCard title={t("b2b.process")} delay={0.4}>
        <p className="text-sm text-muted-foreground mb-4">{t("b2b.processDesc")}</p>
        <div className="space-y-3">
          {processSteps.map((step, i) => (
            <motion.div key={step} className="flex items-center gap-4 relative overflow-hidden rounded-xl border border-border bg-muted/30 p-3" whileHover={{ x: 4 }}>
              <motion.div className="absolute inset-0 rounded-xl pointer-events-none" animate={pulse} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
              <motion.span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-display font-bold text-sm shrink-0 relative z-10" animate={{ color: ["hsl(221,83%,53%)", "hsl(221,83%,70%)", "hsl(221,83%,53%)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                {i + 1}
              </motion.span>
              <span className="text-sm text-foreground relative z-10">{step}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">{t("b2b.processNote")}</p>
      </SectionCard>

      {/* Final Advantages */}
      <motion.div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={pulse} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.h2 className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10" animate={colorCycle} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          {t("b2b.finalTitle")}
        </motion.h2>
        <div className="space-y-2 relative z-10">
          {finalAdvantages.map((a) => (
            <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
              <PremiumBadgeIcon icon={BadgeCheck} size={16} />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Brand Footer */}
      <motion.div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 40px hsl(221,83%,53%,0.0)", "inset 0 0 40px hsl(221,83%,53%,0.12)", "inset 0 0 40px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <motion.h2 className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10" animate={colorCycle} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          Zorlu Digital Plaza
        </motion.h2>
        <p className="text-sm text-muted-foreground relative z-10 mb-4">{t("b2b.trust")}</p>
        <p className="text-sm text-muted-foreground relative z-10 max-w-xl mx-auto mb-6">{t("b2b.footerDesc")}</p>
        <motion.h3 className="font-display text-lg font-bold mb-3 relative z-10" animate={{ color: ["hsl(221,83%,53%)", "hsl(221,83%,70%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          {t("b2b.contactTitle")}
        </motion.h3>
        <p className="text-sm text-muted-foreground relative z-10 mb-4">{t("b2b.contactDesc")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <PremiumIconInline icon={Mail} size={16} /> deniz@zorludigitalplaza.com
          </a>
          <a href="tel:+905428783131" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <PremiumIconInline icon={Phone} size={16} /> +90 542 878 31 31
          </a>
        </div>
      </motion.div>

      {/* SEO Tags */}
      <motion.div className="mt-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 }}>
        <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("b2b.seoTitle")}</h4>
        <div className="flex flex-wrap gap-2">
          {seoTags.map((tag) => (
            <motion.span key={tag} className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground" whileHover={{ borderColor: "hsl(221,83%,53%)", color: "hsl(221,83%,53%)", scale: 1.05 }}>
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function SectionCard({ title, delay = 0, children }: { title: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="card-premium card-premium-border rounded-2xl p-6 md:p-8 relative overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.h2
        className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10"
        animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {title}
      </motion.h2>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
