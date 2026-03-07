import { motion } from "framer-motion";
import { Building2, Package, Truck, HeadphonesIcon, BadgeCheck, Users, Wrench, Phone, Mail, ChevronRight } from "lucide-react";
import { BRAND } from "@/lib/constants";

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

const brands = ["Samsung", "LG", "Midea", "AUX", "Toshiba", "Philips", "Krups", "Sharp"];

const productGroups = [
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
];

const advantages = [
  { icon: BadgeCheck, text: "Kurumsal müşterilere özel fiyat teklifleri" },
  { icon: Package, text: "Toplu alım avantajları" },
  { icon: Building2, text: "Proje bazlı teknoloji çözümleri" },
  { icon: HeadphonesIcon, text: "Satış öncesi profesyonel danışmanlık" },
  { icon: Wrench, text: "Satış sonrası teknik destek" },
  { icon: Truck, text: "Hızlı sevkiyat ve teslimat süreçleri" },
  { icon: Users, text: "Kurulum ve teknik servis desteği" },
];

const corporateSolutions = [
  "Ofis ve ticari alanlar için TV ve ekran çözümleri",
  "Restoran ve kafeler için profesyonel mutfak ekipmanları",
  "Oteller ve turizm işletmeleri için elektronik çözümler",
  "Toplantı ve konferans sistemleri",
  "Güvenlik kamera sistemleri",
  "İklimlendirme ve klima çözümleri",
];

const processSteps = [
  "İhtiyaç analizi",
  "Ürün ve teknoloji danışmanlığı",
  "Kurumsal fiyat teklifi",
  "Hızlı sipariş ve sevkiyat",
  "Kurulum ve teknik destek",
  "Satış sonrası servis ve destek",
];

const finalAdvantages = [
  "Kurumsal müşterilere özel fiyat avantajı",
  "Toplu alım fırsatları",
  "Dünya markaları ile geniş ürün portföyü",
  "Profesyonel teknoloji danışmanlığı",
  "Satış sonrası teknik servis desteği",
  "Hızlı teslimat ve kurulum hizmeti",
  "Kurumsal müşteri destek hattı",
];

export default function B2BPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      {/* Hero */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6"
          animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 25px hsl(221,83%,53%,0.4)", "0 0 0px hsl(221,83%,53%,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Building2 className="h-8 w-8 text-primary" />
        </motion.span>
        <motion.h1
          className="font-display text-3xl md:text-4xl font-bold mb-4"
          animate={colorCycle}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Zorlu Digital Plaza ile Kurumsal Teknoloji Çözümleri
        </motion.h1>
        <p className="text-xs font-bold text-primary/70 tracking-widest uppercase mb-4">Zorlu Digital Trade &amp; Services Ltd.</p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Zorlu Digital Plaza, Kuzey Kıbrıs'ta faaliyet gösteren şirketler, kurumlar ve işletmeler için profesyonel kurumsal teknoloji tedarik ve B2B satış çözümleri sunmaktadır.
        </p>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3">
          Şirketinizin ihtiyaç duyduğu televizyon, klima, beyaz eşya, ofis teknolojileri, elektronik cihazlar ve profesyonel ekipmanlara kurumsal fiyat avantajları ve toplu alım çözümleri ile kolayca ulaşabilirsiniz.
        </p>
      </motion.div>

      {/* Kurumsal Elektronik Ürün Tedariki */}
      <SectionCard title="Kurumsal Elektronik Ürün Tedariki" delay={0}>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Zorlu Digital Plaza, küçük işletmelerden büyük kurumsal firmalara kadar tüm işletmeler için geniş bir teknoloji ve elektronik ürün portföyü sunmaktadır. Şirketiniz için gerekli ürünleri toplu alım avantajları ve özel kurumsal fiyat teklifleri ile temin edebilirsiniz.
        </p>
      </SectionCard>

      {/* Çalıştığımız Markalar */}
      <SectionCard title="Çalıştığımız Markalar" delay={0.1}>
        <p className="text-sm text-muted-foreground mb-4">Zorlu Digital Plaza, dünya çapında güvenilir teknoloji markalarının ürünlerini kurumsal müşterilerine sunmaktadır.</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <motion.span
              key={b}
              className="px-4 py-2 rounded-full border border-border bg-muted/50 text-sm font-medium text-foreground"
              whileHover={{ scale: 1.05, borderColor: "hsl(221,83%,53%)" }}
            >
              {b}
            </motion.span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Bu markalara ait ürünler için satış, kurulum, teknik servis ve satış sonrası destek hizmetleri sağlanmaktadır.</p>
      </SectionCard>

      {/* Ürün Gruplarımız */}
      <SectionCard title="Ürün Gruplarımız" delay={0.15}>
        <p className="text-sm text-muted-foreground mb-4">Kurumsal müşterilerimiz için sunduğumuz ürün kategorileri:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {productGroups.map((p) => (
            <div key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* B2B Avantajları */}
      <SectionCard title="B2B Kurumsal Satış Avantajları" delay={0.2}>
        <p className="text-sm text-muted-foreground mb-4">Zorlu Digital Plaza kurumsal satış hizmeti ile işletmeler birçok avantajdan yararlanabilir.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {advantages.map((a) => (
            <motion.div
              key={a.text}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30 relative overflow-hidden"
              whileHover={{ y: -2, boxShadow: "0 8px 20px -6px hsl(221 83% 53% / 0.15)" }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={pulse}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <a.icon className="h-5 w-5 text-primary shrink-0 relative z-10" />
              <span className="text-sm text-foreground relative z-10">{a.text}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Uzman ekiplerimiz, işletmenizin ihtiyaçlarını analiz ederek en doğru teknoloji çözümlerini en uygun maliyetlerle sunar.</p>
      </SectionCard>

      {/* Kurumlara Özel Çözümler */}
      <SectionCard title="Kurumlara Özel Teknolojik Çözümler" delay={0.25}>
        <p className="text-sm text-muted-foreground mb-4">Her işletmenin teknoloji ihtiyaçları farklıdır. Zorlu Digital Plaza, kurumsal müşterilerine ihtiyaçlarına uygun özel teknoloji çözümleri sunmaktadır.</p>
        <div className="space-y-2">
          {corporateSolutions.map((s) => (
            <div key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span>{s}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Profesyonel ekiplerimiz, işletmenizin ihtiyaçlarını analiz ederek en verimli teknoloji altyapısını oluşturmanıza yardımcı olur.</p>
      </SectionCard>

      {/* KOBİ */}
      <SectionCard title="KOBİ'ler İçin Teknoloji Çözümleri" delay={0.3}>
        <p className="text-sm text-muted-foreground mb-3">Küçük ve orta ölçekli işletmelerin büyüme süreçlerinde doğru teknoloji yatırımları büyük önem taşır.</p>
        <p className="text-sm text-muted-foreground">Zorlu Digital Plaza, KOBİ'lere yönelik televizyon ve ekran çözümleri, ofis teknolojileri, güvenlik kamera sistemleri, klima ve iklimlendirme sistemleri, mutfak ve küçük ev aletleri gibi birçok teknolojik ürünü uygun fiyat ve kurumsal destek ile sunmaktadır.</p>
      </SectionCard>

      {/* Büyük Ölçekli */}
      <SectionCard title="Büyük Ölçekli Firmalara Özel Çözümler" delay={0.35}>
        <p className="text-sm text-muted-foreground mb-3">Kurumsal ölçek büyüdükçe teknoloji altyapısı da daha kapsamlı hale gelir.</p>
        <p className="text-sm text-muted-foreground">Zorlu Digital Plaza, büyük ölçekli kurumlara otel ve turizm sektörü elektronik çözümleri, restoran ve kafe ekipmanları, toplantı ve konferans teknolojileri, klima ve iklimlendirme sistemleri, profesyonel ekran ve görüntü sistemleri gibi gelişmiş teknoloji çözümleri sunmaktadır.</p>
      </SectionCard>

      {/* Satış Süreci */}
      <SectionCard title="Kurumsal Satış Süreci" delay={0.4}>
        <p className="text-sm text-muted-foreground mb-4">Zorlu Digital Plaza kurumsal satış süreci profesyonel şekilde yönetilir.</p>
        <div className="space-y-3">
          {processSteps.map((step, i) => (
            <motion.div
              key={step}
              className="flex items-center gap-4 relative overflow-hidden rounded-xl border border-border bg-muted/30 p-3"
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={pulse}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              />
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 font-display font-bold text-sm shrink-0 relative z-10"
                animate={{ color: ["hsl(221,83%,53%)", "hsl(221,83%,70%)", "hsl(221,83%,53%)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              >
                {i + 1}
              </motion.span>
              <span className="text-sm text-foreground relative z-10">{step}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">Bu süreç sayesinde işletmeler teknoloji yatırımlarını en doğru ve verimli şekilde planlayabilir.</p>
      </SectionCard>

      {/* Final Advantages */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={pulse}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10"
          animate={colorCycle}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Zorlu Digital Plaza Kurumsal Avantajları
        </motion.h2>
        <div className="space-y-2 relative z-10">
          {finalAdvantages.map((a) => (
            <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
              <span>{a}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Brand Footer */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 40px hsl(221,83%,53%,0.0)", "inset 0 0 40px hsl(221,83%,53%,0.12)", "inset 0 0 40px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10"
          animate={colorCycle}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Zorlu Digital Plaza
        </motion.h2>
        <p className="text-sm text-muted-foreground relative z-10 mb-4">26 Yıllık Güven • Teknoloji • Hizmet</p>
        <p className="text-sm text-muted-foreground relative z-10 max-w-xl mx-auto mb-6">
          Zorlu Digital Plaza, Zorlu Digital Trade &amp; Services Ltd. bünyesinde faaliyet gösteren ve teknoloji perakendeciliği ile kurumsal teknoloji çözümleri alanında Kuzey Kıbrıs'ta güvenilir bir marka olarak hizmet vermektedir.
        </p>

        <motion.h3
          className="font-display text-lg font-bold mb-3 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(221,83%,70%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Kurumsal Satış İletişim
        </motion.h3>
        <p className="text-sm text-muted-foreground relative z-10 mb-4">Kurumsal satış ve toplu alım talepleriniz için bizimle iletişime geçebilirsiniz.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <Mail className="h-4 w-4" /> deniz@zorludigitalplaza.com
          </a>
          <a href="tel:+905428783131" className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
            <Phone className="h-4 w-4" /> +90 542 878 31 31
          </a>
        </div>
      </motion.div>

      {/* SEO Tags */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-muted-foreground">Sık Aranan Kurumsal Hizmetler</h4>
        <div className="flex flex-wrap gap-2">
          {[
            "B2B Elektronik Satış KKTC",
            "Kurumsal Teknoloji Tedarik",
            "Toplu Alım Elektronik",
            "Samsung Kurumsal Satış",
            "LG Kurumsal Çözümler",
            "Otel Elektronik Çözümleri",
            "Ofis Teknoloji Çözümleri",
            "KKTC Kurumsal Klima",
            "Restoran Ekipmanları KKTC",
          ].map((tag) => (
            <motion.span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground"
              whileHover={{ borderColor: "hsl(221,83%,53%)", color: "hsl(221,83%,53%)", scale: 1.05 }}
            >
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
      className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={pulse}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.h2
        className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10"
        animate={colorCycle}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {title}
      </motion.h2>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
