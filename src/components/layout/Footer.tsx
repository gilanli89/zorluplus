import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { motion } from "framer-motion";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import zorluLogo from "@/assets/zorlu-logo.png";
import zorluDigitalLogo from "@/assets/zorlu-digital-logo.png";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Footer() {
  const { t } = useLanguage();

  const { data: lastUpdate } = useQuery({
    queryKey: ["inventory-last-update"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_public")
        .select("updated_at")
        .not("updated_at", "is", null)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) {
        console.warn("[Footer] updated_at query error:", error.message);
        return null;
      }
      if (!data?.updated_at) return null;
      return new Date(data.updated_at);
    },
    staleTime: 60_000,
    retry: 3,
  });

  const formattedUpdate = lastUpdate
    ? `Son güncelleme: ${lastUpdate.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" })} ${lastUpdate.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}`
    : null;

  const trustBadges = [
    { label: t("trust.authorizedService"), desc: t("trust.authorizedServiceDesc") },
    { label: t("trust.warranty"), desc: t("trust.warrantyDesc") },
    { label: t("trust.freeInstall"), desc: t("trust.freeInstallDesc") },
  ];

  const footerKurumsal = [
    { label: t("footer.imprint"), href: "/kunye" },
    { label: t("footer.about"), href: "/hakkimizda" },
    { label: t("footer.branchesLink"), href: "/subelerimiz" },
    { label: t("footer.team"), href: "/ekibimiz" },
    { label: t("footer.contactLink"), href: "/iletisim" },
  ];

  const footerDestek = [
    { label: t("footer.supportLink"), href: "/destek" },
    { label: t("footer.orderTracking"), href: "/siparis-takip" },
    { label: t("footer.paymentMethods"), href: "/odeme-yontemleri" },
    { label: t("footer.returnPolicy"), href: "/iade-kosullari" },
    { label: t("footer.b2b"), href: "/b2b" },
  ];

  const footerYasal = [
    { label: t("footer.terms"), href: "/kullanim-kosullari" },
    { label: t("footer.privacy"), href: "/gizlilik-politikasi" },
    { label: "KVKK / GDPR", href: "/kvkk" },
    { label: t("footer.cookiePolicy"), href: "/cerez-politikasi" },
    { label: t("footer.distanceSales"), href: "/mesafeli-satis-sozlesmesi" },
    { label: t("footer.sustainability"), href: "/surdurulebilirlik" },
  ];

  return (
    <footer className="border-t border-border bg-card pb-24 lg:pb-8 wave-separator relative">
      <div className="container py-8">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div variants={fadeItem} className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={zorluLogo} alt="Zorlu Digital Plaza" className="h-10 object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.description")}
            </p>
            <div className="flex items-center gap-4">
              <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="opacity-70 hover:opacity-100 transition-opacity icon-hover-rotate">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="opacity-70 hover:opacity-100 transition-opacity icon-hover-rotate">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="opacity-70 hover:opacity-100 transition-opacity icon-hover-rotate">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="opacity-70 hover:opacity-100 transition-opacity icon-hover-rotate">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
            </div>
          </motion.div>

          {/* Kurumsal */}
          <motion.div variants={fadeItem}>
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">{t("footer.corporate")}</h4>
            <nav className="flex flex-col gap-2">
              {footerKurumsal.map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline w-fit">{l.label}</Link>
              ))}
            </nav>
          </motion.div>

          {/* Destek */}
          <motion.div variants={fadeItem}>
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">{t("footer.support")}</h4>
            <nav className="flex flex-col gap-2">
              {footerDestek.map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline w-fit">{l.label}</Link>
              ))}
            </nav>
          </motion.div>

          {/* İletişim */}
          <motion.div variants={fadeItem}>
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <PremiumIconInline icon={Phone} size={16} /> {BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <PremiumIconInline icon={Mail} size={16} /> {BRAND.email}
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              {footerYasal.map(l => (
                <Link key={l.href} to={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Kategori Chips */}
        <motion.div
          className="mt-8 pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h4 className="font-display font-bold text-xs uppercase tracking-wider mb-3 text-muted-foreground">{t("footer.categories")}</h4>
          <div className="flex flex-wrap gap-2">
            {FOOTER_LINKS.kategoriler.map(l => {
              const isExternal = l.href.startsWith('http');
              return isExternal ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-border flex items-center gap-6 relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-card via-card to-card">
          {/* Blockchain circuit animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="blockchain-line blockchain-line-1" />
            <div className="blockchain-line blockchain-line-2" />
            <div className="blockchain-line blockchain-line-3" />
            <div className="blockchain-dot blockchain-dot-1" />
            <div className="blockchain-dot blockchain-dot-2" />
            <div className="blockchain-dot blockchain-dot-3" />
            <div className="blockchain-dot blockchain-dot-4" />
            <div className="blockchain-dot blockchain-dot-5" />
          </div>
          <motion.div className="relative shrink-0 z-10">
            {/* Outer pulse rings */}
            <motion.div
              className="absolute inset-[-12px] rounded-full border-2 border-primary/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-[-24px] rounded-full border border-primary/15"
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.4, 0.15] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            {/* Glow backdrop */}
            <motion.div
              className="absolute inset-[-8px] rounded-2xl bg-primary/5 blur-xl"
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.img
              src={zorluDigitalLogo}
              alt="Zorlu Digital Trade & Services Ltd."
              className="h-24 md:h-32 w-auto object-contain relative"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(59,130,246,0.2)) drop-shadow(0 0 20px rgba(59,130,246,0.1))",
                  "drop-shadow(0 0 16px rgba(59,130,246,0.5)) drop-shadow(0 0 40px rgba(59,130,246,0.3))",
                  "drop-shadow(0 0 8px rgba(59,130,246,0.2)) drop-shadow(0 0 20px rgba(59,130,246,0.1))",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          <div className="relative z-10">
            <p className="text-sm md:text-base font-bold text-muted-foreground">
              ZorluPlus bir Zorlu Digital Trade &amp; Services Ltd. kuruluşudur. Tüm hakları saklıdır. 2026©
            </p>
            {formattedUpdate && (
              <p className="text-xs text-muted-foreground/60 mt-1">{formattedUpdate}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
