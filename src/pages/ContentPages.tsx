import { useState, useEffect, useRef } from "react";
import ContentPage from "@/components/ContentPage";
import { motion } from "framer-motion";
import { Users, Clock, Star, Truck, ShieldCheck, HeartHandshake, MapPin } from "lucide-react";

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
        <div className="container relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <motion.span
              className="inline-block font-semibold text-sm tracking-wider uppercase mb-3"
              animate={{ color: ["rgba(255,255,255,0.6)", "rgba(255,255,255,1)", "rgba(255,255,255,0.6)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              1999'dan beri
            </motion.span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-8">
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
            <div className="flex flex-wrap gap-6 md:gap-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                >
                  <motion.div
                    className="h-12 w-12 rounded-xl flex items-center justify-center"
                    animate={{
                      backgroundColor: ["rgba(255,255,255,0.15)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0.15)"],
                      boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <s.icon className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="font-display text-2xl font-extrabold"
                      animate={{ color: ["hsl(0,0%,100%)", "hsl(210,100%,85%)", "hsl(0,0%,100%)"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      {s.value}
                    </motion.p>
                    <p className="text-primary-foreground/70 text-sm">{s.label}</p>
                  </div>
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
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Kaliteli Ürünlere Olan İnancımız</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Ücretsiz Teslimat", desc: "5000 TL ve üzeri alışverişlerde" },
              { icon: Star, title: "100% Memnuniyet", desc: "Para iade garantisi" },
              { icon: HeartHandshake, title: "7/24 Destek", desc: "Kesintisiz hizmet" },
              { icon: ShieldCheck, title: "Güvenli Ödeme", desc: "100% güvenli ödeme seçenekleri" },
            ].map(item => (
              <div key={item.title} className="card-lift rounded-2xl border border-border bg-card p-6 text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">Müşterilerimiz Ne Diyor?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}

export function KunyePage() {
  return (
    <ContentPage title="Künye">
      <p><strong>Ticari Ünvan:</strong> Zorlu Digital Plaza</p>
      <p><strong>Adres:</strong> Lefkoşa, KKTC</p>
      <p><strong>Telefon:</strong> +90 548 878 31 31</p>
      <p><strong>E-posta:</strong> info@zorluplus.com</p>
    </ContentPage>
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
    <ContentPage title="Ekibimiz">
      <p>Zorlu Digital Plaza ailesi, alanında uzman satış danışmanları ve teknik servis ekibinden oluşmaktadır. Müşteri memnuniyetini ön planda tutan ekibimiz, size en doğru ürünü seçmenizde yardımcı olur.</p>
      <div className="not-prose mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {team.map((m) => (
          <div key={m.name} className="flex flex-col items-center text-center p-4 rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors">
            <img src={m.photo} alt={m.name} className="w-24 h-28 object-cover rounded-lg mb-3" loading="lazy" />
            <p className="font-display font-bold text-sm text-foreground leading-tight">{m.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
          </div>
        ))}
      </div>
    </ContentPage>
  );
}

export function DestekPage() {
  return (
    <ContentPage title="Destek">
      <p>Ürünlerinizle ilgili teknik destek ve servis talepleriniz için bizimle iletişime geçebilirsiniz.</p>
      <h2>Sıkça Sorulan Sorular</h2>
      <ul>
        <li>Garanti süresi tüm ürünlerde 2 yıldır.</li>
        <li>Montaj hizmeti beyaz eşya ve klima ürünlerinde ücretsizdir.</li>
        <li>Sipariş takibi için WhatsApp hattımızı kullanabilirsiniz.</li>
      </ul>
    </ContentPage>
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
    <ContentPage title="İade Politikası">
      <p className="text-sm text-muted-foreground mb-6">Son güncelleme tarihi: 23.12.2025</p>
      <p>Bu İade Politikası, Zorlu Digital Plaza ("Şirket", "biz", "bize", "bizim") üzerinden satın alınan ürünler için geçerli iade, değişim ve iptal şartlarını açıklamaktadır. Müşteri memnuniyeti bizim için önceliklidir ve tüm süreçlerin açık, güvenilir ve kolay anlaşılır olmasına özen gösteririz.</p>

      <h2>1. Genel İade Koşulları</h2>
      <ul>
        <li>İade talebi, ürün teslim alındıktan sonra <strong>7 gün</strong> içinde yapılmalıdır.</li>
        <li>Ürün kullanılmamış, orijinal ambalajında, eksiksiz ve yeniden satılabilir durumda olmalıdır.</li>
        <li>Fatura veya dijital satın alma belgesinin ibrazı zorunludur.</li>
        <li>Ürün ve ambalajında kullanıcı kaynaklı hasar / çizik / kırık bulunursa iade kabul edilmeyecektir.</li>
      </ul>

      <h2>2. İade Edilemeyen Ürünler</h2>
      <p>Aşağıdaki ürünlerde, mevzuat gereği iade yapılamaz veya sadece arıza/defect durumunda iade alınabilir:</p>
      <ul>
        <li>Kulak içi kulaklıklar gibi hijyen gerektiren ürünler (paketi açılmışsa)</li>
        <li>Yazılım, oyun, dijital lisans, aktivasyon kodları</li>
        <li>Kurulumu yapılmış büyük beyaz eşyalar (buzdolabı, çamaşır makinesi vb.) kurulum sonrası memnuniyetsizlik gerekçesiyle iade edilemez</li>
        <li>Özel siparişle getirilen veya müşteri talebine göre özelleştirilmiş ürünler</li>
      </ul>
      <p>Bu tip ürünlerde yalnızca üretim kaynaklı arızalar garanti kapsamında değerlendirilir.</p>

      <h2>3. Arızalı / Ayıplı Ürün İadesi</h2>
      <p><strong>Teslimat sırasında fark edilen hasarlar için:</strong></p>
      <ul>
        <li>Teslimatta ürünü kontrol ediniz.</li>
        <li>Hasar varsa tutanak tutturmadan teslim almayınız.</li>
      </ul>
      <p><strong>Teslim sonrası fark edilen üretim kaynaklı arızalarda:</strong></p>
      <ul>
        <li>Ürün, teknik servis kontrolünden geçirilir.</li>
        <li>Teknik servisin "ayıplı ürün" raporu düzenlemesi hâlinde iade veya değişim yapılır.</li>
        <li>Servis raporu olmadan arızalı ürün iadesi kabul edilmez.</li>
      </ul>

      <h2>4. Değişim Koşulları</h2>
      <p>Müşteri memnuniyeti kapsamında:</p>
      <ul>
        <li>Stoklarda bulunması kaydıyla ürün değişimi yapılabilir.</li>
        <li>Ürün fiyat farkı oluşursa müşteri tarafından ödenir veya müşteriye iade edilir.</li>
        <li>Değişim başvurusu da teslimden itibaren <strong>7 gün</strong> içinde yapılmalıdır.</li>
      </ul>

      <h2>5. İade Süreci</h2>
      <p>İade talebinizi müşteri hizmetlerimize iletiniz:</p>
      <ul>
        <li><strong>Telefon:</strong> +90 548 878 31 31</li>
        <li><strong>E-posta:</strong> info@zorluplus.com</li>
      </ul>
      <p>Ürün tarafımıza ulaştıktan sonra ortalama <strong>7 iş günü</strong> içinde incelenir. İade talebi onaylandığında, ödeme aynı yöntemle müşteriye iade edilir.</p>

      <h2>6. Kargo ve Ücretlendirme</h2>
      <ul>
        <li>Arızalı/defolu ürünlerde iade kargo ücreti Şirket tarafından karşılanır.</li>
        <li>Müşteri memnuniyeti veya kişisel tercih nedeniyle yapılan iadelerde kargo ücreti müşteriye aittir.</li>
        <li>Kargo gönderiminde ürünün hasar görmeyecek şekilde paketlenmesi müşterinin sorumluluğundadır.</li>
      </ul>

      <h2>7. Kurulum Gerektiren Ürünler</h2>
      <p>Beyaz eşya, klima, televizyon ve benzeri ürünlerde:</p>
      <ul>
        <li>Yetkili servis kurulum yapmadan kutu açılmamalıdır.</li>
        <li>Yetkisiz müdahaleler garanti kapsamını geçersiz kılabilir.</li>
        <li>Kurulum sonrası ortaya çıkan memnuniyetsizlikler iade kapsamına girmez.</li>
      </ul>

      <h2>8. İptal Koşulları</h2>
      <ul>
        <li>Sipariş kargoya verilmeden önce iptal talebi alınabilir.</li>
        <li>Kargoya verilen siparişler için iade süreci uygulanır.</li>
      </ul>

      <h2>9. İade Bedelinin Ödenmesi</h2>
      <ul>
        <li>Ödeme iadesi, banka veya ödeme sağlayıcısına bağlı olarak <strong>10 iş günü</strong> sürebilir.</li>
        <li>Kapıda ödeme iadeleri, banka hesabına yapılır.</li>
      </ul>
    </ContentPage>
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
    <ContentPage title="Sipariş Takip">
      <p>Siparişlerinizi takip etmek için WhatsApp hattımızdan bizimle iletişime geçebilirsiniz.</p>
      <p><strong>WhatsApp:</strong> +90 548 878 31 31</p>
    </ContentPage>
  );
}

export function OdemeYontemleriPage() {
  return (
    <ContentPage title="Ödeme Yöntemleri">
      <h2>Kabul Edilen Ödeme Yöntemleri</h2>
      <ul>
        <li>Nakit</li>
        <li>Kredi Kartı / Banka Kartı</li>
        <li>Havale / EFT</li>
        <li>Taksitli Ödeme</li>
      </ul>
      <p>Detaylı bilgi için mağazamızı ziyaret edebilir veya bizi arayabilirsiniz.</p>
    </ContentPage>
  );
}
