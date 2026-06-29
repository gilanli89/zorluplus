import { MessageCircle, MapPin, Phone, Facebook, Instagram, Youtube } from "lucide-react";
import { BRAND, BRANCHES, CATALOGUE_URL } from "@/lib/constants";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Catalog */}
      <section className="w-full">
        <div className="w-full h-[100svh]">
          <iframe
            src={CATALOGUE_URL}
            title="Zorlu Digital Plaza E-Katalog"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Sipariş & Bilgi</h2>
        <p className="text-white/70 mb-6">WhatsApp üzerinden hızlıca bize ulaşın.</p>
        <a
          href={BRAND.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] transition-colors text-white font-semibold px-8 py-4 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
          WhatsApp ile Sipariş Ver
        </a>
        <div className="mt-4 flex items-center justify-center gap-2 text-white/80">
          <Phone className="w-4 h-4" />
          <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="hover:text-white">
            {BRAND.phone}
          </a>
        </div>
      </section>

      {/* Branches with Maps */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Şubelerimiz</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {BRANCHES.map((b) => (
            <div key={b.id} className="bg-white/5 backdrop-blur rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video w-full">
                <iframe
                  src={b.mapEmbed}
                  title={b.name}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{b.name}</h3>
                <p className="text-white/70 text-sm flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  {b.address}
                </p>
                <p className="text-white/70 text-sm flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="hover:text-white">
                    {b.phone}
                  </a>
                  {b.phone2 && (
                    <>
                      <span className="text-white/40">·</span>
                      <a href={`tel:${b.phone2.replace(/\s/g, "")}`} className="hover:text-white">
                        {b.phone2}
                      </a>
                    </>
                  )}
                </p>
                <p className="text-white/50 text-xs">{b.hours}</p>
                <a
                  href={b.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm text-blue-300 hover:text-blue-200"
                >
                  Yol Tarifi Al →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="max-w-5xl mx-auto px-4 pb-16 text-center">
        <h2 className="text-xl font-semibold mb-5">Bizi Takip Edin</h2>
        <div className="flex items-center justify-center gap-4">
          <a
            href={BRAND.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href={BRAND.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={BRAND.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Youtube className="w-5 h-5" />
          </a>
        </div>
        <p className="text-white/40 text-xs mt-8">© {new Date().getFullYear()} Zorlu Digital Plaza</p>
      </section>

      {/* Floating WhatsApp button */}
      <a
        href={BRAND.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe57] shadow-2xl flex items-center justify-center transition-colors"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}