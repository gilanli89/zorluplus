import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";
import { useLanguage } from "@/contexts/LanguageContext";

const LINKTREE_URL = "https://linktr.ee/zorludigitalplaza";

export default function FloatingLinktree() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6 flex flex-col items-end gap-2">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-2xl shadow-xl p-4 w-64 mb-1"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-bold text-foreground">{t("floating.contactUs")}</p>
              <button onClick={() => setShowTooltip(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {t("floating.contactDesc")}
            </p>
            <a
              href={LINKTREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("floating_linktree")}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {t("floating.openChannels")}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(prev => !prev)}
        className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
        aria-label={t("floating.openChannels")}
      >
        <AnimatePresence mode="wait">
          {showTooltip ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
