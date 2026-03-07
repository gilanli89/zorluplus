import { BRANCHES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BranchesPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="heading-2 mb-2 text-foreground pulse-heading">{t("branches.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("branches.subtitle")}</p>

      <div className="grid gap-10">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-md"
          >
            {/* Map with Google Maps badge */}
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src={b.mapEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={b.name}
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Google Maps badge */}
              <a
                href={b.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg hover:shadow-xl transition-shadow z-10"
              >
                <img
                  src="https://maps.google.com/mapfiles/api-3/images/google_gray.svg"
                  alt="Google Maps"
                  className="h-4 w-auto"
                />
                <span className="text-xs font-semibold text-gray-700">Maps</span>
              </a>
            </div>
            <div className="p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">{b.name}</h2>
              <div className="flex flex-col gap-3.5 text-base text-muted-foreground mb-7">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                  {b.address}
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  <span>{b.phone}{b.phone2 ? ` / ${b.phone2}` : ""}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
                  {b.hours}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 rounded-full text-base"><MapPin className="h-5 w-5" /> {t("branches.getDirections")}</Button>
                </a>
                <a href={`tel:${b.phone}`}>
                  <Button size="lg" variant="outline" className="gap-2 rounded-full text-base"><Phone className="h-5 w-5" /> {t("branches.call")}</Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
