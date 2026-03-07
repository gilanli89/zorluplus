import { BRANCHES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BranchesPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2 text-foreground">{t("branches.title")}</h1>
      <p className="text-muted-foreground mb-8">{t("branches.subtitle")}</p>

      <div className="grid gap-8">
        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
          >
            <div className="aspect-video md:aspect-[21/9]">
              <iframe
                src={b.mapEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={b.name}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">{b.name}</h2>
              <div className="flex flex-col gap-2.5 text-sm text-muted-foreground mb-5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  {b.address}
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <span>{b.phone}{b.phone2 ? ` / ${b.phone2}` : ""}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  {b.hours}
                </div>
              </div>
              <div className="flex gap-3">
                <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 rounded-full"><MapPin className="h-4 w-4" /> {t("branches.getDirections")}</Button>
                </a>
                <a href={`tel:${b.phone}`}>
                  <Button variant="outline" className="gap-2 rounded-full"><Phone className="h-4 w-4" /> {t("branches.call")}</Button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
