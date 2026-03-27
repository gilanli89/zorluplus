import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { BRAND, BRANCHES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/tracking";
import QuoteForm from "@/components/QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";
import PremiumIcon from "@/components/PremiumIcon";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-6">
      <h1 className="heading-2 mb-6 text-foreground pulse-heading">{t("contact.title")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex flex-col gap-4 mb-8">
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <PremiumIcon icon={Phone} size="md" variant="glow" />
              <div><p className="text-sm text-muted-foreground">{t("contact.phone")}</p><p className="font-semibold">{BRAND.phoneDisplay}</p></div>
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
              <PremiumIcon icon={Mail} size="md" variant="glow" />
              <div><p className="text-sm text-muted-foreground">{t("contact.email")}</p><p className="font-semibold">{BRAND.email}</p></div>
            </a>
            <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("contact_page")} className="flex items-center gap-3 text-foreground hover:text-success transition-colors">
              <PremiumIcon icon={MessageCircle} size="md" variant="gradient" containerClassName="[&_.premium-icon-inner]:from-success/15 [&_.premium-icon-inner]:to-success/10 [&_.premium-icon-inner]:border-success/20 [&_svg]:text-success" />
              <div><p className="text-sm text-muted-foreground">WhatsApp</p><p className="font-semibold">{BRAND.phoneDisplay}</p></div>
            </a>
          </div>

          {BRANCHES.map(b => (
            <div key={b.id} className="mb-4 flex items-start gap-3">
              <PremiumIconInline icon={MapPin} size={20} />
              <div>
                <p className="font-semibold text-foreground">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.address}</p>
                <p className="text-sm text-muted-foreground">{b.hours}</p>
              </div>
            </div>
          ))}
        </div>

         <div className="card-premium card-premium-border rounded-xl p-6">
           <h2 className="heading-4 text-foreground mb-4">{t("contact.getQuote")}</h2>
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
