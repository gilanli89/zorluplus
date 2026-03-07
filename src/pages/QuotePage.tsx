import QuoteForm from "@/components/QuoteForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function QuotePage() {
  const { t } = useLanguage();
  return (
    <div className="container py-6 max-w-lg">
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">{t("quote.title")}</h1>
      <p className="text-muted-foreground mb-6">{t("quote.subtitle")}</p>
      <div className="rounded-xl border border-border bg-card p-6">
        <QuoteForm />
      </div>
    </div>
  );
}
