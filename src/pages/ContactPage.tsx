import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { BRAND, BRANCHES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/tracking";
import QuoteForm from "@/components/QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-6">
      <h1 className="heading-2 mb-6 text-foreground pulse-heading">{t("contact.title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col gap-4 mb-8">
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary pulse-icon"><Phone className="h-5 w-5" /></div>
              <div><p className="text-sm text-muted-foreground">{t("contact.phone")}</p><p className="font-semibold">{BRAND.phoneDisplay}</p></div>
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><Mail className="h-5 w-5" /></div>
              <div><p className="text-sm text-muted-foreground">{t("contact.email")}</p><p className="font-semibold">{BRAND.email}</p></div>
            </a>
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact_page")} className="flex items-center gap-3 text-foreground hover:text-success transition-colors">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10 text-success"><MessageCircle className="h-5 w-5" /></div>
              <div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-semibold">{BRAND.phoneDisplay}</p></div>
            </a>
          </div>

          {BRANCHES.map(b => (
            <div key={b.id} className="mb-4 flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.address}</p>
                <p className="text-sm text-muted-foreground">{b.hours}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="font-display font-bold text-lg text-foreground mb-4">{t("contact.getQuote")}</h2>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
