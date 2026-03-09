import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Satellite, Settings, Radio, Tv, CheckCircle2, AlertTriangle,
  Wrench, Phone, MessageCircle, ChevronRight, ArrowRight,
  Search, Signal, Monitor, Antenna, List, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { BRAND, BRANCHES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/tracking";
import heroImg from "@/assets/tv-kanal-ayarlama-hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const FREQ_TURKSAT = { freq: "12380 MHz", pol: "Vertical (V)", sr: "27500" };
const FREQ_KKTC = { freq: "12610 MHz", pol: "Horizontal (H)", sr: "20830" };

const TKGS_STEPS = [
  "Kumandadan Menu / Ayarlar tuşuna basın",
  "Kurulum veya Kanal Ayarları bölümüne girin",
  "TKGS Ayarları seçeneğini bulun",
  "Çalışma modunu Otomatik yapın",
  "Güncellemeyi Başlat seçeneğine basın",
];

const SERVICE_LIST = [
  "Uydu kanal ayarlama",
  "Türksat kanal kurulumu",
  "KKTC yerel kanallar kurulumu (BRT, Genç TV vb.)",
  "Çanak anten ayarı",
  "Uydu kablo ve LNB kontrolü",
  "Merkezi uydu sistemi ayarı",
];

const FAQ_ITEMS = [
  {
    q: "Televizyonumda TKGS yoksa ne yapabilirim?",
    a: "TKGS olmayan cihazlarda Türksat 4A ana frekansı (12380 MHz, V, 27500) ile Network Search (Şebeke Arama) yaparak kanalları bulabilirsiniz. KKTC yerel kanalları için 12610 MHz frekansını ayrıca eklemeniz gerekir.",
  },
  {
    q: "Kanal arama yaptım ama BRT görünmüyor, ne yapmalıyım?",
    a: "BRT ve diğer KKTC yerel kanalları farklı bir frekansta yayın yapar. 12610 MHz, H, 20830 değerlerini manuel arama ile girerek bu kanalları ekleyebilirsiniz.",
  },
  {
    q: "Sinyal var ama görüntü donuyor, neden olabilir?",
    a: "Sinyal gücü yüksek ama kalitesi düşükse çanak anteniniz rüzgarda yön değiştirmiş olabilir. Ayrıca antenin önünü kapatan bir engel (ağaç, bina) veya kablo hasarı da bu soruna neden olabilir.",
  },
  {
    q: "Merkezi uydu sisteminde DiSEqC nedir?",
    a: "DiSEqC, apartmanlardaki merkezi uydu sistemlerinde birden fazla uyduya geçiş yapmanızı sağlayan bir protokoldür. Televizyonunuzun ayarlarında DiSEqC portunu doğru seçmeniz gerekir.",
  },
  {
    q: "DVB-T2 karasal yayın ile hangi kanalları izleyebilirim?",
    a: "Basit bir oda anteni ile BRT HD ve bazı yerel KKTC kanallarını karasal yayın üzerinden izleyebilirsiniz. Uydu sisteminizde sorun olduğunda alternatif bir çözüm olarak kullanılabilir.",
  },
  {
    q: "Kurulum ne kadar sürer?",
    a: "Profesyonel ekibimiz tarafından yapılan kurulum genellikle 15-30 dakika içinde tamamlanır ve televizyonunuz tüm kanallarla kullanıma hazır hale gelir.",
  },
];

export default function TVKanalAyarlamaPage() {
  useEffect(() => {
    document.title = "KKTC Televizyon Kanalları Ayarlama Rehberi | Zorlu Digital Plaza";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Kuzey Kıbrıs'ta televizyon kanalları nasıl ayarlanır? Türksat 4A frekansları, KKTC yerel kanal frekansları, TKGS otomatik güncelleme ve sinyal sorunlarının çözümü.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "Kuzey Kıbrıs'ta Televizyon Kanalları Nasıl Ayarlanır?",
        description: "Türksat 4A ve KKTC yerel kanal frekansları ile televizyon kanal ayarlama rehberi.",
        step: [
          { "@type": "HowToStep", name: "Kablo kontrolü yapın", text: "Uydu kablosunun televizyona tam sıkılmış olduğunu kontrol edin." },
          { "@type": "HowToStep", name: "Uydu sistemini belirleyin", text: "Merkezi mi bireysel çanak mı kullandığınızı belirleyin." },
          { "@type": "HowToStep", name: "TKGS veya Manuel arama yapın", text: "TKGS varsa otomatik güncelleme, yoksa Türksat frekansı ile şebeke arama yapın." },
          { "@type": "HowToStep", name: "KKTC kanallarını ekleyin", text: "12610 MHz frekansını girerek BRT, Genç TV gibi yerel kanalları bulun." },
        ],
      })}} />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="KKTC televizyon kanal ayarlama" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="container relative z-10 py-16 md:py-24 lg:py-32">
          <motion.div initial="hidden" animate="visible" className="max-w-2xl text-primary-foreground">
            <motion.span variants={fadeUp} custom={0} className="inline-block px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold mb-4">
              📡 KKTC Rehber
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1} className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Kuzey Kıbrıs'ta Televizyon Kanalları{" "}
              <span className="text-accent">Nasıl Ayarlanır?</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-base md:text-lg text-primary-foreground/80 mb-6 leading-relaxed">
              Türksat 4A frekansları, KKTC yerel kanal ayarları, TKGS otomatik güncelleme ve sinyal sorunlarının çözümü — adım adım rehber.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
              <Button size="lg" className="font-semibold" asChild>
                <a href="#servis-talebi"><Wrench className="mr-2 h-4 w-4" /> Biz Sizin İçin Yapalım</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                <a href="#rehber"><ArrowRight className="mr-2 h-4 w-4" /> Rehberi Oku</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ TRUST BAR ═══════════ */}
      <section className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Satellite, label: "Güncel Frekanslar", desc: "2024/2025 Türksat 4A" },
              { icon: RefreshCw, label: "TKGS Desteği", desc: "Otomatik kanal güncelleme" },
              { icon: Wrench, label: "Profesyonel Kurulum", desc: "15-30 dk yerinde hizmet" },
              { icon: Signal, label: "Sinyal Çözümleri", desc: "Sorun giderme rehberi" },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="flex items-center gap-3 p-3 rounded-lg">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT ═══════════ */}
      <div id="rehber" className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Giriş */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-muted-foreground leading-relaxed">
              Yeni bir eve taşındınız, televizyonu açtınız ama ekranda hiçbir kanal yok mu? Lefkoşa veya Girne'de yeni bir eve yerleşen birçok kişi aynı durumla karşılaşıyor. Özellikle rüzgârlı havalarda ya da uydu güncellemeleri sonrası televizyonlarda <strong className="text-foreground">"Sinyal Yok"</strong> uyarısı görmek oldukça yaygındır.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Frekansları birer adres gibi düşünebilirsiniz. Yayıncılar frekans değiştirirse televizyonunuzun bu yeni adresi öğrenmesi gerekir. Bu rehberde güncel <strong className="text-foreground">Türksat ve KKTC kanal frekansları</strong> ile kanalları nasıl kolayca ayarlayabileceğinizi adım adım anlatıyoruz.
            </p>
          </motion.section>

          {/* ───── 3 Kontrol ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="h-6 w-6 text-primary" />
              Kuruluma Başlamadan Önce 3 Kontrol
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Televizyon menüsünden ayar yapmadan önce arka tarafta küçük bir kontrol yapmanız gerekir. Çünkü "Sinyal Yok" hatalarının büyük kısmı yazılımsal değil, <strong className="text-foreground">kablo bağlantısından</strong> kaynaklanır.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-primary/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Satellite className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Merkezi Uydu Sistemi</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Apartmanlarda yaygındır</li>
                    <li>• Kablo duvardaki prizden gelir</li>
                    <li>• Çatıdaki ortak çanak anten kullanılır</li>
                    <li>• Bazen DiSEqC ayarı gerekebilir</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-accent/20">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Radio className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Bireysel Çanak Anten</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Balkon veya pencere yanında</li>
                    <li>• Kablo direkt çanaktan TV'ye gelir</li>
                    <li>• Yön ayarı daha kolay kontrol edilir</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4 bg-primary/5 border-primary/10">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">✅ Hızlı Kontrol Listesi</h3>
                <ul className="space-y-2">
                  {[
                    "Uydu kablosu televizyona tam sıkılmış mı?",
                    "Kablo pencere veya kapı arasında ezilmiş mi?",
                    "Merkezi sistem mi yoksa bireysel çanak mı kullanıyorsunuz?",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── TKGS ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <RefreshCw className="h-6 w-6 text-primary" />
              TKGS ile Otomatik Kanal Güncelleme
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Yeni nesil televizyonlarda bulunan <strong className="text-foreground">TKGS sistemi</strong>, kanal sıralamasını otomatik olarak yapan akıllı bir özelliktir. Kanallar otomatik sıralanır, frekans değişince liste kendini günceller.
            </p>
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">TKGS Kanal Güncelleme Adımları</h3>
                <ol className="space-y-3">
                  {TKGS_STEPS.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Yaklaşık 1-2 dakika içinde tüm kanal listeniz güncellenecektir.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── Türksat 4A ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Türksat 4A Manuel Kanal Arama
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              TKGS olmayan cihazlarda tüm kanalları bulmanın en kolay yolu <strong className="text-foreground">Network Search (Şebeke Arama)</strong> özelliğini kullanmaktır. Tek bir ana frekans girilir ve televizyon diğer frekansları otomatik olarak tarar.
            </p>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">📡 Türksat 4A Ana Arama Frekansı</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(FREQ_TURKSAT).map(([key, val]) => (
                    <div key={key} className="text-center p-3 bg-card rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground capitalize">{key === "freq" ? "Frekans" : key === "pol" ? "Polarizasyon" : "Symbol Rate"}</p>
                      <p className="font-bold text-foreground text-sm mt-1">{val}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  ⚠️ Network Search / Şebeke Arama seçeneğinin <strong>Açık (On)</strong> olduğundan emin olun.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── KKTC Yerel ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={4}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Tv className="h-6 w-6 text-accent" />
              KKTC Yerel Kanalları (BRT, Genç TV vb.)
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Genel arama yaptıktan sonra BRT 1, Genç TV veya Kanal T görünmüyorsa KKTC yayın frekansını <strong className="text-foreground">manuel olarak</strong> eklemeniz gerekir.
            </p>
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-3">🇨🇾 KKTC Kanal Frekansı</h3>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(FREQ_KKTC).map(([key, val]) => (
                    <div key={key} className="text-center p-3 bg-card rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground capitalize">{key === "freq" ? "Frekans" : key === "pol" ? "Polarizasyon" : "Symbol Rate"}</p>
                      <p className="font-bold text-foreground text-sm mt-1">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["BRT 1 HD", "Genç TV", "Kanal T", "Kıbrıs TV"].map(ch => (
                    <span key={ch} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">{ch}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── Sinyal Yok ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={5}>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              "Sinyal Yok" Hatası Nasıl Çözülür?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Sinyal gücü yüksek ama kalite düşükse</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Çanak anten rüzgarda yön değiştirmiş olabilir</li>
                    <li>• Antenin önünü ağaç veya bina kapatmış olabilir</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Sinyal gücü de düşükse</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Uydu kablosu gevşemiş olabilir</li>
                    <li>• LNB arızalı olabilir</li>
                    <li>• Kablo hasar görmüş olabilir</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Card className="mt-4 bg-muted/50">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">🔧 Yapabileceğiniz Kontroller</h3>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {[
                    "Uydu kablosunu tekrar sıkın",
                    "Antenin önünü kapatan engel var mı kontrol edin",
                    "Kabloda çatlama veya ezilme olup olmadığına bakın",
                    "Yoğun yağmur veya fırtına varsa bekleyin",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── DVB-T2 ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={6}>
            <Card className="border-muted">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" /> Alternatif: Karasal Yayın (DVB-T2)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Uydu sisteminde sorun varsa basit bir anten ile <strong className="text-foreground">BRT HD</strong> ve bazı yerel kanalları DVB-T2 karasal yayın üzerinden izleyebilirsiniz.
                </p>
              </CardContent>
            </Card>
          </motion.section>

          {/* ───── Son Tavsiyeler ───── */}
          <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={7}>
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="p-5">
                <h3 className="font-semibold text-foreground mb-2">💡 Kesintisiz TV Keyfi İçin Son Tavsiyeler</h3>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>• Şifreli veya kullanmadığınız kanalları silerek listenizi düzenleyin</li>
                  <li>• Kuzey Kıbrıs'ta yoğun güneş uydu kablolarını zamanla çatlatabilir — yılda birkaç kez kontrol edin</li>
                  <li>• Doğru frekans ayarları ve sağlam bağlantılarla sorunsuz TV keyfi yaşayabilirsiniz</li>
                </ul>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </div>

      {/* ═══════════ CTA — SERVİS TALEBİ ═══════════ */}
      <section id="servis-talebi" className="bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
        <div className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-extrabold mb-4">
                Televizyon Kurulumu ile Uğraşmak İstemiyor musunuz?
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-primary-foreground/80 text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                Uydu ayarları bazen göründüğünden daha karmaşık olabilir. Eğer hâlâ "Sinyal Yok" uyarısı alıyorsanız veya uğraşmak istemiyorsanız, <strong>biz sizin için hızlıca kurulum yapabiliriz.</strong>
              </motion.p>
              <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">
                {SERVICE_LIST.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-left text-sm text-primary-foreground/90">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                    <span>{s}</span>
                  </div>
                ))}
              </motion.div>
              <motion.p variants={fadeUp} custom={3} className="text-sm text-primary-foreground/70 mb-6">
                Kurulum işlemi genellikle <strong className="text-primary-foreground">15–30 dakika</strong> içinde tamamlanır.
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" variant="secondary" className="font-semibold text-base w-full sm:w-auto" asChild>
                  <a href="https://servis.zorluplus.com/" target="_blank" rel="noopener noreferrer">
                    <Wrench className="mr-2 h-5 w-5" /> Servis Talebi Oluştur
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="font-semibold text-base w-full sm:w-auto bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20" asChild>
                  <a
                    href={`https://api.whatsapp.com/send/?phone=905488783131&text=${encodeURIComponent("Merhaba, televizyon kanal ayarlama hizmeti almak istiyorum.")}&type=phone_number&app_absent=0`}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("tv-kanal-ayarlama-cta")}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp ile Ulaşın
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="bg-muted/30">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Sıkça Sorulan Sorular</h2>
            <p className="text-muted-foreground text-center mb-8">Televizyon kanal ayarlama hakkında merak edilenler</p>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-4">
                  <AccordionTrigger className="text-left text-sm font-medium">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FAQPage JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      })}} />
    </div>
  );
}
