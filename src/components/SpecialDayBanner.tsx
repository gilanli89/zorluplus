import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { getTodaySpecialDay } from "@/lib/specialDays";
import { useLanguage } from "@/contexts/LanguageContext";

export default function SpecialDayBanner() {
  const [dismissed, setDismissed] = useState(false);
  const specialDay = getTodaySpecialDay();
  const { lang } = useLanguage();

  if (!specialDay || dismissed) return null;

  const isMemorial = specialDay.type === "memorial";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`${specialDay.bannerClass} text-white relative overflow-hidden`}
      >
        <div className="container flex items-center justify-center gap-3 py-2 text-xs sm:text-sm font-medium">
          <span className="text-base sm:text-lg">{specialDay.emoji}</span>
          <span className={isMemorial ? "font-semibold" : ""}>
            {lang === "tr" ? specialDay.message : specialDay.messageEn}
          </span>
          <span className="text-base sm:text-lg">{specialDay.emoji}</span>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Kapat"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
