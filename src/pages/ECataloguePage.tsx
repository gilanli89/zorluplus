import { Button } from "@/components/ui/button";
import { CATALOGUE_URL, CATEGORIES } from "@/lib/constants";
import { Link } from "react-router-dom";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ECataloguePage() {
  const { t } = useLanguage();
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className={fullscreen ? "fixed inset-0 z-[100] bg-background" : ""}>
      <div className={fullscreen ? "h-full flex flex-col" : "container py-6"}>
        {!fullscreen && (
          <h1 className="font-display text-2xl font-bold mb-4 text-foreground">{t("ecatalogue.title")}</h1>
        )}
        <div className={`relative ${fullscreen ? "flex-1" : "aspect-[3/4] md:aspect-video"} rounded-xl overflow-hidden border border-border bg-card`}>
          <iframe src={CATALOGUE_URL} className="w-full h-full" allowFullScreen title="Zorlu Digital Plaza E-Katalog" />
          <Button size="icon" variant="secondary" className="absolute top-3 right-3 z-10" onClick={() => setFullscreen(!fullscreen)}>
            <Maximize2 className="h-4 w-4" />
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
