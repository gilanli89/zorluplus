import { useState, useEffect, useRef } from "react";
import ContentPage from "@/components/ContentPage";
import { motion } from "framer-motion";
import { Users, Clock, Star, Truck, ShieldCheck, HeartHandshake, MapPin, Quote, Mail, Recycle, BatteryCharging, Zap, Globe, Lightbulb, Leaf, Monitor, Snowflake, Refrigerator, Coffee, Volume2, Cpu, CheckCircle, Wrench, Building2, Phone, FileText, Lock, Cookie, ScrollText, Shield, Eye, Database, UserCheck, Settings, BarChart3, AlertCircle } from "lucide-react";
import { BRANCHES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import PremiumIcon, { PremiumBadgeIcon, PremiumIconInline } from "@/components/PremiumIcon";

const testimonials = [
  { name: "Emre Güneş", text: "Yıllardır birçok yerden alışveriş yaptım ama buradaki profesyonellik ve ilgi gerçekten bir başka. Hem fiyatlar hem de hizmet kalitesi beni fazlasıyla memnun etti." },
  { name: "Mert Yalçın", text: "Zorlu Digital Plaza'dan aldığım hizmetten gerçekten çok memnunum. Ekip her aşamada yardımcı oldu ve ürün seçiminde doğru yönlendirmeler yaptılar. Kesinlikle tavsiye ederim." },
  { name: "Ayşe Karademir", text: "Satın alma süreci çok kolaydı ve ürün beklediğimden daha hızlı elime ulaştı. Teknik destek ekibi de oldukça ilgiliydi." },
  { name: "Burak Erdemli", text: "Hem ürün kalitesi hem de satış sonrası destek mükemmel. Bir sorun yaşadığımda anında yardımcı oldular." },
  { name: "Selin Aras", text: "Mağazaya girdiğim anda güler yüzlü bir karşılama ve samimi bir ortam vardı. Aldığım tavsiyeler sayesinde tam ihtiyacıma uygun ürünü seçtim." },
];

const stats = [
  { value: 60000, suffix: "+", label: "Mutlu Müşteri", icon: Users },
  { value: 26, suffix: "", label: "Gurur Dolu Yıl", icon: Clock },
  { value: 2, suffix: "", label: "Mağaza", icon: MapPin },
];

function CountUp({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted = target >= 1000 ? count.toLocaleString("tr-TR") : count.toString();
  return <span ref={ref}>{formatted}{suffix}</span>;
}

export function HakkimizdaPage() {
  const { t } = useLanguage();

  const brands = [
    { name: "Samsung", logo: "/brands/samsung-logo.png" },
    { name: "LG", logo: "/brands/lg-logo.png" },
    { name: "Sony", logo: "/brands/sony.png" },
    { name: "Xiaomi", logo: "/brands/xiaomi.png" },
    { name: "TCL", logo: "/brands/tcl.png" },
    { name: "Midea", logo: "/brands/midea.png" },
    { name: "AUX", logo: "/brands/aux.png" },
    { name: "Toshiba", logo: "/brands/toshiba.png" },
    { name: "Philips", logo: "/brands/philips.png" },
    { name: "Tefal", logo: "/brands/tefal.png" },
    { name: "Krups", logo: "/brands/krups.png" },
    { name: "Sharp", logo: "/brands/sharp.png" },
    { name: "Bosch", logo: "/brands/bosch.png" },
    { name: "JBL", logo: "/brands/jbl.png" },
    { name: "Indesit", logo: "/brands/indesit.png" },
    { name: "ADAX", logo: "/brands/adax.png" },
    { name: "Atlantic", logo: "/brands/atlantic.png" },
  ];

  const whyFeatures = [
    t("about.why.f1"), t("about.why.f2"), t("about.why.f3"),
    t("about.why.f4"), t("about.why.f5"), t("about.why.f6"),
  ];

  const serviceItems = [
    t("about.service.s1"), t("about.service.s2"), t("about.service.s3"),
    t("about.service.s4"), t("about.service.s5"), t("about.service.s6"),
  ];

  const b2bFeatures = [
    t("about.b2b.f1"), t("about.b2b.f2"), t("about.b2b.f3"),
    t("about.b2b.f4"), t("about.b2b.f5"),
  ];

  const b2bProducts = [
    { icon: Monitor, label: t("about.cat.tv") },
    { icon: Snowflake, label: t("about.cat.ac") },
    { icon: Refrigerator, label: t("about.cat.white") },
    { icon: Volume2, label: t("about.cat.audio") },
    { icon: Coffee, label: t("about.cat.small") },
    { icon: Cpu, label: t("about.cat.acc") },
  ];

  const categories = [
    { icon: Monitor, title: t("about.cat.tv"), sub: t("about.cat.tvSub"), color: "from-blue-500/20 to-blue-600/10" },
    { icon: Snowflake, title: t("about.cat.ac"), sub: t("about.cat.acSub"), color: "from-cyan-500/20 to-cyan-600/10" },
    { icon: Refrigerator, title: t("about.cat.white"), sub: t("about.cat.whiteSub"), color: "from-slate-500/20 to-slate-600/10" },
    { icon: Coffee, title: t("about.cat.small"), sub: t("about.cat.smallSub"), color: "from-amber-500/20 to-amber-600/10" },
    { icon: Volume2, title: t("about.cat.audio"), sub: t("about.cat.audioSub"), color: "from-purple-500/20 to-purple-600/10" },
    { icon: Cpu, title: t("about.cat.acc"), sub: t("about.cat.accSub"), color: "from-emerald-500/20 to-emerald-600/10" },
  ];

  const statsData = [
    { value: 60000, suffix: "+", label: t("about.stat.customers"), icon: Users },
    { value: 26, suffix: "", label: t("about.stat.years"), icon: Clock },
    { value: 2, suffix: "", label: t("about.stat.stores"), icon: MapPin },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-white/5 blur-3xl" animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute bottom-[10%] right-[10%] w-48 h-48 rounded-full bg-white/8 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1.1, 0.9, 1.1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
          <motion.div className="absolute top-[40%] right-[30%] w-32 h-32 rounded-full bg-white/5 blur-2xl" animate={{ x: [0, 20, 0], y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </div>
        <div className="container relative z-10 py-20 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.span
              className="inline-block font-semibold text-base md:text-lg tracking-wider uppercase mb-4"
              animate={{ color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,1)", "rgba(255,255,255,0.6)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("about.since")}
            </motion.span>
            <h1 className="heading-1 mb-4">
              <motion.span
                className="inline-block"
                animate={{ color: ["hsl(0,0%,100%)", "hsl(210,100%,80%)", "hsl(0,0%,100%)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {t("about.heroTitle1")}
              </motion.span>
            </h1>
            <motion.p
              className="body-lg text-primary-foreground/80 mb-2"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("about.heroTitle2")}
            </motion.p>
            <p className="text-primary-foreground/60 body-sm mb-12">{t("about.heroSubtitle")}</p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {statsData.map((s, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <PremiumIcon icon={s.icon} size="lg" variant="glow" containerClassName="[&_.premium-icon-inner]:from-white/15 [&_.premium-icon-inner]:to-white/10 [&_.premium-icon-inner]:border-white/20 [&_svg]:text-white" />
                  <motion.p
                    className="font-display text-3xl md:text-4xl font-extrabold"
                    animate={{ color: ["hsl(0,0%,100%)", "hsl(210,100%,85%)", "hsl(0,0%,100%)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <CountUp target={s.value} suffix={s.suffix} />
                  </motion.p>
                  <p className="text-primary-foreground/70 body-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 md:py-16 space-y-16">
        {/* Hakkımızda */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
             className="heading-2 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.intro.title")}
          </motion.h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4 body-lg">
            <p>{t("about.intro.p1")}</p>
            <p>{t("about.intro.p2")}</p>
            <p>{t("about.intro.p3")}</p>
          </div>
        </motion.section>

        {/* Neden Zorlu Digital Plaza */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
             className="heading-2 mb-4"
            animate={{ color: ["hsl(210,40%,20%)", "hsl(221,83%,53%)", "hsl(210,40%,20%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {t("about.why.title")}
          </motion.h2>
          <p className="text-muted-foreground body-lg mb-6">{t("about.why.desc")}</p>
          <motion.h3
             className="heading-3 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.why.subtitle")}
          </motion.h3>
          <motion.ul
            className="space-y-3 list-none pl-0 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {whyFeatures.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-muted-foreground"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              >
                <PremiumBadgeIcon icon={CheckCircle} size={18} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <p className="text-muted-foreground">{t("about.why.goal")}</p>
        </motion.section>

        {/* Markalarımız */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.h2
             className="heading-2 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t("about.brands.title")}
          </motion.h2>
          <p className="text-muted-foreground body-lg mb-4">{t("about.brands.desc")}</p>
          <motion.h3
             className="heading-3 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t("about.brands.global")}
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                className="rounded-2xl border border-border bg-card p-8 flex items-center justify-center aspect-[3/2] relative overflow-hidden group"
                variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, hsl(221,83%,53%,0.1), transparent, hsl(221,83%,53%,0.05))" }}
                />
                <img src={brand.logo} alt={brand.name} className="max-h-full max-w-[80%] object-contain relative z-10" />
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground mb-2">{t("about.brands.services")}</p>
          <p className="text-muted-foreground">{t("about.brands.mission")}</p>
        </motion.section>

        {/* Teknik Servis */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
             className="heading-2 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.service.title")}
          </motion.h2>
          <p className="text-muted-foreground body-lg mb-4">{t("about.service.desc")}</p>
          <motion.h3
             className="heading-3 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.service.subtitle")}
          </motion.h3>
          <motion.ul
            className="space-y-3 list-none pl-0 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {serviceItems.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-muted-foreground"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              >
                <PremiumBadgeIcon icon={Wrench} size={18} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <p className="text-muted-foreground">{t("about.service.footer")}</p>
        </motion.section>

        {/* Kurumsal Satış */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
             className="heading-2 mb-4"
            animate={{ color: ["hsl(210,40%,20%)", "hsl(221,83%,53%)", "hsl(210,40%,20%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            {t("about.b2b.title")}
          </motion.h2>
          <p className="text-muted-foreground body-lg mb-4">{t("about.b2b.desc")}</p>
          <motion.ul
            className="space-y-3 list-none pl-0 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {b2bFeatures.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3 text-muted-foreground"
                variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              >
                <PremiumBadgeIcon icon={CheckCircle} size={18} />
                {item}
              </motion.li>
            ))}
          </motion.ul>
          <motion.h3
            className="heading-3 mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.b2b.productGroups")}
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {b2bProducts.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
              >
                <PremiumIcon icon={item.icon} size="md" variant="glow" />
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground">{t("about.b2b.footer")}</p>
        </motion.section>

        {/* Kategori Bölümleri */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
             className="heading-2 mb-6"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t("about.categories.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                className={`rounded-2xl border border-border bg-gradient-to-br ${cat.color} p-6 relative overflow-hidden group`}
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.15)" }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-3">
                  <PremiumIcon icon={cat.icon} size="lg" variant="glow" />
                </div>
                <motion.h3
                  className="heading-4 mb-1"
                  animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  {cat.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground">{cat.sub}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Müşteri Yorumları */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            className="heading-2 mb-6"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            {t("about.testimonials.title")}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden group"
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.15)" }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="absolute top-3 right-3 text-primary/10"
                  animate={{ opacity: [0.1, 0.25, 0.1], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  <Quote className="h-8 w-8" />
                </motion.div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">"{item.text}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm text-primary-foreground"
                    animate={{
                      backgroundColor: ["hsl(221,83%,53%)", "hsl(221,83%,63%)", "hsl(221,83%,53%)"],
                      boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    {item.name.charAt(0)}
                  </motion.div>
                  <motion.p
                    className="font-semibold text-sm"
                    animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    {item.name}
                  </motion.p>
                </div>
                <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                  {[...Array(5)].map((_, si) => (
                    <motion.div
                      key={si}
                      animate={{ color: ["hsl(45,93%,47%)", "hsl(45,93%,57%)", "hsl(45,93%,47%)"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: si * 0.1 }}
                    >
                      <Star className="h-3.5 w-3.5 fill-current" />
                    </motion.div>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">Google Maps</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Google Maps Review Summary */}
          <motion.div
            className="mt-6 rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 shrink-0">
              <PremiumIcon icon={MapPin} size="xl" variant="glow" />
              <div>
                <motion.p
                  className="font-display text-2xl font-extrabold"
                  animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  4.8 / 5.0
                </motion.p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, si) => (
                    <Star key={si} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{t("about.maps.review")}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              {BRANCHES.map((b, i) => (
                <motion.a
                  key={b.id}
                  href={b.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border p-3 hover:border-primary/30 transition-colors"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 15px hsl(221 83% 53% / 0.1)" }}
                  animate={{ borderColor: ["hsl(221,83%,53%,0)", "hsl(221,83%,53%,0.2)", "hsl(221,83%,53%,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{t("about.maps.view")}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Kurumsal İletişim CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-12 text-center"
        >
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("about.contact.title")}
          </motion.h2>
          <p className="text-muted-foreground text-lg mb-6">{t("about.contact.desc")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <motion.a
              href="mailto:deniz@zorludigitalplaza.com"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-foreground hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 15px hsl(221 83% 53% / 0.1)" }}
            >
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">deniz@zorludigitalplaza.com</span>
            </motion.a>
            <motion.a
              href="tel:+905428783131"
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-foreground hover:border-primary/30 transition-colors"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 15px hsl(221 83% 53% / 0.1)" }}
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">+90 542 878 31 31</span>
            </motion.a>
          </div>
          <div className="pt-6 border-t border-border">
            <motion.p
              className="font-display font-bold text-lg"
              animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {t("about.heroTitle1")}
            </motion.p>
            <p className="text-sm text-muted-foreground">{t("about.footer.brand")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("about.footer.desc")}</p>
          </div>
        </motion.section>
      </div>
    </>
  );
}

export function KunyePage() {
  const { t, lang } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.h1
        className="font-display text-3xl md:text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.kunye.title")}
        </motion.span>
      </motion.h1>

      <motion.div
        className="space-y-8 text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>
          <strong className="text-foreground">Zorlu Digital Plaza</strong>{lang === "tr" ? ", teknoloji dünyasında güven ve kaliteyi bir araya getiren " : " is a brand of "}<strong className="text-foreground">Zorlu Digital Trade and Services Ltd.</strong>{lang === "tr" ? " markasıdır." : " that brings together trust and quality in the technology world."}
        </p>

        {/* Resmi Şirket Bilgileri */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.08)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <motion.h2 className="font-display text-xl md:text-2xl font-bold relative z-10" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            {t("content.kunye.officialInfo")}
          </motion.h2>
          <div className="relative z-10 space-y-2">
            <p><strong className="text-foreground">{t("content.kunye.tradeName")}:</strong> Zorlu Digital Trade and Services Ltd.</p>
            <p><strong className="text-foreground">{t("content.kunye.hq")}:</strong> {lang === "tr" ? "Lefkoşa, KKTC" : "Nicosia, N.Cyprus"}</p>
            <p><strong className="text-foreground">{t("content.kunye.taxOffice")}:</strong> {lang === "tr" ? "Lefkoşa Vergi Dairesi" : "Nicosia Tax Office"}</p>
            <p><strong className="text-foreground">{t("content.kunye.taxNo")}:</strong> MS 16664</p>
            <p><strong className="text-foreground">{t("content.kunye.taxId")}:</strong> 99003199</p>
          </div>
        </motion.div>

        {/* Premium İletişim Kanalları */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.08)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
          <motion.h2 className="font-display text-xl md:text-2xl font-bold relative z-10" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
            {t("content.kunye.channels")}
          </motion.h2>
          <div className="flex flex-col gap-3 relative z-10">
            <a href="tel:+905488783131" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10" animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </motion.span>
              {t("content.kunye.customerLine")}: +90 548 878 31 31
            </a>
            <a href="https://wa.me/905488783131" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10" animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </motion.span>
              {t("content.kunye.whatsappLine")}: +90 548 878 31 31
            </a>
            <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10" animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
                <Mail className="h-5 w-5 text-primary" />
              </motion.span>
              {t("content.kunye.corporateEmail")}: deniz@zorludigitalplaza.com
            </a>
          </div>
        </motion.div>

        {/* Hizmet Standartları */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.08)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
          <motion.h2 className="font-display text-xl md:text-2xl font-bold relative z-10" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            {t("content.kunye.standards")}
          </motion.h2>
          <div className="relative z-10 space-y-3">
            {[
              { icon: ShieldCheck, label: t("content.kunye.authorizedService") },
              { icon: Star, label: t("content.kunye.warranty") },
              { icon: Truck, label: t("content.kunye.installation") },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <motion.span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5" animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>
                  <item.icon className="h-4 w-4 text-primary" />
                </motion.span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          className="text-center font-display font-bold text-lg md:text-xl mt-8 italic"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.kunye.motto")}
        </motion.p>
      </motion.div>
    </div>
  );
}

export function EkibimizPage() {
  const { t } = useLanguage();
  
  const team = [
    { name: "Halil Kavaz", roleKey: "team.role.ceo", branch: "", photo: "/team/halil-kavaz.png" },
    { name: "Deniz Bisikletçiler", roleKey: "team.role.coordinator", branch: "", photo: "/team/deniz-bisikletciler.png" },
    { name: "Serkan Taras", roleKey: "team.role.storeManager", branch: "Mağusa", photo: "/team/serkan-taras.png" },
    { name: "Çisem Özdoğan", roleKey: "team.role.storeManager", branch: "Lefkoşa", photo: "/team/cisem-ozdogan.png" },
    { name: "Mustafa Özdoğan", roleKey: "team.role.salesRep", branch: "Lefkoşa", photo: "/team/mustafa-ozdogan.png" },
    { name: "Dilfuza Jumakova", roleKey: "team.role.salesRep", branch: "Lefkoşa", photo: "/team/dilfuza-jumakova.png" },
    { name: "Abed Azbaki", roleKey: "team.role.tvAvChief", branch: "", photo: "/team/ramazan-koshayev.png" },
    { name: "Alaaeddin Erdemci", roleKey: "team.role.whiteGoodsChef", branch: "", photo: "/team/alaaeddin-erdemci.png" },
    { name: "Suhrap Alimov", roleKey: "team.role.acChef", branch: "", photo: "/team/suhrap-alimov.png" },
    { name: "Ramazan Koshayev", roleKey: "team.role.acTechnician", branch: "", photo: "/team/abed-azbaki.png" },
    { name: "Çakır Recepov", roleKey: "team.role.tvTechnician", branch: "", photo: "/team/cakir-recepov.png" },
    { name: "Bilal Muhammed", roleKey: "team.role.tvTechnician", branch: "", photo: "/team/bilal-muhammed.png" },
    { name: "Umit Rozyev", roleKey: "team.role.tvTechnician", branch: "", photo: "/team/umit-rozyev.png" },
    { name: "Karetta", roleKey: "team.role.aiAssistant", branch: "", photo: "/team/karetta.jpg" },
  ];

  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      <motion.h1
        className="font-display text-3xl md:text-4xl font-extrabold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("team.title")}
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground leading-relaxed mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <strong className="text-foreground">Zorlu Digital Plaza</strong> {t("team.description").replace("Zorlu Digital Plaza ", "")}
      </motion.p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
      >
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-card relative overflow-hidden group"
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.15)" }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(135deg, hsl(221,83%,53%,0.05), transparent)" }}
            />
            <motion.div
              className="relative mb-3"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px hsl(221,83%,53%,0))",
                  "drop-shadow(0 0 8px hsl(221,83%,53%,0.2))",
                  "drop-shadow(0 0 0px hsl(221,83%,53%,0))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              <img src={m.photo} alt={m.name} className="w-24 h-28 object-cover object-top rounded-lg" loading="lazy" />
            </motion.div>
            <motion.p
              className="font-display font-bold text-sm leading-tight"
              animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {m.name}
            </motion.p>
            <p className="text-xs text-muted-foreground mt-1">{m.branch ? `${m.branch} – ` : ""}{t(m.roleKey)}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function DestekPage() {
  const { t, lang } = useLanguage();

  const samsungServices = lang === "tr" ? [
    "Samsung televizyon arıza tamiri", "Samsung LED / QLED TV servis hizmeti",
    "Samsung klima bakım ve onarım", "Samsung beyaz eşya servis desteği",
    "Samsung yazılım güncelleme ve sistem kontrolü",
  ] : [
    "Samsung TV fault repair", "Samsung LED / QLED TV service",
    "Samsung AC maintenance and repair", "Samsung white goods service support",
    "Samsung software update and system check",
  ];

  const lgServices = lang === "tr" ? [
    "LG televizyon arıza tespiti", "LG OLED / Smart TV servis hizmeti",
    "LG klima bakım ve onarım", "LG beyaz eşya teknik servis",
    "LG yazılım güncelleme ve sistem bakımı",
  ] : [
    "LG TV fault detection", "LG OLED / Smart TV service",
    "LG AC maintenance and repair", "LG white goods technical service",
    "LG software update and system maintenance",
  ];

  const servisBolgeleri = lang === "tr" ? ["Lefkoşa", "Girne", "Gazimağusa", "Güzelyurt", "İskele"]
    : ["Nicosia", "Kyrenia", "Famagusta", "Guzelyurt", "Iskele"];

  const garantiItems = lang === "tr" ? [
    "Arıza tespiti", "Garanti kontrolü", "Parça değişimi",
    "Bakım ve onarım işlemleri", "Servis raporu oluşturulması",
  ] : [
    "Fault detection", "Warranty check", "Parts replacement",
    "Maintenance and repair", "Service report creation",
  ];

  const nedenBiz = lang === "tr" ? [
    "Uzman teknik servis ekibi", "Samsung ve LG cihazlarında deneyim",
    "Orijinal yedek parça kullanımı", "Hızlı servis ve arıza tespiti",
    "Profesyonel müşteri destek hizmeti", "KKTC genelinde servis ağı",
  ] : [
    "Expert technical service team", "Experience with Samsung and LG devices",
    "Original spare parts usage", "Fast service and fault detection",
    "Professional customer support service", "Service network across N.Cyprus",
  ];

  const sikAranan = lang === "tr" ? [
    "Samsung TV Servisi", "LG TV Servisi", "Samsung Klima Servisi",
    "LG Klima Servisi", "KKTC Elektronik Teknik Servis", "Lefkoşa Televizyon Servisi",
    "Girne TV Servisi", "Samsung Yetkili Servis KKTC", "LG Yetkili Servis KKTC",
  ] : [
    "Samsung TV Service", "LG TV Service", "Samsung AC Service",
    "LG AC Service", "N.Cyprus Electronics Service", "Nicosia TV Service",
    "Kyrenia TV Service", "Samsung Authorized Service N.Cyprus", "LG Authorized Service N.Cyprus",
  ];



  return (
    <div className="container py-12 md:py-16 max-w-4xl">
      {/* Hero Title */}
      <motion.h1
        className="font-display text-3xl md:text-5xl font-extrabold mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.destek.title")}
        </motion.span>
      </motion.h1>
      <motion.p
        className="text-center text-muted-foreground text-lg mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {t("content.destek.subtitle")}
      </motion.p>

      {/* Trust Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          { title: "2 Yıl Resmi Garanti Kapsamı", desc: "Tüm Samsung ve LG ürünleri üretici garantisi altında 2 yıl boyunca ücretsiz servis hizmeti alır." },
          { title: "Samsung Yetkili Servis Desteği", desc: "Samsung TV, buzdolabı, çamaşır makinesi, klima ve daha fazlası için yetkili teknik servis." },
          { title: "LG Yetkili Servis Desteği", desc: "LG TV, buzdolabı, çamaşır makinesi, klima ve tüm LG ürünleri için yetkili servis." },
          { title: "Kuzey Kıbrıs'ta Hızlı Teknik Destek", desc: "Kuzey Kıbrıs genelinde hızlı ve güvenilir yerinde teknik servis hizmeti sunuyoruz." },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden"
            variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
            <motion.h3
              className="font-display font-bold text-base mb-2 relative z-10"
              animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {item.title}
            </motion.h3>
            <p className="text-sm text-muted-foreground relative z-10">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Intro */}
      <motion.div
        className="prose prose-sm max-w-none text-muted-foreground [&_p]:leading-relaxed space-y-4 mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p><strong className="text-foreground">Zorlu Digital Plaza</strong>, Kuzey Kıbrıs genelinde Samsung ve LG marka elektronik ürünler için profesyonel teknik servis hizmeti sunan güvenilir servis merkezlerinden biridir.</p>
        <p>Uzman teknik servis ekibimiz, televizyonlar, beyaz eşyalar, klimalar ve diğer elektronik cihazlar için hızlı arıza tespiti, bakım, onarım ve garanti hizmetleri sağlamaktadır.</p>
        <p>Samsung ve LG cihazlarınız için güvenilir, hızlı ve profesyonel servis çözümleri sunuyoruz.</p>
      </motion.div>

      {/* Samsung Servis */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Samsung Yetkili Servis KKTC
        </motion.h2>
        <p className="text-muted-foreground text-sm mb-4 relative z-10">Samsung televizyon, klima ve beyaz eşya ürünleri için teknik servis hizmetlerimiz profesyonel ekiplerimiz tarafından sağlanmaktadır.</p>
        <p className="text-sm font-semibold text-foreground mb-2 relative z-10">Samsung servis hizmetlerimiz:</p>
        <ul className="relative z-10 space-y-2">
          {samsungServices.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
              <motion.span
                className="h-2 w-2 rounded-full shrink-0"
                animate={{ backgroundColor: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              {s}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4 relative z-10">Samsung cihazlarınız, orijinal yedek parçalar ve profesyonel ekipmanlar ile servis süreçlerinden geçirilir.</p>
      </motion.div>

      {/* LG Servis */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          LG Yetkili Servis KKTC
        </motion.h2>
        <p className="text-muted-foreground text-sm mb-4 relative z-10">LG marka televizyon, klima ve elektronik cihazlar için hızlı ve güvenilir servis hizmeti sunuyoruz.</p>
        <p className="text-sm font-semibold text-foreground mb-2 relative z-10">LG servis hizmetlerimiz:</p>
        <ul className="relative z-10 space-y-2">
          {lgServices.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
              <motion.span
                className="h-2 w-2 rounded-full shrink-0"
                animate={{ backgroundColor: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              {s}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground mt-4 relative z-10">LG ürünleriniz için servis işlemleri uzman teknik ekipler tarafından titizlikle gerçekleştirilmektedir.</p>
      </motion.div>

      {/* KKTC Servis Bölgeleri */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.08)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          KKTC Teknik Servis Hizmetleri
        </motion.h2>
        <p className="text-muted-foreground text-sm mb-4 relative z-10">Zorlu Digital Plaza teknik servis ekibi, Kuzey Kıbrıs genelinde hizmet vermektedir.</p>
        <p className="text-sm font-semibold text-foreground mb-3 relative z-10">Servis bölgelerimiz:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative z-10">
          {servisBolgeleri.map((bolge, i) => (
            <motion.div
              key={bolge}
              className="rounded-xl border border-border bg-muted/30 p-3 text-center"
              whileHover={{ scale: 1.03 }}
            >
              <div className="mb-2 flex justify-center">
                <PremiumIcon icon={MapPin} size="sm" variant="glow" />
              </div>
              <p className="text-sm font-semibold text-foreground">{bolge} Teknik Servis</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 relative z-10">Yerinde servis ve hızlı müdahale sayesinde cihazlarınız en kısa sürede çalışır hale getirilir.</p>
      </motion.div>

      {/* Garanti */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.08)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-2 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          Garanti ve Servis Hizmeti
        </motion.h2>
        <p className="text-muted-foreground text-sm mb-4 relative z-10">Satın aldığınız ürünler veya servis kapsamındaki cihazlar için garanti işlemleri profesyonel şekilde yürütülmektedir.</p>
        <p className="text-sm font-semibold text-foreground mb-2 relative z-10">Garanti servis hizmetlerimiz:</p>
        <ul className="relative z-10 space-y-2 mb-4">
          {garantiItems.map((g, i) => (
            <li key={g} className="flex items-center gap-3 text-sm text-muted-foreground">
              <motion.span
                className="h-2 w-2 rounded-full shrink-0"
                animate={{ backgroundColor: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
              {g}
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground relative z-10">Garanti kapsamı dışında kalan işlemler için de uygun fiyatlı servis çözümleri sunulmaktadır.</p>
      </motion.div>

      {/* Neden Biz */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Neden Zorlu Digital Plaza Servisi?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
          {nedenBiz.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-3 text-sm"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <PremiumIcon icon={ShieldCheck} size="sm" variant="glow" />
              <span className="text-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 relative z-10">Zorlu Digital Plaza, teknik servis alanında güvenilir ve profesyonel hizmet anlayışıyla müşterilerine en iyi deneyimi sunmayı hedefler.</p>
      </motion.div>

      {/* Servis Talebi / İletişim */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-4 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Servis Talebi Oluşturun
        </motion.h2>
        <p className="text-sm text-muted-foreground mb-4 relative z-10">Samsung veya LG cihazlarınız için teknik servis talebi oluşturabilirsiniz.</p>
        <div className="flex flex-col gap-3 relative z-10">
          <a href="tel:+905428783131" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
            <motion.span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
              animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </motion.span>
            Telefon: +90 542 878 31 31
          </a>
          <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
            <motion.span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
              animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <Mail className="h-5 w-5 text-primary" />
            </motion.span>
            E-posta: deniz@zorludigitalplaza.com
          </a>
        </div>
      </motion.div>

      {/* Footer motto */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="font-display font-extrabold text-xl md:text-2xl"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Zorlu Digital Plaza
        </motion.p>
        <p className="text-muted-foreground text-sm mt-1">26 Yıllık Güven - Teknoloji - Hizmet</p>
        <p className="text-muted-foreground text-sm">Samsung ve LG ürünleri için KKTC'de güvenilir teknik servis merkezi.</p>
      </motion.div>

      {/* Sık Aranan Servis Hizmetleri */}
      <motion.div
        className="border-t border-border pt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-muted-foreground">Sık Aranan Servis Hizmetleri</h4>
        <div className="flex flex-wrap gap-2">
          {sikAranan.map((s) => (
            <motion.span
              key={s}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground"
              whileHover={{ backgroundColor: "hsl(221,83%,53%,0.1)", borderColor: "hsl(221,83%,53%,0.3)", color: "hsl(221,83%,53%)" }}
              transition={{ duration: 0.2 }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function KullanimKosullariPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      {/* Premium Hero */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 flex justify-center">
          <PremiumIcon icon={FileText} size="xl" variant="glow" />
        </div>
        <motion.h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            {t("content.terms.title")}
          </motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">www.zorluplus.com üzerinden sunulan hizmetlerin kullanımına ilişkin şartları düzenleyen yasal koşullar.</p>
      </motion.div>

      {/* Section Cards */}
      <div className="space-y-6">
        {[
          { icon: Shield, title: "1. Genel Hükümler", content: (<><p>Bu Site'ye erişim sağlayan tüm kullanıcılar, yürürlükteki ilgili yasal düzenlemeler ile birlikte bu Kullanım Koşulları'nı kabul etmiş sayılır.</p><p>Koşulları kabul etmiyorsanız Site'yi kullanmamanız gerekmektedir.</p></>) },
          { icon: Settings, title: "2. Hizmetlerin Kapsamı", content: (<><p>Zorlu Digital Plaza web sitesi üzerinden kullanıcılar;</p><ul className="list-disc pl-5 space-y-1"><li>Ürünler hakkında detaylı bilgi edinebilir</li><li>Online sipariş oluşturabilir</li><li>Müşteri hizmetlerine talep iletebilir</li><li>Teknik servis ve garanti süreçlerini başlatabilir</li><li>Kampanya ve duyuruları takip edebilir</li></ul><p>Şirket, sunulan hizmetlerin kapsamını önceden bildirimde bulunmaksızın değiştirme veya güncelleme hakkını saklı tutar.</p></>) },
          { icon: UserCheck, title: "3. Kullanıcı Yükümlülükleri", content: (<><p>Siteyi kullanan tüm kullanıcılar aşağıdaki kurallara uymayı kabul eder:</p><ul className="list-disc pl-5 space-y-1"><li>Site içeriğini yasa dışı amaçlarla kullanmamak</li><li>Yanlış, eksik veya yanıltıcı bilgi vermemek</li><li>Site güvenliğini tehlikeye sokacak girişimlerde bulunmamak</li><li>Bot, script veya otomatik sistemlerle veri taraması yapmamak</li><li>Site üzerindeki tüm fikri mülkiyet haklarına saygı göstermek</li><li>Site altyapısına zarar verebilecek davranışlardan kaçınmak</li></ul><p>Bu yükümlülüklerin ihlali durumunda kullanıcının Site'ye erişimi geçici veya kalıcı olarak sonlandırılabilir.</p></>) },
          { icon: Lock, title: "4. Fikri Mülkiyet Hakları", content: (<><p>Site'de yer alan tüm metinler, görseller, logolar, markalar, tasarımlar, grafikler ve içerikler Zorlu Digital Plaza'ya ait olup telif hakları ile korunmaktadır.</p><p>Bu içeriklerin kopyalanması, çoğaltılması, dağıtılması veya ticari amaçla kullanılması Şirketin yazılı izni olmadan kesinlikle yasaktır.</p></>) },
          { icon: Truck, title: "5. Sipariş, Ödeme ve Teslimat", content: (<ul className="list-disc pl-5 space-y-1"><li>Ürün fiyatları ve stok bilgileri değişiklik gösterebilir.</li><li>Siparişler ödeme onayı alındıktan sonra kesinleşir.</li><li>Ödeme altyapısı ve teslimat süreçleri üçüncü taraf hizmet sağlayıcılar aracılığıyla yürütülebilir.</li><li>Kullanıcılar sipariş sırasında doğru iletişim ve adres bilgileri vermekle yükümlüdür.</li></ul>) },
          { icon: Wrench, title: "6. Garanti ve Teknik Servis", content: (<><p>Zorlu Digital Plaza'dan satın alınan ürünler, ilgili marka üretici garantisi veya en az <strong className="text-foreground">2 yıl</strong> tedarikçi garantisi kapsamındadır.</p><p>Garanti kapsamı dışında kalan durumlar (kullanıcı hatası, sıvı teması, düşme/darbe, yetkisiz müdahale) ücretli servis kapsamına girebilir.</p></>) },
          { icon: AlertCircle, title: "7. Sorumluluk Reddi", content: (<p>Zorlu Digital Plaza; sistem kesintileri, teknik arızalar, üçüncü taraf saldırıları, internet bağlantı problemleri ve kullanıcı hataları nedeniyle oluşabilecek zararlardan sorumlu tutulamaz.</p>) },
          { icon: Globe, title: "8. Üçüncü Taraf Bağlantıları", content: (<p>Site üzerinde üçüncü taraf web sitelerine yönlendiren bağlantılar bulunabilir. Bu sitelerin içeriklerinden, veri güvenliğinden veya gizlilik politikalarından Zorlu Digital Plaza sorumlu değildir.</p>) },
          { icon: Eye, title: "9. Gizlilik Politikası ile İlişki", content: (<p>Bu Kullanım Koşulları, Site'de yer alan Gizlilik Politikası ile birlikte değerlendirilmelidir. Siteyi kullanan kullanıcılar, kişisel verilerin işlenmesine ilişkin Gizlilik Politikası'nı da kabul etmiş sayılır.</p>) },
          { icon: FileText, title: "10-11. Değişiklik Hakkı ve Yetkili Mahkeme", content: (<><p>Zorlu Digital Plaza, bu Kullanım Koşulları üzerinde önceden bildirimde bulunmaksızın değişiklik yapma hakkını saklı tutar.</p><p>Bu Kullanım Koşulları Kuzey Kıbrıs Türk Cumhuriyeti yasalarına tabidir. Her türlü uyuşmazlıkta <strong className="text-foreground">Lefkoşa Mahkemeleri</strong> ve İcra Daireleri yetkilidir.</p></>) },
        ].map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
          >
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div className="flex-1 min-w-0">
                <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>
                  {s.title}
                </motion.h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{s.content}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* İletişim */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden mt-8"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <div className="flex items-start gap-4 relative z-10">
          <PremiumIcon icon={Mail} size="lg" variant="glow" />
          <div>
            <motion.h2 className="font-display text-xl md:text-2xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              {t("content.terms.contact")}
            </motion.h2>
            <p className="text-muted-foreground mb-3">{t("content.terms.contactDesc")}</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:deniz@zorludigitalplaza.com" className="font-semibold text-foreground hover:text-primary transition-colors text-sm">deniz@zorludigitalplaza.com</a>
              <a href="tel:+905428783131" className="font-semibold text-foreground hover:text-primary transition-colors text-sm">+90 542 878 31 31</a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.p className="text-center font-display font-bold text-lg md:text-xl mt-10 italic" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        Zorlu Digital Plaza | Teknolojiye Premium Dokunuş
      </motion.p>
    </div>
  );
}

export function IadeKosullariPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.h1
        className="font-display text-3xl md:text-4xl font-extrabold mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.returns.title")}
        </motion.span>
      </motion.h1>
      <p className="text-sm text-muted-foreground mb-8">Son Güncelleme Tarihi: 23.12.2025</p>

      <motion.div
        className="prose prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>Bu politika, <strong className="text-foreground">Zorlu Digital Plaza</strong> ("Şirket") üzerinden gerçekleştirilen tüm alışverişlerde sunulan Premium hizmet standartlarını, iade, değişim ve iptal şartlarını kapsamaktadır. Müşteri memnuniyetini en üst seviyede tutmak adına süreçlerimiz şeffaf, güvenilir ve ayrıcalıklı bir temele oturtulmuştur.</p>

        <h2>1. Genel İade Koşulları</h2>
        <ul>
          <li><strong className="text-foreground">Premium Hizmet Standardı:</strong> İade talebi, ürün teslim alındıktan sonra <strong>7 gün</strong> içinde yapılmalıdır.</li>
          <li>Ürün; kullanılmamış, orijinal ambalajında, tüm aksesuarlarıyla eksiksiz ve yeniden satılabilir durumda olmalıdır.</li>
          <li>Fatura veya dijital satın alma belgesinin ibrazı, işlem güvenliği açısından zorunludur.</li>
          <li>Ürün veya ambalajında kullanıcı kaynaklı (hasar, çizik, kırık vb.) bir kusur tespit edilirse iade kabul edilmeyecektir.</li>
        </ul>

        <h2>2. İade Kapsamı Dışındaki Ürünler</h2>
        <p>Mevzuat ve hijyen kuralları gereği aşağıdaki ürünlerde iade yapılamaz (Arıza/Defect durumları hariç):</p>
        <ul>
          <li><strong className="text-foreground">Hijyen Ürünleri:</strong> Paketi açılmış kulak içi kulaklıklar ve kişisel bakım cihazları.</li>
          <li><strong className="text-foreground">Dijital İçerikler:</strong> Yazılım, oyun, dijital lisans ve aktivasyon kodları.</li>
          <li><strong className="text-foreground">Kurulumu Yapılmış Cihazlar:</strong> Yetkili servis tarafından kurulumu tamamlanan büyük beyaz eşyalar (buzdolabı, çamaşır makinesi vb.) kurulum sonrası iade edilemez.</li>
          <li><strong className="text-foreground">Özel Siparişler:</strong> Müşteri talebi doğrultusunda özelleştirilen ürünler.</li>
        </ul>

        <h2>3. Arızalı ve Ayıplı Ürün Süreci</h2>
        <ul>
          <li><strong className="text-foreground">Teslimat Kontrolü:</strong> Ürünü teslim alırken kontrol ediniz. Hasar varsa tutanak tutturarak ürünü teslim almayınız.</li>
          <li><strong className="text-foreground">Teknik Servis Onayı:</strong> Teslimat sonrası fark edilen üretim hatalarında ürün, Premium teknik servis kontrolünden geçirilir. Servis raporu olmadan iade veya değişim işlemi yapılamamaktadır.</li>
        </ul>

        <h2>4. Premium Değişim Koşulları</h2>
        <ul>
          <li>Stok durumu uygun olduğu sürece, teslim tarihinden itibaren <strong>7 gün</strong> içerisinde değişim başvurusu yapılabilir.</li>
          <li>Ürün fiyat farkı oluşması durumunda, bakiye dengelemesi yapılarak işlem tamamlanır.</li>
        </ul>

        <h2>5. İade Süreci ve İletişim</h2>
        <p>İade taleplerinizi Premium destek kanallarımız üzerinden iletebilirsiniz:</p>
      </motion.div>

      {/* Contact card */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 30px hsl(221,83%,53%,0.0)",
              "inset 0 0 30px hsl(221,83%,53%,0.08)",
              "inset 0 0 30px hsl(221,83%,53%,0.0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex flex-col gap-3 relative z-10">
          <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
            <motion.span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
              animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail className="h-5 w-5 text-primary" />
            </motion.span>
            E-posta: deniz@zorludigitalplaza.com
          </a>
          <a href="tel:+905488783131" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
            <motion.span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
              animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </motion.span>
            Telefon: +90 548 878 31 31
          </a>
        </div>
      </motion.div>

      <motion.div
        className="prose prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 space-y-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <p>Ürün tarafımıza ulaştıktan sonra uzman ekibimizce <strong>7 iş günü</strong> içinde incelenir ve onaylandığında ödeme iadesi aynı yöntemle gerçekleştirilir.</p>

        <h2>6. Lojistik ve Kargo</h2>
        <ul>
          <li>Arızalı/defolu ürün gönderimlerinde kargo ücreti Şirketimiz tarafından karşılanır.</li>
          <li>Kişisel tercih veya memnuniyet kaynaklı iadelerde kargo ücreti müşteriye aittir.</li>
        </ul>

        <h2>7. Kurulum Gerektiren Ürünler (Beyaz Eşya & TV)</h2>
        <ul>
          <li>Samsung, LG ve diğer markalı ürünlerde kutu açılımı mutlaka yetkili servis tarafından yapılmalıdır.</li>
          <li>Yetkisiz müdahaleler garanti kapsamını ve iade hakkını geçersiz kılabilir.</li>
        </ul>

        <h2>8. İptal ve Geri Ödeme</h2>
        <ul>
          <li>Kargoya verilmemiş siparişler anında iptal edilebilir.</li>
          <li>İade bedelinin hesabınıza yansıması, banka süreçlerine bağlı olarak <strong>10 iş günü</strong> sürebilir.</li>
        </ul>
      </motion.div>

      <motion.p
        className="text-center font-display font-bold text-lg md:text-xl mt-10 italic"
        animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Zorlu Digital Plaza | Teknolojiye Premium Dokunuş
      </motion.p>
    </div>
  );
}

export function GizlilikPolitikasiPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      {/* Premium Hero */}
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 flex justify-center">
          <PremiumIcon icon={ShieldCheck} size="xl" variant="glow" />
        </div>
        <motion.h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            {t("content.privacy.title")}
          </motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Müşterilerimizin gizliliğini ve veri güvenliğini en üst düzey Premium standartlarda korumayı taahhüt ediyoruz.</p>
      </motion.div>

      <div className="space-y-6">
        {[
          { icon: Eye, title: "1. Kapsam ve Premium Hizmet Amacı", content: (<p>Bu politika; dijital ve fiziksel kanallarımız üzerinden bizimle etkileşime geçen tüm Premium üyelerimizi ve ziyaretçilerimizi kapsar. Temel amacımız, verilerinizi yüksek güvenlik protokolleriyle işleyerek size kusursuz bir alışveriş deneyimi sunmaktır.</p>) },
          { icon: Database, title: "2. İşlenen Veri Kategorileri", content: (<><p>Deneyiminizi kişiselleştirmek adına aşağıdaki verileri topluyoruz:</p><ul className="list-disc pl-5 space-y-1"><li><strong className="text-foreground">Kimlik ve İletişim:</strong> Ad, soyad, e-posta adresi, telefon ve teslimat adresi.</li><li><strong className="text-foreground">İşlem Güvenliği:</strong> Sipariş geçmişi ve fatura detayları.</li><li><strong className="text-foreground">Teknik ve Davranışsal Veriler:</strong> IP adresi, çerezler ve site içi gezinme tercihleri.</li></ul></>) },
          { icon: Settings, title: "3. Veri İşleme Amaçlarımız", content: (<><p>Verileriniz, yalnızca aşağıdaki Premium hizmet süreçleri için kullanılır:</p><ul className="list-disc pl-5 space-y-1"><li>Siparişlerin yönetimi, lojistik süreçlerin takibi ve hızlı teslimat.</li><li>Satış sonrası 2 yıl garanti ve ücretsiz montaj gibi teknik servis süreçlerinin yürütülmesi.</li><li>Ayrıcalıklı kampanyalar ve kişiye özel indirim duyuruları (onayınız dahilinde).</li><li>Yasal yükümlülüklerin yerine getirilmesi ve platform güvenliğinin sağlanması.</li></ul></>) },
          { icon: Shield, title: "4. Premium Veri Paylaşımı ve Aktarım", content: (<p>Verileriniz, ticari amaçlarla asla üçüncü taraflara satılmaz. Sadece hizmetin tamamlanması için gerekli olan iş ortaklarımızla (Kargo firmaları, Samsung/LG yetkili servisleri, yasal merciler) minimum düzeyde paylaşılır.</p>) },
          { icon: Lock, title: "5. Veri Güvenliği ve Saklama", content: (<p>Kişisel verileriniz, yetkisiz erişime karşı endüstri standardı şifreleme yöntemleriyle korunur. Veriler, yasal saklama süreleri dolduğunda güvenli bir şekilde imha edilir veya anonim hale getirilir.</p>) },
          { icon: UserCheck, title: "6. Premium Kullanıcı Haklarınız", content: (<p>Veri sahibi olarak; verilerinizin işlenip işlenmediğini öğrenme, yanlış verilerin düzeltilmesini isteme, verilerin silinmesini talep etme ve işleme süreçlerine itiraz etme haklarına sahipsiniz.</p>) },
        ].map((s, i) => (
          <motion.div key={s.title} className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div className="flex-1 min-w-0">
                <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>{s.title}</motion.h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{s.content}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* İletişim */}
      <motion.div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden mt-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <div className="flex items-start gap-4 relative z-10">
          <PremiumIcon icon={Mail} size="lg" variant="glow" />
          <div>
            <motion.h2 className="font-display text-xl md:text-2xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>7. İletişim ve Destek</motion.h2>
            <p className="text-muted-foreground text-sm mb-3">Gizlilik süreçlerimizle ilgili her türlü soru ve talebiniz için Premium destek ekibimize ulaşabilirsiniz:</p>
            <div className="text-sm space-y-1">
              <p><strong className="text-foreground">Şirket Ünvanı:</strong> Zorlu Digital Trade and Services Ltd.</p>
              <p><strong className="text-foreground">Adres:</strong> Belediye Bulvarı, Kent Plaza, A Blok No:1, Yenikent, Lefkoşa</p>
              <a href="tel:+905488783131" className="block font-semibold text-foreground hover:text-primary transition-colors">Premium Destek Hattı: 00905488783131</a>
              <a href="mailto:deniz@zorludigitalplaza.com" className="block font-semibold text-foreground hover:text-primary transition-colors">Kurumsal E-posta: deniz@zorludigitalplaza.com</a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Çerez Politikası inline */}
      <motion.div className="mt-12 pt-10 border-t border-border" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="flex justify-center mb-4"><PremiumIcon icon={Cookie} size="lg" variant="glow" /></div>
        <motion.h2 className="font-display text-2xl md:text-3xl font-extrabold mb-6 text-center">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>{t("content.cookie.title")}</motion.span>
        </motion.h2>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
          <h3 className="text-foreground font-display font-bold text-lg">1. Çerez Nedir?</h3>
          <p>Çerezler (cookies), ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük veri dosyalarıdır.</p>
          <h3 className="text-foreground font-display font-bold text-lg mt-6">2. Kullanılan Çerez Türleri</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-6">
          {[
            { title: "Zorunlu Çerezler", desc: "Site'nin temel işlevlerinin çalışmasını sağlar." },
            { title: "Performans Çerezleri", desc: "Site kullanımını analiz etmek için kullanılır." },
            { title: "İşlevsel Çerezler", desc: "Kullanıcı tercihlerini hatırlamak için kullanılır." },
            { title: "Pazarlama Çerezleri", desc: "Kampanya ve reklam içeriklerinin optimize edilmesini sağlar." },
          ].map((item, i) => (
            <motion.div key={item.title} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
              <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 25px hsl(221,83%,53%,0.0)", "inset 0 0 25px hsl(221,83%,53%,0.07)", "inset 0 0 25px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
              <div className="flex items-start gap-3 relative z-10">
                <PremiumIcon icon={Cookie} size="sm" variant="glow" />
                <div>
                  <motion.h4 className="font-display font-bold text-sm mb-1" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>{item.title}</motion.h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
          <h3 className="text-foreground font-display font-bold text-lg">3. Çerezlerin Kullanım Amaçları</h3>
          <ul className="list-disc pl-5"><li>Site performansını artırmak</li><li>Kullanıcı deneyimini geliştirmek</li><li>Güvenliği sağlamak</li><li>Analiz ve istatistik yapmak</li><li>Kişiselleştirilmiş içerik sunmak</li></ul>
          <h3 className="text-foreground font-display font-bold text-lg mt-6">4. Çerezlerin Kontrolü</h3>
          <p>Tarayıcı ayarlarınızdan çerezleri kontrol edebilir veya tamamen devre dışı bırakabilirsiniz.</p>
          <p>Ancak bazı çerezlerin devre dışı bırakılması site işlevlerinin düzgün çalışmasını engelleyebilir.</p>
        </div>
      </motion.div>

      <motion.p className="text-center font-display font-bold text-lg md:text-xl mt-10 italic" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        Zorlu Digital Plaza | Teknolojiye Güvenli ve Premium Dokunuş
      </motion.p>
    </div>
  );
}

export function KvkkPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 flex justify-center"><PremiumIcon icon={Lock} size="xl" variant="glow" /></div>
        <motion.h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>{t("content.kvkk.title")}</motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Kişisel Verilerin Korunması ve Gizlilik Bildirimi</p>
      </motion.div>

      <div className="space-y-6">
        {[
          { icon: Database, title: "1. Veri Sorumlusu", content: (<><p>Bu aydınlatma metni, <strong className="text-foreground">Zorlu Digital Plaza</strong> tarafından işletilen <strong className="text-foreground">www.zorluplus.com</strong> internet sitesi üzerinden toplanan kişisel verilerin işlenmesine ilişkin usul ve esasları açıklar.</p><p>Şirketimiz, kişisel verilerinizi KKTC veri koruma mevzuatı, Türkiye KVKK (6698) ve AB GDPR ilkeleri doğrultusunda korumayı taahhüt eder.</p></>) },
          { icon: BarChart3, title: "2. Toplanan Kişisel Veriler", content: (<><p>Siteyi kullanmanız durumunda aşağıdaki bilgiler toplanabilir:</p><ul className="list-disc pl-5 space-y-1"><li>Ad ve soyad</li><li>Telefon numarası</li><li>E-posta adresi</li><li>Teslimat adresi</li><li>IP adresi</li><li>Cihaz ve tarayıcı bilgileri</li><li>Sipariş ve ödeme bilgileri</li><li>Müşteri destek talepleri</li></ul></>) },
          { icon: Settings, title: "3. İşlenme Amaçları", content: (<ul className="list-disc pl-5 space-y-1"><li>Sipariş süreçlerinin yürütülmesi</li><li>Teslimat ve servis hizmetlerinin sağlanması</li><li>Teknik servis ve garanti işlemlerinin yürütülmesi</li><li>Müşteri destek hizmetlerinin verilmesi</li><li>Kampanya ve duyuruların iletilmesi</li><li>Site güvenliğinin sağlanması</li><li>Yasal yükümlülüklerin yerine getirilmesi</li></ul>) },
          { icon: Clock, title: "4. Verilerin Saklanma Süresi", content: (<p>Kişisel veriler; yasal yükümlülükler, ticari kayıt zorunlulukları ve müşteri hizmetleri süreçleri gerektiği süre boyunca saklanır ve süre sonunda güvenli şekilde silinir veya anonim hale getirilir.</p>) },
          { icon: Shield, title: "5. Üçüncü Taraflarla Paylaşım", content: (<><ul className="list-disc pl-5 space-y-1"><li>Ödeme altyapı sağlayıcıları</li><li>Kargo firmaları</li><li>Teknik servis sağlayıcıları</li><li>Resmi kurum ve otoriteler</li></ul><p>Bu paylaşımlar yalnızca hizmetlerin sağlanması amacıyla yapılır.</p></>) },
          { icon: UserCheck, title: "6. Kullanıcı Hakları", content: (<ul className="list-disc pl-5 space-y-1"><li>Kişisel verilerin işlenip işlenmediğini öğrenme</li><li>Verilerin düzeltilmesini talep etme</li><li>Verilerin silinmesini talep etme</li><li>Veri işlenmesine itiraz etme</li><li>Veri taşınabilirliği talep etme</li></ul>) },
        ].map((s, i) => (
          <motion.div key={s.title} className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div className="flex-1 min-w-0">
                <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>{s.title}</motion.h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{s.content}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mt-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
        <div className="flex items-start gap-4 relative z-10">
          <PremiumIcon icon={Mail} size="lg" variant="glow" />
          <div>
            <motion.h2 className="font-display text-xl md:text-2xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>İletişim</motion.h2>
            <a href="mailto:deniz@zorludigitalplaza.com" className="font-semibold text-foreground hover:text-primary transition-colors text-sm">deniz@zorludigitalplaza.com</a>
          </div>
        </div>
      </motion.div>

      <motion.p className="text-center font-display font-bold text-lg md:text-xl mt-10 italic" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        Zorlu Digital Plaza | Kişisel Verileriniz Güvende
      </motion.p>
    </div>
  );
}

export function CerezPolitikasiPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 flex justify-center"><PremiumIcon icon={Cookie} size="xl" variant="glow" /></div>
        <motion.h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>{t("content.cookie.title")}</motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Site deneyiminizi geliştirmek amacıyla kullanılan çerez türleri ve yönetimi hakkında bilgilendirme.</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
          <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <div className="flex items-start gap-4 relative z-10">
            <PremiumIcon icon={AlertCircle} size="lg" variant="glow" />
            <div>
              <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>1. Çerez Nedir?</motion.h2>
              <p className="text-sm text-muted-foreground leading-relaxed">Çerezler (cookies), ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük veri dosyalarıdır. Bu dosyalar site deneyiminizi geliştirmek amacıyla kullanılır.</p>
            </div>
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <PremiumIcon icon={Cookie} size="md" variant="glow" />
            <motion.h2 className="font-display text-lg md:text-xl font-bold" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>2. Kullanılan Çerez Türleri</motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Zorunlu Çerezler", desc: "Site'nin temel işlevlerinin çalışmasını sağlar." },
              { title: "Performans Çerezleri", desc: "Site kullanımını analiz etmek için kullanılır." },
              { title: "İşlevsel Çerezler", desc: "Kullanıcı tercihlerini hatırlamak için kullanılır." },
              { title: "Pazarlama Çerezleri", desc: "Kampanya ve reklam içeriklerinin optimize edilmesini sağlar." },
            ].map((item, i) => (
              <motion.div key={item.title} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden" whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
                <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 25px hsl(221,83%,53%,0.0)", "inset 0 0 25px hsl(221,83%,53%,0.07)", "inset 0 0 25px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
                <div className="flex items-start gap-3 relative z-10">
                  <PremiumIcon icon={Cookie} size="sm" variant="glow" />
                  <div>
                    <motion.h4 className="font-display font-bold text-sm mb-1" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>{item.title}</motion.h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {[
          { icon: Eye, title: "3. Çerezlerin Kullanım Amaçları", content: (<ul className="list-disc pl-5 space-y-1"><li>Site performansını artırmak</li><li>Kullanıcı deneyimini geliştirmek</li><li>Güvenliği sağlamak</li><li>Analiz ve istatistik yapmak</li><li>Kişiselleştirilmiş içerik sunmak</li></ul>) },
          { icon: Settings, title: "4. Çerezlerin Kontrolü", content: (<><p>Tarayıcı ayarlarınızdan çerezleri kontrol edebilir veya tamamen devre dışı bırakabilirsiniz.</p><p>Ancak bazı çerezlerin devre dışı bırakılması site işlevlerinin düzgün çalışmasını engelleyebilir.</p></>) },
        ].map((s, i) => (
          <motion.div key={s.title} className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div className="flex-1 min-w-0">
                <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>{s.title}</motion.h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{s.content}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p className="text-center font-display font-bold text-lg md:text-xl mt-10 italic" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        Zorlu Digital Plaza | Teknolojiye Güvenli Dokunuş
      </motion.p>
    </div>
  );
}

export function MesafeliSatisSozlesmesiPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="mb-4 flex justify-center"><PremiumIcon icon={ScrollText} size="xl" variant="glow" /></div>
        <motion.h1 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
          <motion.span animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>{t("content.distance.title")}</motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Elektronik ortamda sipariş verilen ürünlerin satışı ve teslimine ilişkin hak ve yükümlülükler.</p>
      </motion.div>

      {/* Taraflar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          { title: "Satıcı", content: (<div className="text-xs text-muted-foreground space-y-1"><p><strong className="text-foreground">Zorlu Digital Plaza</strong></p><p>Web: www.zorluplus.com</p><a href="mailto:deniz@zorludigitalplaza.com" className="block text-foreground hover:text-primary transition-colors">deniz@zorludigitalplaza.com</a><a href="tel:+905428783131" className="block text-foreground hover:text-primary transition-colors">+90 542 878 31 31</a></div>) },
          { title: "Alıcı", content: (<p className="text-xs text-muted-foreground">Site üzerinden sipariş oluşturan kullanıcı.</p>) },
        ].map((item, i) => (
          <motion.div key={item.title} className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden" whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 25px hsl(221,83%,53%,0.0)", "inset 0 0 25px hsl(221,83%,53%,0.07)", "inset 0 0 25px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }} />
            <div className="flex items-start gap-3 relative z-10">
              <PremiumIcon icon={i === 0 ? Building2 : UserCheck} size="sm" variant="glow" />
              <div>
                <motion.p className="font-display font-bold text-foreground text-sm mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>{item.title}</motion.p>
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        {[
          { icon: FileText, title: "2. Konu", content: (<p>Bu sözleşme, alıcının satıcıya ait internet sitesi üzerinden elektronik ortamda sipariş verdiği ürünlerin satışı ve teslimine ilişkin hak ve yükümlülükleri düzenler.</p>) },
          { icon: BarChart3, title: "3. Ürün ve Hizmet Bilgileri", content: (<p>Ürünlerin temel özellikleri, satış fiyatı ve ödeme bilgileri sipariş sayfasında belirtilir.</p>) },
          { icon: Shield, title: "4. Ödeme", content: (<><p>Ödeme aşağıdaki yöntemlerle yapılabilir:</p><ul className="list-disc pl-5 space-y-1"><li>Kredi kartı</li><li>Banka kartı</li><li>Havale / EFT</li><li>Online ödeme sistemleri</li></ul></>) },
          { icon: Truck, title: "5. Teslimat", content: (<><p>Siparişler stok durumuna göre en kısa sürede hazırlanarak kargo firması aracılığıyla teslim edilir.</p><p>Teslimat süresi bölgeye göre değişiklik gösterebilir.</p></>) },
          { icon: AlertCircle, title: "6. Cayma Hakkı", content: (<><p>Tüketici, ürünü teslim aldığı tarihten itibaren <strong className="text-foreground">14 gün</strong> içinde herhangi bir gerekçe göstermeden cayma hakkına sahiptir.</p><p>İade edilen ürün kullanılmamış, zarar görmemiş ve orijinal ambalajında olmalıdır.</p></>) },
          { icon: Wrench, title: "7. Garanti", content: (<p>Satın alınan ürünler üretici garantisi veya en az <strong className="text-foreground">2 yıl garanti</strong> kapsamındadır.</p>) },
          { icon: Globe, title: "8. Uyuşmazlıkların Çözümü", content: (<><p>Bu sözleşme Kuzey Kıbrıs Türk Cumhuriyeti yasalarına tabidir.</p><p>Uyuşmazlık durumunda <strong className="text-foreground">Lefkoşa Mahkemeleri</strong> yetkilidir.</p></>) },
        ].map((s, i) => (
          <motion.div key={s.title} className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}>
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none" animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div className="flex-1 min-w-0">
                <motion.h2 className="font-display text-lg md:text-xl font-bold mb-2" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}>{s.title}</motion.h2>
                <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{s.content}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p className="text-center font-display font-bold text-lg md:text-xl mt-10 italic" animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        Zorlu Digital Plaza | Teknolojiye Premium Dokunuş
      </motion.p>
    </div>
  );
}

export function SiparisTakipPage() {
  const { t } = useLanguage();
  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.h1
        className="font-display text-3xl md:text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.orderTracking.title")}
        </motion.span>
      </motion.h1>

      <motion.div
        className="space-y-6 text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>
          Zorlu Digital Plaza'dan verdiğiniz tüm siparişler, hazırlık aşamasından kapınıza ulaşana kadar <strong className="text-foreground">Premium hizmet güvencemiz</strong> altındadır.
        </p>
        <p>
          Siparişinizin güncel durumunu öğrenmek, teslimat detaylarını sorgulamak veya gönderinizle ilgili özel taleplerinizi iletmek için size özel oluşturduğumuz hızlı destek hattımızı kullanabilirsiniz.
        </p>

        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Pulse glow background */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
                "inset 0 0 30px hsl(221,83%,53%,0.08)",
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.h2
            className="font-display text-xl md:text-2xl font-bold relative z-10"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Anlık Bilgi ve Destek
          </motion.h2>

          <p className="relative z-10">
            Süreci hızlandırmak adına, WhatsApp hattımıza mesaj atarken <strong className="text-foreground">sipariş numaranızı</strong> belirtmeyi unutmayınız.
          </p>

          <div className="flex flex-col gap-3 relative z-10">
            <a href="https://wa.me/905488783131" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{
                  boxShadow: [
                    "0 0 0px hsl(221,83%,53%,0)",
                    "0 0 16px hsl(221,83%,53%,0.3)",
                    "0 0 0px hsl(221,83%,53%,0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </motion.span>
              Premium WhatsApp Hattı: +90 548 878 31 31
            </a>
            <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{
                  boxShadow: [
                    "0 0 0px hsl(221,83%,53%,0)",
                    "0 0 16px hsl(221,83%,53%,0.3)",
                    "0 0 0px hsl(221,83%,53%,0)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Mail className="h-5 w-5 text-primary" />
              </motion.span>
              E-posta Destek: deniz@zorludigitalplaza.com
            </a>
          </div>
        </motion.div>

        <motion.p
          className="text-center font-display font-bold text-lg md:text-xl mt-8 italic"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          "Siparişiniz yola çıktığı andan itibaren, her adımda yanınızdayız."
        </motion.p>
      </motion.div>
    </div>
  );
}

export function OdemeYontemleriPage() {
  const { t, lang } = useLanguage();
  const paymentMethods = [
    { icon: "banknote", title: lang === "tr" ? "Nakit Ödeme" : "Cash Payment", desc: lang === "tr" ? "Mağazamızda gerçekleştireceğiniz alışverişlerde nakit ödeme kolaylığı." : "Cash payment convenience for in-store purchases." },
    { icon: "card", title: lang === "tr" ? "Kredi / Banka Kartı" : "Credit / Debit Card", desc: lang === "tr" ? "Tüm banka ve kredi kartları ile hızlı, güvenli ve Premium işlem altyapısı." : "Fast, secure and Premium transaction infrastructure with all bank and credit cards." },
    { icon: "building", title: lang === "tr" ? "Havale / EFT" : "Bank Transfer", desc: lang === "tr" ? "Banka hesaplarımıza anında transfer seçeneği ile dijital ödeme konforu." : "Digital payment comfort with instant transfer option to our bank accounts." },
    { icon: "chart", title: lang === "tr" ? "Ayrıcalıklı Taksit İmkanları" : "Installment Plans", desc: lang === "tr" ? "Anlaşmalı bankalar aracılığıyla bütçenize uygun, avantajlı taksit seçenekleri." : "Advantageous installment options through partner banks suitable for your budget." },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    banknote: <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>,
    card: <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    building: <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
    chart: <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  };

  return (
    <div className="container py-12 md:py-16 max-w-3xl">
      <motion.h1
        className="font-display text-3xl md:text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.span
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.payment.title")}
        </motion.span>
      </motion.h1>

      <motion.div
        className="space-y-8 text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>
          <strong className="text-foreground">Zorlu Digital Plaza</strong>'da alışveriş deneyiminizi kolaylaştırmak için esnek ve güvenilir Premium ödeme yöntemleri sunuyoruz. Size en uygun yöntemi seçerek teknolojiye hızla ulaşabilirsiniz.
        </p>

        {/* Ödeme Yöntemleri */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
                "inset 0 0 30px hsl(221,83%,53%,0.08)",
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.h2
            className="font-display text-xl md:text-2xl font-bold relative z-10"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Kabul Edilen Ödeme Yöntemleri
          </motion.h2>

          <div className="relative z-10 space-y-4">
            {paymentMethods.map((m, i) => (
              <div key={m.title} className="flex items-start gap-3">
                <motion.span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                  animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {iconMap[m.icon]}
                </motion.span>
                <p><strong className="text-foreground">{m.title}:</strong> {m.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detaylı Bilgi */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
                "inset 0 0 30px hsl(221,83%,53%,0.08)",
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.h2
            className="font-display text-xl md:text-2xl font-bold relative z-10"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            Detaylı Bilgi ve Destek
          </motion.h2>
          <p className="relative z-10">Ödeme süreçleri, güncel taksit oranları ve Premium avantajlar hakkında daha fazla bilgi almak için bizimle iletişime geçin:</p>
          <div className="flex flex-col gap-3 relative z-10">
            <a href="#" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin className="h-5 w-5 text-primary" />
              </motion.span>
              Mağaza Ziyareti: Sizi ağırlamaktan mutluluk duyarız.
            </a>
            <a href="tel:+905488783131" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </motion.span>
              Müşteri Hattı: +90 548 878 31 31
            </a>
            <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Mail className="h-5 w-5 text-primary" />
              </motion.span>
              E-posta: deniz@zorludigitalplaza.com
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function SurdurulebilirlikPage() {
  const { t, lang } = useLanguage();
  const sections = lang === "tr" ? [
    { icon: Recycle, title: "Elektronik Atık Geri Dönüşümü", text: "Elektronik ürünlerin kullanım ömrü sona erdiğinde doğru şekilde geri dönüştürülmesi büyük önem taşır.", detail: "Zorlu Digital Plaza, elektronik atıkların doğaya zarar vermeden geri dönüşüm süreçlerine kazandırılması konusunda müşterilerini bilinçlendirmekte ve sürdürülebilir atık yönetimi uygulamalarını desteklemektedir." },
    { icon: BatteryCharging, title: "Atık Pil Toplama Bilinci", text: "Atık piller çevre ve insan sağlığı açısından önemli riskler oluşturabilir.", detail: "Bu nedenle Zorlu Digital Plaza, pil geri dönüşümü konusunda farkındalık yaratmayı destekler ve müşterilerini atık pilleri yetkili toplama noktalarına teslim etmeleri konusunda bilgilendirir." },
    { icon: Zap, title: "Enerji Verimli Teknoloji", text: "Enerji verimli teknolojilerin tercih edilmesi hem çevreyi korur hem de enerji tüketimini azaltır.", detail: "Zorlu Digital Plaza, mağaza ve servis operasyonlarında enerji tasarrufu sağlayan teknolojileri tercih eder ve müşterilerine enerji verimliliği yüksek ürünleri önerir." },
    { icon: Globe, title: "Çevre Bilinci ve Sorumluluk", text: "Sürdürülebilirlik yalnızca bir hedef değil, aynı zamanda bir sorumluluktur.", detail: "Zorlu Digital Plaza ekibi, çevre bilinci konusunda farkındalık oluşturmayı ve doğaya saygılı bir teknoloji kültürünü desteklemeyi amaçlamaktadır." },
  ] : [
    { icon: Recycle, title: "Electronic Waste Recycling", text: "Proper recycling of electronic products at the end of their lifespan is of great importance.", detail: "Zorlu Digital Plaza raises awareness among its customers about integrating electronic waste into recycling processes without harming nature and supports sustainable waste management practices." },
    { icon: BatteryCharging, title: "Waste Battery Collection Awareness", text: "Waste batteries can pose significant risks to the environment and human health.", detail: "Therefore, Zorlu Digital Plaza supports raising awareness about battery recycling and informs its customers about delivering waste batteries to authorized collection points." },
    { icon: Zap, title: "Energy Efficient Technology", text: "Preferring energy-efficient technologies both protects the environment and reduces energy consumption.", detail: "Zorlu Digital Plaza prefers energy-saving technologies in its store and service operations and recommends products with high energy efficiency to its customers." },
    { icon: Globe, title: "Environmental Awareness and Responsibility", text: "Sustainability is not just a goal, but also a responsibility.", detail: "The Zorlu Digital Plaza team aims to raise awareness about environmental consciousness and support an eco-friendly technology culture." },
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
        <div className="mb-4 flex justify-center">
          <PremiumIcon icon={Leaf} size="xl" variant="glow" />
        </div>
        <motion.h1
          className="font-display text-3xl md:text-5xl font-extrabold mb-4"
        >
          <motion.span
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {t("content.sustainability.title")}
          </motion.span>
        </motion.h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">Zorlu Digital Plaza olarak teknolojinin geleceğini şekillendirirken çevresel sürdürülebilirliği iş modelimizin merkezine koyuyoruz.</p>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mt-2">Enerji verimliliği, doğal kaynakların korunması ve elektronik atıkların geri dönüşümü konularında bilinçli uygulamaları destekleyerek daha yaşanabilir bir gelecek için sorumluluk alıyoruz.</p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6 mb-10">
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
            <div className="flex items-start gap-4 relative z-10">
              <PremiumIcon icon={s.icon} size="lg" variant="glow" />
              <div>
                <motion.h2
                  className="font-display text-lg md:text-xl font-bold mb-2"
                  animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {s.title}
                </motion.h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">{s.text}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gelecek İçin Teknoloji */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-6 md:p-8 relative overflow-hidden mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mb-4 flex justify-center">
          <PremiumIcon icon={Lightbulb} size="lg" variant="glow" />
        </div>
        <motion.h2
          className="font-display text-xl md:text-2xl font-bold mb-3 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Gelecek İçin Teknoloji
        </motion.h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto relative z-10">Zorlu Digital Plaza, teknoloji sektöründe sürdürülebilir bir gelecek oluşturmak için çevre dostu uygulamaları desteklemeye ve müşterilerini bilinçli tüketim konusunda teşvik etmeye devam etmektedir.</p>
      </motion.div>

      <motion.p
        className="text-center font-display font-bold text-lg md:text-xl italic"
        animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        Zorlu Digital Plaza | Sürdürülebilir Teknoloji, Güvenilir Gelecek
      </motion.p>
    </div>
  );
}

/* ───────── Havale ile Ödeme ───────── */
export function HavaleOdemePage() {
  const { t } = useLanguage();

  const tips = [
    t("content.havale.tip1"),
    t("content.havale.tip2"),
    t("content.havale.tip3"),
    t("content.havale.tip4"),
  ];

  const banks = [
    {
      name: "Türkiye İş Bankası",
      holder: "Zorlu Digital Trade & Services Ltd.",
      iban: "TR75 0006 4000 0016 8180 8102 16",
      uban: "—",
      branch: "Hamitköy Lefkoşa Şubesi",
    },
    {
      name: "İktisat Bankası (KKTC)",
      holder: "Zorlu Digital Trade & Services Ltd.",
      iban: "—",
      uban: "Bilgi için iletişime geçiniz",
      branch: "",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        className="relative rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-primary/5 p-6 md:p-10 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 40px hsl(221,83%,53%,0.0)", "inset 0 0 40px hsl(221,83%,53%,0.15)", "inset 0 0 40px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4"
          animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 25px hsl(221,83%,53%,0.4)", "0 0 0px hsl(221,83%,53%,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Building2 className="h-7 w-7 text-primary" />
        </motion.span>
        <motion.h1
          className="font-display text-2xl md:text-3xl font-bold mb-3 relative z-10"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(var(--foreground))", "hsl(221,83%,53%)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {t("content.havale.title")}
        </motion.h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl relative z-10">
          {t("content.havale.desc")}
        </p>
      </motion.div>

      {/* Important Notes */}
      <motion.div
        className="rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-5 md:p-6 space-y-3"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-start gap-3">
          <motion.span
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40 shrink-0"
            animate={{ boxShadow: ["0 0 0px hsl(38,92%,50%,0)", "0 0 18px hsl(38,92%,50%,0.35)", "0 0 0px hsl(38,92%,50%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </motion.span>
          <div>
            <p className="text-sm font-semibold text-foreground">{t("content.havale.orderNote")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("content.havale.cancelNote")}</p>
          </div>
        </div>
      </motion.div>

      {/* Bank Accounts */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <motion.span
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"
            animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 15px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Building2 className="h-4 w-4 text-primary" />
          </motion.span>
          {t("content.havale.bankAccounts")}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {banks.map((bank, i) => (
            <motion.div
              key={bank.name}
              className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{ boxShadow: ["inset 0 0 25px hsl(221,83%,53%,0.0)", "inset 0 0 25px hsl(221,83%,53%,0.1)", "inset 0 0 25px hsl(221,83%,53%,0.0)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
              <h3 className="font-display font-bold text-foreground text-lg mb-3 relative z-10">{bank.name}</h3>
              <div className="space-y-2 text-sm relative z-10">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("content.havale.accountHolder")}:</span>
                  <span className="font-medium text-foreground text-right">{bank.holder}</span>
                </div>
                {bank.branch && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Şube:</span>
                    <span className="font-medium text-foreground">{bank.branch}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IBAN:</span>
                  <span className="font-mono font-semibold text-foreground select-all text-right">{bank.iban}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">UBAN:</span>
                  <span className="font-mono font-semibold text-foreground text-right">{bank.uban}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* TR / KKTC Transfer Info */}
      <motion.div
        className="rounded-2xl border border-border bg-muted/30 p-5 md:p-6 space-y-2"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-primary" />
          {t("content.havale.trTransfers")}
        </h3>
        <p className="text-sm text-muted-foreground">{t("content.havale.trTransfersDesc")}</p>
        <p className="text-sm text-muted-foreground">{t("content.havale.kktcTransfersDesc")}</p>
      </motion.div>

      {/* Important Tips */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-5 md:p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.1)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <h3 className="font-display font-bold text-foreground mb-4 relative z-10">{t("content.havale.importantTitle")}</h3>
        <div className="grid gap-3 sm:grid-cols-2 relative z-10">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-primary/5 p-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
            >
              <motion.span
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 shrink-0 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.35)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              >
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
              </motion.span>
              <span className="text-sm text-foreground">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Order Confirmation */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-5 md:p-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 25px hsl(221,83%,53%,0.0)", "inset 0 0 25px hsl(221,83%,53%,0.12)", "inset 0 0 25px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3"
          animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 18px hsl(221,83%,53%,0.35)", "0 0 0px hsl(221,83%,53%,0)"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Truck className="h-5 w-5 text-primary" />
        </motion.span>
        <h3 className="font-display font-bold text-foreground mb-2 relative z-10">{t("content.havale.confirmTitle")}</h3>
        <p className="text-sm text-muted-foreground mb-3 relative z-10">{t("content.havale.confirmDesc")}</p>
        <p className="text-sm text-muted-foreground mb-2 relative z-10">{t("content.havale.deliveryOptions")}</p>
        <div className="flex flex-wrap gap-3 relative z-10">
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="h-4 w-4" /> {t("content.havale.storePickup")}
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Truck className="h-4 w-4" /> {t("content.havale.cargoDelivery")}
          </motion.span>
        </div>
      </motion.div>

      {/* Contact */}
      <motion.div
        className="rounded-2xl border border-border bg-card p-5 md:p-6 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: ["inset 0 0 30px hsl(221,83%,53%,0.0)", "inset 0 0 30px hsl(221,83%,53%,0.12)", "inset 0 0 30px hsl(221,83%,53%,0.0)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <h3 className="font-display font-bold text-foreground text-lg mb-1 relative z-10">{t("content.havale.contactTitle")}</h3>
        <p className="text-sm text-muted-foreground mb-4 relative z-10">{t("content.havale.contactDesc")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <motion.a
            href="mailto:deniz@zorludigitalplaza.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 15px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Mail className="h-4 w-4" /> deniz@zorludigitalplaza.com
          </motion.a>
          <motion.a
            href="tel:+905428783131"
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 15px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <Phone className="h-4 w-4" /> +90 542 878 31 31
          </motion.a>
        </div>
        <p className="text-xs text-muted-foreground mt-4 relative z-10">Zorlu Digital Plaza — Zorlu Digital Trade & Services Ltd.</p>
      </motion.div>
    </div>
  );
}
