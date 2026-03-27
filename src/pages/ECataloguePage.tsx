import { Button } from "@/components/ui/button";
import { CATALOGUE_URL, CATEGORIES } from "@/lib/constants";
import { Link } from "react-router-dom";
import { Maximize2, Loader2, AlertTriangle } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ECataloguePage() {
  const { t } = useLanguage();
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className={fullscreen ? "fixed inset-0 z-[100] bg-background" : ""}>
      <div className={fullscreen ? "h-full flex flex-col" : "container py-6"}>
        {!fullscreen && (
          <h1 className="heading-2 mb-4 text-foreground pulse-heading">{t("ecatalogue.title")}</h1>
        )}
        <div className={`relative ${fullscreen ? "flex-1" : "aspect-[3/4] md:aspect-video"} rounded-xl overflow-hidden border border-border bg-card`}>
          {!iframeLoaded && !iframeError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-card">
              <PremiumIconInline icon={Loader2} size={32} className="animate-spin" />
              <p className="text-sm text-muted-foreground font-medium">
                {t("ecatalogue.loading") || "Katalog yükleniyor..."}
              </p>
            </div>
          )}
          {iframeError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 bg-card">
              <PremiumIconInline icon={AlertTriangle} size={32} className="text-destructive" />
              <p className="text-sm text-muted-foreground font-medium">
                {t("ecatalogue.error") || "Katalog yüklenemedi. Lütfen tekrar deneyin."}
              </p>
              <Button variant="outline" size="sm" onClick={() => { setIframeError(false); setIframeLoaded(false); }}>
                {t("general.retry") || "Tekrar Dene"}
              </Button>
            </div>
          )}
          <iframe
            src={CATALOGUE_URL}
            className={`w-full h-full transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
            allowFullScreen
            title="Zorlu Digital Plaza E-Katalog"
            onLoad={() => setIframeLoaded(true)}
            onError={() => setIframeError(true)}
          />
          <Button size="icon" variant="secondary" className="absolute top-3 right-3 z-10" onClick={() => setFullscreen(!fullscreen)}>
            <PremiumIconInline icon={Maximize2} size={16} />
          </Button>
        </div>
        {!fullscreen && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("ecatalogue.browseProducts")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {CATEGORIES.map(cat => {
                const catName = t(`cat.${cat.slug}`) !== `cat.${cat.slug}` ? t(`cat.${cat.slug}`) : cat.name;
                return (
                  <Link key={cat.slug} to={`/kategori/${cat.slug}`} className="rounded-xl border border-border bg-card p-4 text-center hover:shadow-md transition-shadow">
                    <span className="text-sm font-semibold text-foreground">{catName}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
