import { useState, useEffect, useRef } from "react";
import ContentPage from "@/components/ContentPage";
import { motion } from "framer-motion";
import { Users, Clock, Star, Truck, ShieldCheck, HeartHandshake, MapPin, Quote, Mail } from "lucide-react";
import { BRANCHES } from "@/lib/constants";

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
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        {/* Animated background particles */}
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
              1999'dan beri
            </motion.span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-12">
              <motion.span
                className="inline-block"
                animate={{ color: ["hsl(0,0%,100%)", "hsl(210,100%,80%)", "hsl(0,0%,100%)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Kaliteyi ve Güvenilir
              </motion.span>
              <br />
              <motion.span
                className="inline-block"
                animate={{ color: ["hsl(210,100%,80%)", "hsl(0,0%,100%)", "hsl(210,100%,80%)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Ürünleri Benimsiyoruz
              </motion.span>
            </h1>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <motion.div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center"
                    animate={{
                      backgroundColor: ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.15)"],
                      boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <s.icon className="h-8 w-8" />
                  </motion.div>
                  <motion.p
                    className="font-display text-4xl md:text-5xl font-extrabold"
                    animate={{ color: ["hsl(0,0%,100%)", "hsl(210,100%,85%)", "hsl(0,0%,100%)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    <CountUp target={s.value} suffix={s.suffix} />
                  </motion.p>
                  <p className="text-primary-foreground/70 text-sm md:text-base">{s.label}</p>
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
            className="font-display text-2xl md:text-3xl font-bold mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            Hakkımızda
          </motion.h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p><strong className="text-foreground">Zorlu Digital Plaza</strong>, Kuzey Kıbrıs'ta teknoloji, elektronik ve yaşam çözümleri alanında 26 yılı aşkın deneyimiyle güvenin ve kalite standartlarının simgesi hâline gelmiş köklü bir kuruluştur.</p>
            <p>Kurulduğu günden bu yana şirketimiz; yenilikçi vizyonu, dünya markalarıyla güçlü iş ortaklıkları ve müşteri memnuniyetini merkeze alan hizmet anlayışı ile sektörde öncü ve güvenilir bir teknoloji platformu olarak konumlanmıştır.</p>
            <p><strong className="text-foreground">Zorlu Digital Plaza</strong> yalnızca bir elektronik perakendecisi değildir. Biz, teknolojiyi günlük yaşamın konforu ile buluşturan; müşterilerine en doğru ürünü, en doğru hizmetle ve en doğru deneyimle sunmayı hedefleyen bir teknoloji ekosistemiyiz.</p>
            <p>Yirmi altı yıllık yolculuğumuz boyunca kazandığımız deneyim, güçlü operasyonel altyapımız ve uzman kadromuz sayesinde Zorlu Digital Plaza bugün Kuzey Kıbrıs'ın en saygın teknoloji ve elektronik merkezlerinden biri olarak faaliyet göstermektedir.</p>
          </div>
        </motion.section>

        {/* Biz Kimiz */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold mb-4"
            animate={{ color: ["hsl(210,40%,20%)", "hsl(221,83%,53%)", "hsl(210,40%,20%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            Biz Kimiz
          </motion.h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>1999 yılında kurulan <strong className="text-foreground">Zorlu Digital Plaza</strong>, Kuzey Kıbrıs'ta markalı elektronik ürünler, beyaz eşya ve iklimlendirme çözümleri alanında lider teknoloji perakendecilerinden biri olarak hizmet vermektedir.</p>
            <p>Şirketimizin temel felsefesi; müşterilerimize yalnızca ürün sunmak değil, başından sonuna <strong className="text-foreground">kusursuz bir teknoloji deneyimi</strong> yaşatmaktır.</p>
            <p>Bu anlayış doğrultusunda;</p>
            <motion.ul
              className="space-y-2 list-none pl-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {["Alanında uzman satış danışmanları", "Profesyonel satış sonrası destek ekipleri", "Güçlü teknik servis altyapısı", "Dünya markalarıyla kurulan stratejik iş birlikleri"].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3 text-muted-foreground"
                  variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                >
                  <motion.span
                    className="h-2 w-2 rounded-full shrink-0"
                    animate={{ backgroundColor: ["hsl(221,83%,53%)", "hsl(0,0%,100%)", "hsl(221,83%,53%)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <p>Zorlu Digital Plaza'nın başarısının temel yapı taşlarını oluşturmaktadır.</p>
            <p>Bugün şirketimiz; yenilikçi yaklaşımı, müşteri odaklı hizmet modeli ve sürekli gelişen teknoloji altyapısıyla bölgede <strong className="text-foreground">kalite, güven ve teknoloji mükemmeliyetinin</strong> referans noktalarından biri olarak kabul edilmektedir.</p>
          </div>
        </motion.section>

        {/* Tarihçe */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold mb-4"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            Tarihçemiz
          </motion.h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>Zorlu Digital Plaza'nın hikâyesi, tek bir mağaza ile başlayan ve zamanla Kuzey Kıbrıs'ın en güçlü teknoloji perakende ve dağıtım ağlarından birine dönüşen bir büyüme yolculuğudur.</p>
            <p>Yıllar içinde yapılan stratejik yatırımlar sayesinde şirketimiz; <strong className="text-foreground">Lefkoşa</strong> ve <strong className="text-foreground">Mağusa</strong> bölgelerinde konumlanan mağazaları ve merkezi dağıtım altyapısı ile ülke genelinde geniş bir müşteri kitlesine hizmet vermektedir.</p>
            <p>Bugün Zorlu Digital Plaza, yalnızca ürün satışı yapan bir perakendeci değil; aynı zamanda teknoloji danışmanlığı, satış sonrası destek ve güvenilir hizmet anlayışı ile <strong className="text-foreground">bütüncül bir teknoloji çözüm merkezi</strong> olarak faaliyet göstermektedir.</p>
            <p>Çok nesilli deneyimimiz, güçlü lojistik altyapımız ve sürekli gelişen hizmet vizyonumuz ile Zorlu Digital Plaza, Kuzey Kıbrıs'ta teknoloji perakendeciliğinin geleceğini şekillendiren markalar arasında yer almaktadır.</p>
          </div>
        </motion.section>

        {/* Değerler */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold mb-6"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Kaliteli Ürünlere Olan İnancımız
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Ücretsiz Teslimat", desc: "5000 TL ve üzeri alışverişlerde" },
              { icon: Star, title: "100% Memnuniyet", desc: "Para iade garantisi" },
              { icon: HeartHandshake, title: "7/24 Destek", desc: "Kesintisiz hizmet" },
              { icon: ShieldCheck, title: "Güvenli Ödeme", desc: "100% güvenli ödeme seçenekleri" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="card-lift rounded-2xl border border-border bg-card p-6 text-center relative overflow-hidden group"
                variants={{ hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ y: -4, boxShadow: "0 12px 30px -8px hsl(221 83% 53% / 0.2)" }}
                transition={{ duration: 0.4 }}
              >
                {/* Animated gradient border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, hsl(221,83%,53%,0.1), transparent, hsl(221,83%,53%,0.05))" }}
                />
                <motion.div
                  className="h-12 w-12 mx-auto rounded-xl flex items-center justify-center mb-3 relative"
                  animate={{
                    backgroundColor: ["hsl(221,83%,53%,0.1)", "hsl(221,83%,53%,0.2)", "hsl(221,83%,53%,0.1)"],
                    boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 15px hsl(221,83%,53%,0.15)", "0 0 0px hsl(221,83%,53%,0)"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    className="text-primary"
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="font-display font-bold mb-1"
                  animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.h2
            className="font-display text-2xl md:text-3xl font-bold mb-6"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            Müşterilerimiz Ne Diyor?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
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
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm text-primary-foreground"
                    animate={{
                      backgroundColor: ["hsl(221,83%,53%)", "hsl(221,83%,63%)", "hsl(221,83%,53%)"],
                      boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                  >
                    {t.name.charAt(0)}
                  </motion.div>
                  <motion.p
                    className="font-semibold text-sm"
                    animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    {t.name}
                  </motion.p>
                </div>
                {/* Google Maps rating stars */}
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
              <motion.div
                className="h-14 w-14 rounded-xl flex items-center justify-center"
                animate={{
                  backgroundColor: ["hsl(221,83%,53%,0.1)", "hsl(221,83%,53%,0.2)", "hsl(221,83%,53%,0.1)"],
                  boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 20px hsl(221,83%,53%,0.15)", "0 0 0px hsl(221,83%,53%,0)"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <MapPin className="h-7 w-7 text-primary" />
              </motion.div>
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
                  <span className="text-xs text-muted-foreground ml-1">Google Maps üzerinde</span>
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
                    <p className="text-xs text-muted-foreground">Google Maps'te görüntüle</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}

export function KunyePage() {
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
          Künye & Kurumsal Bilgiler
        </motion.span>
      </motion.h1>

      <motion.div
        className="space-y-8 text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>
          <strong className="text-foreground">Zorlu Digital Plaza</strong>, teknoloji dünyasında güven ve kaliteyi bir araya getiren <strong className="text-foreground">Zorlu Digital Trade and Services Ltd.</strong> markasıdır.
        </p>

        {/* Resmi Şirket Bilgileri */}
        <motion.div
          className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4 relative overflow-hidden"
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
            Resmi Şirket Bilgileri
          </motion.h2>
          <div className="relative z-10 space-y-2">
            <p><strong className="text-foreground">Ticari Ünvan:</strong> Zorlu Digital Trade and Services Ltd.</p>
            <p><strong className="text-foreground">Merkez Adresi:</strong> Lefkoşa, KKTC</p>
            <p><strong className="text-foreground">Vergi Dairesi:</strong> Lefkoşa Vergi Dairesi</p>
            <p><strong className="text-foreground">Vergi Numarası:</strong> MS 16664</p>
            <p><strong className="text-foreground">Vergi Kimlik No:</strong> 99003199</p>
          </div>
        </motion.div>

        {/* Premium İletişim Kanalları */}
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
            Premium İletişim Kanalları
          </motion.h2>
          <div className="flex flex-col gap-3 relative z-10">
            <a href="tel:+905488783131" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </motion.span>
              Müşteri Destek Hattı: +90 548 878 31 31
            </a>
            <a href="https://wa.me/905488783131" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </motion.span>
              WhatsApp Sipariş & Takip: +90 548 878 31 31
            </a>
            <a href="mailto:deniz@zorludigitalplaza.com" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <Mail className="h-5 w-5 text-primary" />
              </motion.span>
              Kurumsal E-posta: deniz@zorludigitalplaza.com
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
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            animate={{
              boxShadow: [
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
                "inset 0 0 30px hsl(221,83%,53%,0.08)",
                "inset 0 0 30px hsl(221,83%,53%,0.0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.h2
            className="font-display text-xl md:text-2xl font-bold relative z-10"
            animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            Hizmet Standartlarımız
          </motion.h2>
          <div className="relative z-10 space-y-3">
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">Yetkili Servis:</strong> Samsung ve LG Profesyonel Hizmet Noktası.</p>
            </div>
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <Star className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">Garanti:</strong> Tüm ürünlerde 2 Yıl Premium Garanti.</p>
            </div>
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <Truck className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">Montaj:</strong> Beyaz eşya ve klima gruplarında Ücretsiz Kurulum.</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          className="text-center font-display font-bold text-lg md:text-xl mt-8 italic"
          animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,98%)", "hsl(221,83%,53%)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Zorlu Digital Plaza | Teknolojiye Güvenli ve Premium Dokunuş
        </motion.p>
      </motion.div>
    </div>
  );
}

export function EkibimizPage() {
  const team = [
    { name: "Halil Kavaz", role: "CEO & Founder", photo: "/team/halil-kavaz.png" },
    { name: "Deniz Bisikletçiler", role: "Coordinator", photo: "/team/deniz-bisikletciler.png" },
    { name: "Serkan Taras", role: "Mağusa – Store Manager", photo: "/team/serkan-taras.png" },
    { name: "Çisem Özdoğan", role: "Lefkoşa – Store Manager", photo: "/team/cisem-ozdogan.png" },
    { name: "Mustafa Özdoğan", role: "Lefkoşa – Sales Representative", photo: "/team/mustafa-ozdogan.png" },
    { name: "Dilfuza Jumakova", role: "Lefkoşa – Sales Representative", photo: "/team/dilfuza-jumakova.png" },
    { name: "Alaaeddin Erdemci", role: "White Goods Chef", photo: "/team/alaaeddin-erdemci.png" },
    { name: "Abed Azbaki", role: "TV/AV Service Chief", photo: "/team/abed-azbaki.png" },
    { name: "Suhrap Alimov", role: "Air Conditioning Chef", photo: "/team/suhrap-alimov.png" },
    { name: "Çakır Recepov", role: "TV Technician", photo: "/team/cakir-recepov.png" },
    { name: "Bilal Muhammed", role: "TV Technician", photo: "/team/bilal-muhammed.png" },
    { name: "Umit Rozyev", role: "TV Technician", photo: "/team/umit-rozyev.png" },
    { name: "Ramazan Koshayev", role: "Air Conditioning Technician", photo: "/team/ramazan-koshayev.png" },
    { name: "Karetta", role: "Yapay Zeka Asistan", photo: "/team/karetta.jpg" },
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
          Ekibimiz
        </motion.span>
      </motion.h1>

      <motion.p
        className="text-muted-foreground leading-relaxed mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <strong className="text-foreground">Zorlu Digital Plaza</strong> ailesi, alanında uzman satış danışmanları ve teknik servis ekibinden oluşmaktadır. Müşteri memnuniyetini ön planda tutan ekibimiz, size en doğru ürünü seçmenizde yardımcı olur.
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
              <img src={m.photo} alt={m.name} className="w-24 h-28 object-cover rounded-lg" loading="lazy" />
            </motion.div>
            <motion.p
              className="font-display font-bold text-sm leading-tight"
              animate={{ color: ["hsl(221,83%,53%)", "hsl(210,40%,20%)", "hsl(221,83%,53%)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {m.name}
            </motion.p>
            <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function DestekPage() {
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
          Premium Destek & Müşteri Hizmetleri
        </motion.span>
      </motion.h1>

      <motion.div
        className="space-y-8 text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p>
          <strong className="text-foreground">Zorlu Digital Plaza</strong> ailesi olarak, teknolojiye olan tutkunuzu Premium bir deneyimle destekliyoruz. Teknik servis talepleriniz, kurulum süreçleriniz veya ürünlerinizle ilgili her türlü sorunuz için uzman ekibimizle dilediğiniz zaman iletişime geçebilirsiniz.
        </p>

        {/* Sıkça Sorulan Sorular */}
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
            Sıkça Sorulan Sorular
          </motion.h2>

          <div className="relative z-10 space-y-4">
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ShieldCheck className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">2 Yıl Premium Garanti:</strong> Tüm ürünlerimiz, yüksek kalite standartlarımız gereği 2 yıllık kapsamlı garanti güvencesi altındadır.</p>
            </div>
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <Truck className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">Ücretsiz Uzman Montajı:</strong> Beyaz eşya ve klima ürünlerinizde, yetkili servisimiz tarafından gerçekleştirilen ücretsiz ve profesyonel montaj hizmeti ile kurulumunuzu zahmetsizce tamamlıyoruz.</p>
            </div>
            <div className="flex items-start gap-3">
              <motion.span
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 12px hsl(221,83%,53%,0.25)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <Star className="h-4 w-4 text-primary" />
              </motion.span>
              <p><strong className="text-foreground">Premium Sipariş Takibi:</strong> Siparişinizin her adımını anlık olarak görüntülemek ve hızlı destek almak için WhatsApp destek hattımızı kullanabilirsiniz.</p>
            </div>
          </div>
        </motion.div>

        {/* Bize Ulaşın */}
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
            Bize Ulaşın
          </motion.h2>
          <p className="relative z-10">Sorularınız ve çözüm talepleriniz için Premium destek kanalımız üzerinden bize yazabilirsiniz:</p>
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
            <a href="https://wa.me/905488783131" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-foreground hover:text-primary transition-colors">
              <motion.span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"
                animate={{ boxShadow: ["0 0 0px hsl(221,83%,53%,0)", "0 0 16px hsl(221,83%,53%,0.3)", "0 0 0px hsl(221,83%,53%,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </motion.span>
              Destek Hattı: +90 548 878 31 31 (WhatsApp)
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function KullanimKosullariPage() {
  return (
    <ContentPage title="Kullanım Koşulları">
      <p>Bu Kullanım Koşulları, Zorlu Digital Plaza ("Şirket", "biz", "bize", "bizim") tarafından işletilen <strong>www.zorluplus.com</strong> ("Site") üzerinden sunulan tüm hizmetlerin kullanımına ilişkin şartları düzenler.</p>
      <p>Siteyi kullanarak bu koşulları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz.</p>

      <h2>1. Genel Hükümler</h2>
      <p>Bu Site'ye erişim sağlayan herkes, bu Kullanım Koşulları'nı ve ilgili tüm yasal düzenlemeleri kabul etmiş sayılır. Koşulları kabul etmiyorsanız, lütfen Site'yi kullanmayı bırakınız.</p>

      <h2>2. Hizmetlerin Kapsamı</h2>
      <p>Sitemiz üzerinden;</p>
      <ul>
        <li>Ürünler hakkında bilgi alınabilir,</li>
        <li>Online sipariş oluşturulabilir,</li>
        <li>Müşteri hizmetlerine talep gönderilebilir,</li>
        <li>Servis, garanti ve teknik destek süreçleri başlatılabilir,</li>
        <li>Kampanya ve duyurular takip edilebilir.</li>
      </ul>
      <p>Hizmetlerin kapsamı Şirket tarafından bildirimsiz olarak değiştirilebilir.</p>

      <h2>3. Kullanıcı Yükümlülükleri</h2>
      <p>Site'yi kullanan tüm kullanıcılar aşağıdaki yükümlülükleri kabul eder:</p>
      <ul>
        <li>Sitede yer alan hiçbir içeriği yasadışı amaçlarla kullanmamak,</li>
        <li>Yanlış veya yanıltıcı bilgi vermemek,</li>
        <li>Site'nin güvenliğini tehdit edecek girişimlerde bulunmamak,</li>
        <li>Otomatik sistemlerle (bot, script vb.) içerik taraması yapmamak,</li>
        <li>Site'deki içeriklerin telif haklarına saygı göstermek,</li>
        <li>Site'nin düzgün çalışmasını engelleyebilecek herhangi bir davranışta bulunmamak.</li>
      </ul>
      <p>Bu yükümlülüklerin ihlali hâlinde erişiminiz geçici veya kalıcı olarak sonlandırılabilir.</p>

      <h2>4. Fikri Mülkiyet Hakları</h2>
      <p>Site'de yer alan tüm metin, görsel, logo, marka, grafik, tasarım, ürün bilgisi ve diğer içerikler Zorlu Digital Plaza'ya aittir veya lisansla kullanılmaktadır. Bu içerikler izinsiz kopyalanamaz, çoğaltılamaz, dağıtılamaz ve ticari amaçlarla kullanılamaz.</p>
      <p>İzinsiz kullanım hukuki ve cezai yaptırımlara tabidir.</p>

      <h2>5. Sipariş, Ödeme ve Teslimat Koşulları</h2>
      <ul>
        <li>Ürün fiyatları, stok bilgileri ve kampanyalar değişiklik gösterebilir.</li>
        <li>Sipariş onaylanmadan hiçbir işlem kesinleşmiş sayılmaz.</li>
        <li>Ödeme altyapısı, güvenlik protokolleri ve teslimat süreçleri üçüncü taraf sağlayıcılar ile yürütülebilir.</li>
        <li>Kullanıcı, sipariş verirken doğru iletişim ve adres bilgisi vermekle yükümlüdür.</li>
      </ul>

      <h2>6. Garanti ve Teknik Servis</h2>
      <p>Zorlu Digital Plaza'dan satın alınan tüm ürünler, ilgili marka veya 2 yıl süre ile tedarikçi garantisi altındadır. Servis, bakım, onarım ve yedek parça hizmetleri şirketimiz veya yetkili servisimiz tarafından sağlanır.</p>
      <p>Garanti kapsamı dışında kalan durumlar (kullanıcı hatası, sıvı teması, düşme vb.) ücretli olabilir.</p>

      <h2>7. Sorumluluk Reddi</h2>
      <p>Zorlu Digital Plaza; sistem kesintilerinden, üçüncü taraf saldırılarından, teknik arızalardan, kullanıcı hatalarından ve internet kaynaklı bağlantı sorunlarından doğabilecek zararlardan sorumlu tutulamaz.</p>
      <p>Site'de yer alan teknik özellikler, ürün açıklamaları ve görseller zaman zaman üretici kaynaklı değişiklik gösterebilir. Bu tür durumlarda sorumluluk üretici veya tedarikçiye aittir.</p>

      <h2>8. Üçüncü Taraf Bağlantıları</h2>
      <p>Site üzerinden üçüncü taraf web sitelerine yönlendiren bağlantılar bulunabilir. Bu sitelerin içeriklerinden, güvenliklerinden veya veri işleme politikalarından Şirket sorumlu değildir. Bu bağlantılar yalnızca kullanıcıya kolaylık sağlamak amacıyla sunulmaktadır.</p>

      <h2>9. Gizlilik Politikası ile İlişki</h2>
      <p>Bu Kullanım Koşulları, kişisel verilerin nasıl toplandığını, işlendiğini ve korunduğunu açıklayan Gizlilik Politikası ile birlikte değerlendirilir. Siteyi kullanarak Gizlilik Politikası'nı da kabul etmiş olursunuz.</p>

      <h2>10. Koşullarda Değişiklik Yapma Hakkı</h2>
      <p>Şirket, bu Kullanım Koşulları'nda önceden bildirim yapmaksızın değişiklik yapma hakkını saklı tutar. Güncellemeler Site'de yayınlandığı tarihten itibaren geçerli olur.</p>
      <p>Kullanıcılar düzenli olarak bu koşulları gözden geçirmekle yükümlüdür.</p>

      <h2>11. Uygulanacak Hukuk ve Yetkili Mahkeme</h2>
      <p>Bu Kullanım Koşulları, Kuzey Kıbrıs Türk Cumhuriyeti yasalarına tabidir. Her türlü uyuşmazlıkta Lefkoşa Mahkemeleri yetkilidir.</p>
    </ContentPage>
  );
}

export function IadeKosullariPage() {
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
          Premium İade ve Değişim Politikası
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
  return (
    <ContentPage title="Gizlilik Politikası">
      <p>Bu Gizlilik Politikası, Zorlu Digital Plaza ("Şirket", "biz", "bize", "bizim") tarafından işletilen <strong>www.zorluplus.com</strong> ("Site") üzerinden elde edilen kişisel verilerin hangi amaçlarla, nasıl işlendiğini ve korunduğunu açıklamaktadır.</p>
      <p>Siteyi kullanarak bu politikada belirtilen şartları kabul etmiş sayılırsınız.</p>

      <h2>1. Kapsam ve Amaç</h2>
      <p>Bu politika; web sitemizi ziyaret eden tüm kullanıcıları, online ve offline kanallar üzerinden bizimle iletişime geçen potansiyel ve mevcut müşterileri, kampanyalarımıza, bültenlerimize veya formlarımıza kayıt olan kişileri kapsar.</p>
      <p>Amaç; kişisel verilerinizi nasıl topladığımız, hangi amaçlarla kullandığımız, kimlerle paylaşabileceğimiz ve haklarınız hakkında sizi açık ve anlaşılır şekilde bilgilendirmektir.</p>

      <h2>2. Topladığımız Veriler</h2>
      <p>Sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde aşağıdaki türde kişisel verileri toplayabiliriz:</p>
      <ul>
        <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, kullanıcı adı vb.</li>
        <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres bilgisi vb.</li>
        <li><strong>İşlem ve Sipariş Bilgileri:</strong> Satın aldığınız ürünler, fatura, teslimat ve ödeme bilgileri (kart numarası gibi hassas bilgiler doğrudan ödeme sağlayıcısı üzerinden işlenir, tarafımızca saklanmaz).</li>
        <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi, ziyaret süresi, görüntülenen sayfalar, yönlendiren URL vb.</li>
        <li><strong>Çerez ve Benzeri Teknolojiler:</strong> Site deneyiminizi iyileştirmek ve istatistiksel analiz yapmak için kullanılan çerezler aracılığıyla elde edilen kullanım verileri.</li>
        <li><strong>İletişim İçerikleri:</strong> Bize e-posta, iletişim formu, sosyal medya veya çağrı merkezi üzerinden ilettiğiniz talep, şikâyet ve geri bildirimler.</li>
      </ul>

      <h2>3. Verilerinizi Hangi Amaçlarla Kullanıyoruz?</h2>
      <p>Toplanan kişisel verileriniz aşağıdaki amaçlarla işlenebilir:</p>
      <ul>
        <li>Siparişlerinizi oluşturmak, takip etmek ve teslimat süreçlerini yönetmek</li>
        <li>Müşteri hesabınızı oluşturmak ve erişiminizi sağlamak</li>
        <li>Satış sonrası destek, garanti ve teknik servis hizmetlerini yürütmek</li>
        <li>Talep ve şikâyetlerinizi değerlendirmek ve sonuçlandırmak</li>
        <li>Ürün ve hizmetlerimizi geliştirmek, iyileştirmek ve kişiselleştirmek</li>
        <li>Kampanyalar, indirimler, yeni ürünler ve duyurular hakkında bilgilendirme yapmak (ticari elektronik ileti izni vermeniz hâlinde)</li>
        <li>Güvenlik, dolandırıcılığın önlenmesi ve yasal yükümlülüklerin yerine getirilmesi</li>
        <li>Ziyaretçi trafiğini analiz etmek, site performansını ölçmek ve iyileştirmek</li>
      </ul>

      <h2>4. Çerezler (Cookies) Kullanımı</h2>
      <p>Sitemizde kullanıcı deneyimini geliştirmek, tercihlerinizi hatırlamak ve istatistiksel veri toplamak için çerezler kullanmaktayız.</p>
      <p>Tarayıcınızın ayarlarından çerezleri kabul etmeme veya silme hakkına sahipsiniz. Çerezleri devre dışı bırakmanız hâlinde, sitemizin bazı işlevleri tam olarak çalışmayabilir.</p>

      <h2>5. Verilerin Paylaşılması</h2>
      <p>Kişisel verileriniz, aşağıdaki durumlarda ve ölçülü olmak kaydıyla üçüncü kişilerle paylaşılabilir:</p>
      <ul>
        <li><strong>Hizmet Sağlayıcılar:</strong> Kargo şirketleri, ödeme kuruluşları, teknik altyapı sağlayıcıları, çağrı merkezi, SMS/E-posta servisleri vb.</li>
        <li><strong>İş Ortakları ve Tedarikçiler:</strong> Kampanyalar, ürün tedariki, garanti ve teknik servis süreçlerinin yürütülmesi kapsamında gerekli olduğunda.</li>
        <li><strong>Resmi Kurumlar:</strong> Yasal yükümlülüklerimizi yerine getirmek veya hukuki taleplere cevap vermek amacıyla, yetkili kurum ve kuruluşlarla mevzuat çerçevesinde.</li>
      </ul>
      <p>Kişisel verileriniz, yasal zorunluluklar veya açık rızanız dışında hiçbir şekilde üçüncü taraflara satılmaz.</p>

      <h2>6. Verilerin Saklanma Süresi</h2>
      <p>Kişisel verileriniz; ilgili mevzuatta öngörülen süreler, sözleşme ilişkimiz devam ettiği süre ve hukuki yükümlülüklerimizi yerine getirmek için gerekli saklama süreleri boyunca saklanır. Bu süreler dolduğunda verileriniz mevzuata uygun şekilde silinir, anonim hale getirilir veya imha edilir.</p>

      <h2>7. Kişisel Verilerinizin Güvenliği</h2>
      <p>Kişisel verilerinizi yetkisiz erişim, kayıp, kötüye kullanım, değişiklik veya ifşaya karşı korumak için uygun teknik ve idari güvenlik önlemleri uygulamaktayız.</p>
      <p>Buna rağmen, internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli olduğunu garanti etmek mümkün değildir. Bu nedenle, bize sağladığınız bilgilerin güvenliğini en üst düzeyde sağlamak için tüm makul önlemleri almaktayız.</p>

      <h2>8. Haklarınız</h2>
      <p>İlgili mevzuat uyarınca kişisel verilerinizle ilgili olarak:</p>
      <ul>
        <li>Hakkınızda kişisel veri işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>İşleme amacını ve bu amaçlara uygun kullanılıp kullanılmadığını öğrenme,</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>İşlenmesini gerektiren sebeplerin ortadan kalkması hâlinde silinmesini veya yok edilmesini talep etme,</li>
        <li>Bu işlemlerin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
        <li>Mevzuata aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
      </ul>
      <p>haklarına sahipsiniz.</p>

      <h2>9. Bize Nasıl Ulaşabilirsiniz?</h2>
      <p>Kişisel verilerinizle ilgili her türlü soru, talep ve başvuru için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:</p>
      <ul>
        <li><strong>Şirket:</strong> Zorlu Digital Plaza</li>
        <li><strong>Adres:</strong> Belediye Bulvarı, Kent Plaza, A Blok No:1, Yenikent, Lefkoşa</li>
        <li><strong>Telefon:</strong> +90 (548) 878 31 31</li>
        <li><strong>E-posta:</strong> info@zorluplus.com</li>
      </ul>
      <p>Başvurularınız, yasal süreler içinde değerlendirilerek sizlere geri dönüş sağlanacaktır.</p>

      <h2>10. Gizlilik Politikasında Değişiklikler</h2>
      <p>Bu Gizlilik Politikası'nı gerekli gördüğümüz zamanlarda güncelleyebiliriz. Güncellenmiş versiyon, yürürlük tarihiyle birlikte sitemizde yayınlandığı andan itibaren geçerli olacaktır.</p>
      <p>Siteyi kullanmaya devam ederek, güncellenmiş politikayı kabul etmiş sayılırsınız.</p>
    </ContentPage>
  );
}

export function SiparisTakipPage() {
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
          Premium Sipariş Takibi
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
  const paymentMethods = [
    { icon: "banknote", title: "Nakit Ödeme", desc: "Mağazamızda gerçekleştireceğiniz alışverişlerde nakit ödeme kolaylığı." },
    { icon: "card", title: "Kredi / Banka Kartı", desc: "Tüm banka ve kredi kartları ile hızlı, güvenli ve Premium işlem altyapısı." },
    { icon: "building", title: "Havale / EFT", desc: "Banka hesaplarımıza anında transfer seçeneği ile dijital ödeme konforu." },
    { icon: "chart", title: "Ayrıcalıklı Taksit İmkanları", desc: "Anlaşmalı bankalar aracılığıyla bütçenize uygun, avantajlı taksit seçenekleri." },
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
          Premium Ödeme Seçenekleri
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
