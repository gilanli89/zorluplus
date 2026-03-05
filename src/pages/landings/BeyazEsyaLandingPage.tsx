import {
  Shield, Award, Wrench, Zap, Truck, ThermometerSnowflake,
  Refrigerator, WashingMachine, Droplets, Snowflake,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "beyaz-esya",
  seoTitle: "Beyaz Eşya Fiyatları | Samsung & LG Buzdolabı, Çamaşır Makinesi - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ve LG beyaz eşya modelleri. Buzdolabı, çamaşır makinesi, bulaşık makinesi, kurutma makinesi. 2 yıl garanti, ücretsiz kurulum. Zorlu Digital Plaza.",
  heroBadge: "Samsung & LG Yetkili Bayi",
  heroTitle: "Beyaz Eşyada",
  heroTitleHighlight: "Yetkili Bayi Güvencesi",
  heroDescription: "Samsung ve LG'nin en yeni beyaz eşya modellerini yetkili bayi farkıyla edinin. Ücretsiz kurulum ve 2 yıl garanti dahil.",
  heroGradient: "from-sky-400 via-blue-400 to-indigo-400",
  ctaButtonText: "Ürünleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm beyaz eşyada" },
    { icon: Wrench, label: "Ücretsiz Kurulum", desc: "Profesyonel montaj" },
    { icon: Truck, label: "Ücretsiz Teslimat", desc: "Kıbrıs geneli" },
  ],
  subtypes: [
    { icon: Refrigerator, name: "Buzdolabı", desc: "No-Frost, gardırop tipi ve mini buzdolapları", link: "/kategori/beyaz-esya/buzdolabi" },
    { icon: WashingMachine, name: "Çamaşır Makinesi", desc: "Yüksek devirli, enerji tasarruflu modeller", link: "/kategori/beyaz-esya/camasir-makinesi" },
    { icon: Droplets, name: "Bulaşık Makinesi", desc: "Sessiz çalışma, düşük su tüketimi", link: "/kategori/beyaz-esya/bulasik-makinesi" },
    { icon: Snowflake, name: "Derin Dondurucu", desc: "Sandık ve dikey tip derin dondurucular", link: "/kategori/beyaz-esya/derin-dondurucu" },
  ],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Kurulum", desc: "Beyaz eşyanızı yerine teslim ediyor, profesyonel kurulumunu yapıyoruz." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung & LG yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Enerji Verimli Modeller", desc: "A+++ enerji sınıfı ürünlerle elektrik faturanızı düşürün." },
    { icon: Truck, title: "Eski Ürün Geri Alımı", desc: "Yeni beyaz eşya alımında eski cihazınızı geri alıyoruz." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Beyaz Eşya Almalısınız?",
  benefitsDescription: "Kuzey Kıbrıs'ın en güvenilir Samsung & LG yetkili bayisi olarak, en yeni beyaz eşya modellerini yetkili garanti ve profesyonel kurulum hizmetiyle sunuyoruz.",
  quoteTitle: "Beyaz Eşya Fiyat Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel beyaz eşya teklifimizi sunalım.",
  productsTitle: "Beyaz Eşya Modelleri",
  productsCategoryLink: "/kategori/beyaz-esya",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "beyaz-esya",
  faq: [
    { q: "Beyaz eşya kurulumu ücretsiz mi?", a: "Evet, tüm beyaz eşya alımlarında ücretsiz kurulum hizmetimiz mevcuttur. Profesyonel ekibimiz cihazınızı yerine teslim edip kurar." },
    { q: "Hangi markalar mevcut?", a: "Samsung ve LG yetkili bayisi olarak her iki markanın da en güncel buzdolabı, çamaşır makinesi, bulaşık makinesi ve kurutma makinesi modellerini bulunduruyoruz." },
    { q: "Taksit imkanı var mı?", a: "Evet, kredi kartına taksit seçeneklerimiz mevcuttur. Havale/EFT ile de ödeme yapabilirsiniz." },
    { q: "Eski beyaz eşyamı geri alıyor musunuz?", a: "Evet, yeni beyaz eşya alımlarında eski cihazınızı geri alıyoruz. Detaylı bilgi için bizi arayın." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Beyaz eşya seçimi ve hizmetlerimiz hakkında merak ettikleriniz",
  jsonLdName: "Beyaz Eşya Modelleri - Zorlu Digital Plaza",
};

export default function BeyazEsyaLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
