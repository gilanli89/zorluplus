import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "zorlu_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:bottom-4 lg:left-4 lg:right-auto lg:max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl shadow-xl p-5">
            <div className="flex items-start gap-3">
              <Cookie className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground mb-1">Çerez Kullanımı</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Size daha iyi bir deneyim sunmak için çerezler kullanıyoruz.
                  Siteyi kullanmaya devam ederek çerez politikamızı kabul etmiş olursunuz.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" onClick={accept} className="rounded-full text-xs">
                    Kabul Et
                  </Button>
                  <Button size="sm" variant="ghost" onClick={accept} className="rounded-full text-xs">
                    <X className="h-3 w-3 mr-1" /> Kapat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
