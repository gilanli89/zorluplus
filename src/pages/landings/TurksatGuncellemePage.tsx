import { useState } from "react";
import { MessageCircle, ShieldCheck, Zap, Wrench, Phone, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

const CITIES = ["Lefkoşa", "Girne", "Güzelyurt", "Mağusa", "İskele"];
const BRANDS = ["Samsung", "LG", "Toshiba", "TCL"];

export default function TurksatGuncellemePage() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [tvBrand, setTvBrand] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = name.trim().length > 1 && city && tvBrand;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    const text = `Merhaba, ben ${name.trim()}. ${city}'dayım. ${tvBrand} marka TV'mde Türksat uydu ayarları bozuldu, express kurulum/güncelleme için yardım istiyorum.`;
    window.open(
      `https://api.whatsapp.com/send?phone=905488783131&text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-6 text-center text-white">
        <div className="text-2xl font-extrabold uppercase tracking-tight md:text-3xl">Zorlu</div>
        <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.35em] text-blue-100 md:text-xs">
          digital plaza
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-medium tracking-wide text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            Zorlu Digital Plaza Güvencesiyle
          </div>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight md:text-5xl">
            Türksat Uydunuz mu Bozuldu?
          </h1>
          <p className="mt-3 text-lg text-blue-700 md:text-xl">
            Üzülmeyin! İşi uzmanına bırakın.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Samsung, LG, Toshiba ve TCL televizyonlarınızda bozulan Türksat uydu
            ayarlarını düzeltmek için express kurulum hizmeti. KKTC genelinde hızlı,
            garantili ve profesyonel çözüm.
          </p>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, title: "Express Kurulum", desc: "Aynı gün hızlı müdahale" },
            { icon: Wrench, title: "Uzman Teknisyen", desc: "Yetkili servis deneyimi" },
            { icon: ShieldCheck, title: "Garantili Hizmet", desc: "Zorlu Digital Plaza kalitesi" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <f.icon className="h-6 w-6 text-blue-600" />
              <h2 className="mt-3 text-base font-semibold">{f.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-900/5 md:p-8">
          <h2 className="text-xl font-bold md:text-2xl">Hemen Randevu Alın</h2>
          <p className="mt-1 text-sm text-slate-600">
            Bilgilerinizi girin, WhatsApp üzerinden sohbet anında başlasın.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
                Adınız Soyadınız
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn. Ali Yılmaz"
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-slate-700">
                Şehir
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Seçiniz</option>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="mb-1.5 block text-sm font-medium text-slate-700">
                TV Markası
              </label>
              <select
                id="brand"
                value={tvBrand}
                onChange={(e) => setTvBrand(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Seçiniz</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              {touched && !valid && (
                <p className="mb-3 text-sm text-red-600">Lütfen ad, şehir ve TV markasını doldurun.</p>
              )}
              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-lg font-bold text-white shadow-2xl transition-colors hover:bg-[#1ebe57] active:bg-[#179c47]"
              >
                <MessageCircle className="h-6 w-6" />
                WhatsApp'tan Uzmana Bağlan
              </button>
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
              >
                <Phone className="h-4 w-4" />
                {BRAND.phoneDisplay}
              </a>
            </div>
          </form>
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            "Türksat 4A/5B frekans ve kanal güncellemesi",
            "Uydu anteni yön ve sinyal ayarı",
            "Smart TV uydu kurulumu ve kanal sıralama",
            "Tüm KKTC bölgelerinde yerinde servis",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-blue-50/50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </section>

        <p className="mt-10 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Zorlu Digital Plaza — Türksat Uydu Servisi
        </p>
      </div>
    </div>
  );
}
