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
  { value: "60,000+", label: "Mutlu Müşteri", icon: Users },
  { value: "26", label: "Gurur Dolu Yıl", icon: Clock },
  { value: "3", label: "Mağaza", icon: MapPin },
];

export function HakkimizdaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground">
        <div className="container py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-primary-foreground/60 font-semibold text-sm tracking-wider uppercase">1999'dan beri</span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mt-3 mb-6">
              Kaliteyi ve Güvenilir<br />Ürünleri Benimsiyoruz
            </h1>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {stats.map(s => (
                <div key={s.label} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-2xl font-extrabold">{s.value}</p>
                    <p className="text-primary-foreground/70 text-sm">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container py-12 md:py-16 space-y-16">
        {/* Hakkımızda */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Hakkımızda</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p><strong className="text-foreground">Zorlu Digital Plaza</strong>, Kuzey Kıbrıs'ta 26 yıllık faaliyet süresi boyunca olağanüstü bir performans sergilemiştir. Yirmi yılı aşkın sürede şirket, teknoloji, elektronik ve müşteri hizmetleri alanlarında güvenilir bir lider olarak kendini başarıyla konumlandırmıştır.</p>
            <p>Sürekli inovasyon, yüksek kaliteli ürün yelpazesi ve güçlü müşteri memnuniyeti odaklı yaklaşımı sayesinde Zorlu Digital Plaza, sektörde sağlam bir itibar kazanmıştır.</p>
          </div>
        </motion.section>

        {/* Biz Kimiz */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Biz Kimiz</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>1999 yılından bu yana Zorlu Digital Plaza, Kuzey Kıbrıs'ta markalı elektronik, beyaz eşya ve klima çözümleri alanında güvenilir bir lider olmuştur.</p>
            <p>Yirmi yılı aşkın deneyimiyle şirket, yalnızca yüksek kaliteli ürünler sunmasıyla değil, aynı zamanda ilk temas anından satış sonrası süreçlere kadar uzanan <strong className="text-foreground">kusursuz müşteri deneyimi</strong> ile de güçlü bir itibar kazanmıştır.</p>
            <p>Zorlu Digital Plaza'nın gücü; uzman satış ekibi, derin sektör bilgisi ve yüksek nitelikli satış sonrası hizmet departmanından gelmektedir.</p>
            <p>Dünya çapında önde gelen markalarla iş ortaklıkları yaparak ve hizmet altyapısına sürekli yatırım yaparak Zorlu Digital Plaza, bölgede <strong className="text-foreground">kalite, güven ve teknoloji mükemmeliyeti</strong> için bir referans noktası hâline gelmiştir.</p>
          </div>
        </motion.section>

        {/* Tarihçe */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">Tarihçemiz</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p>Tek bir mağazadan merkezi bir dağıtım deposuna uzanan yolculuğu boyunca Zorlu Digital Plaza, Kuzey Kıbrıs'ın en güçlü perakende ve lojistik ağlarından birine dönüşmüştür.</p>
            <p>Girne, Lefkoşa ve Mağusa'da bulunan stratejik mağaza lokasyonları sayesinde şirket, her büyük bölgedeki müşterilere ulaşarak markalı elektronik ürünler, beyaz eşya ve iklimlendirme çözümlerini uzun yıllara dayanan uzmanlıkla sunmaktadır.</p>
            <p>Bugün Zorlu Digital Plaza, çok nesilli deneyimi ve güçlü dağıtım ağıyla sektörde yeni standartlar belirleyen; <strong className="text-foreground">güven, kalite ve mükemmeliyetin simgesi</strong> olarak öne çıkmaktadır.</p>
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
  return (
    <ContentPage title="Ekibimiz">
      <p>Zorlu Digital Plaza ailesi, alanında uzman satış danışmanları ve teknik servis ekibinden oluşmaktadır. Müşteri memnuniyetini ön planda tutan ekibimiz, size en doğru ürünü seçmenizde yardımcı olur.</p>
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
      <p>Bu web sitesini kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.</p>
      <h2>Genel</h2>
      <p>Sitedeki tüm içerikler Zorlu Digital Plaza'ya aittir. İzinsiz kopyalanamaz ve çoğaltılamaz.</p>
      <h2>Fiyatlar</h2>
      <p>Sitede yer alan fiyatlar bilgilendirme amaçlıdır ve önceden haber verilmeksizin değiştirilebilir.</p>
    </ContentPage>
  );
}

export function IadeKosullariPage() {
  return (
    <ContentPage title="İade Koşulları">
      <p>Satın aldığınız ürünleri, teslim tarihinden itibaren 14 gün içinde iade edebilirsiniz.</p>
      <h2>İade Şartları</h2>
      <ul>
        <li>Ürün kullanılmamış ve orijinal ambalajında olmalıdır.</li>
        <li>Fatura ve garanti belgesi ile birlikte iade edilmelidir.</li>
        <li>Montajı yapılmış ürünlerde iade kabul edilmemektedir.</li>
      </ul>
    </ContentPage>
  );
}

export function GizlilikPolitikasiPage() {
  return (
    <ContentPage title="Gizlilik Politikası">
      <p>Zorlu Digital Plaza olarak kişisel verilerinizin güvenliği bizim için önemlidir.</p>
      <h2>Toplanan Bilgiler</h2>
      <p>İletişim formları aracılığıyla ad, telefon ve e-posta bilgileriniz toplanmaktadır. Bu bilgiler yalnızca sizinle iletişim kurmak amacıyla kullanılır.</p>
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
