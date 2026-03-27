import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Grid3X3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PremiumIcon from "@/components/PremiumIcon";

const NotFound = () => {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container max-w-lg text-center relative z-10">
        {/* Floating 404 number */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <span className="text-[120px] sm:text-[160px] font-extrabold leading-none bg-gradient-to-br from-primary via-primary/60 to-accent bg-clip-text text-transparent select-none drop-shadow-[0_4px_24px_hsl(var(--primary)/0.3)]">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="heading-2 text-foreground mb-3">
            {t("notFound.title") || "Sayfa Bulunamadı"}
          </h1>
          <p className="text-muted-foreground body mb-8">
            {t("notFound.desc") || "Aradığınız sayfa mevcut değil veya taşınmış olabilir."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/">
            <Button size="lg" className="rounded-full gap-2 pulse-btn tap-scale w-full sm:w-auto">
              <Home className="w-4 h-4 drop-shadow-[0_1px_2px_hsl(var(--primary-foreground)/0.3)]" />
              {t("general.homePage")}
            </Button>
          </Link>
          <Link to="/kategoriler">
            <Button size="lg" variant="outline" className="rounded-full gap-2 tap-scale w-full sm:w-auto">
              <Grid3X3 className="w-4 h-4 drop-shadow-[0_1px_2px_hsl(var(--primary)/0.3)]" />
              {t("nav.categories")}
            </Button>
          </Link>
        </motion.div>

        {/* Countdown */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-muted-foreground mt-8"
        >
          {countdown > 0 && (
            <>
              {t("notFound.redirect") || "Ana sayfaya yönlendiriliyorsunuz..."}{" "}
              <span className="font-mono font-bold text-primary">{countdown}s</span>
            </>
          )}
        </motion.p>
      </div>
    </div>
  );
};

export default NotFound;
