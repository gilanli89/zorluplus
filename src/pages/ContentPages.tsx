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
      <h2>Biz Kimiz</h2>
      <p>Web sitemizin adresi: <strong>https://zorluplus.com</strong></p>

      <h2>Hangi Kişisel Verileri Topluyoruz ve Neden</h2>

      <h3>Yorumlar</h3>
      <p>Ziyaretçiler sitede yorum bıraktığında, yorum formundaki verilerin yanı sıra spam tespitine yardımcı olmak amacıyla ziyaretçinin IP adresi ve tarayıcı kullanıcı aracı dizesi de toplanır.</p>
      <p>E-posta adresinizden oluşturulan anonimleştirilmiş bir dize (hash olarak da bilinir), Gravatar hizmetine sağlanabilir. Yorumunuz onaylandıktan sonra profil resminiz yorum bağlamında herkese görünür hale gelir.</p>

      <h3>Medya</h3>
      <p>Web sitesine görsel yüklüyorsanız, konum verileri (EXIF GPS) gömülmüş görseller yüklemekten kaçınmalısınız. Web sitesi ziyaretçileri görsellerdeki konum verilerini indirebilir ve çıkarabilir.</p>

      <h3>Çerezler</h3>
      <p>Sitemizde yorum bırakırsanız adınızı, e-posta adresinizi ve web sitenizi çerezlere kaydetmeyi tercih edebilirsiniz. Bunlar bir yıl sürer. Giriş yaptığınızda, giriş bilgilerinizi kaydetmek için çerezler ayarlanır. Giriş çerezleri iki gün, ekran seçenekleri çerezleri bir yıl sürer.</p>

      <h3>Diğer Sitelerden Gömülü İçerik</h3>
      <p>Bu sitedeki makaleler gömülü içerik (videolar, görseller, makaleler vb.) içerebilir. Diğer web sitelerinden gömülü içerik, ziyaretçinin o web sitesini ziyaret etmiş olmasıyla aynı şekilde davranır.</p>

      <h2>Verilerinizi Kimlerle Paylaşıyoruz</h2>
      <p>Parola sıfırlama talebinde bulunursanız IP adresiniz sıfırlama e-postasına dahil edilecektir.</p>

      <h2>Verilerinizi Ne Kadar Süre Saklıyoruz</h2>
      <p>Yorum bırakırsanız, yorum ve meta verileri süresiz olarak saklanır. Bu, takip yorumlarını moderasyon kuyruğunda tutmak yerine otomatik olarak tanıyıp onaylamamız içindir.</p>
      <p>Web sitemize kayıt olan kullanıcılar için, kullanıcı profillerinde sağladıkları kişisel bilgileri de saklarız. Tüm kullanıcılar kişisel bilgilerini istedikleri zaman görebilir, düzenleyebilir veya silebilir.</p>

      <h2>Verileriniz Üzerindeki Haklarınız</h2>
      <p>Bu sitede bir hesabınız varsa veya yorum bıraktıysanız, sizin hakkınızda tuttuğumuz kişisel verilerin dışa aktarılmış bir dosyasını talep edebilirsiniz. Ayrıca hakkınızda tuttuğumuz tüm kişisel verileri silmemizi talep edebilirsiniz. Bu, idari, yasal veya güvenlik amaçlarıyla saklamak zorunda olduğumuz verileri kapsamaz.</p>

      <h2>Verilerinizi Nereye Gönderiyoruz</h2>
      <p>Ziyaretçi yorumları otomatik bir spam tespit hizmeti aracılığıyla kontrol edilebilir.</p>
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
