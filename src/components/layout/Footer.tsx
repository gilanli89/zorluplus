import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND, FOOTER_LINKS } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import zorluLogo from "@/assets/zorlu-logo.png";

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

  const trustBadges = [
    { label: t("trust.authorizedService"), desc: t("trust.authorizedServiceDesc") },
    { label: t("trust.warranty"), desc: t("trust.warrantyDesc") },
    { label: t("trust.freeInstall"), desc: t("trust.freeInstallDesc") },
  ];

  const footerKurumsal = [
    { label: t("footer.about"), href: "/hakkimizda" },
    { label: t("footer.imprint"), href: "/kunye" },
    { label: t("footer.team"), href: "/ekibimiz" },
    { label: t("footer.contactLink"), href: "/iletisim" },
    { label: t("footer.branchesLink"), href: "/subelerimiz" },
  ];

  const footerDestek = [
    { label: t("footer.supportLink"), href: "/destek" },
    { label: t("footer.orderTracking"), href: "/siparis-takip" },
    { label: t("footer.paymentMethods"), href: "/odeme-yontemleri" },
    { label: t("footer.returnPolicy"), href: "/iade-kosullari" },
  ];

  const footerYasal = [
    { label: t("footer.terms"), href: "/kullanim-kosullari" },
    { label: t("footer.privacy"), href: "/gizlilik-politikasi" },
  ];

  return (
    <footer className="border-t border-border bg-card pb-24 lg:pb-8">
      {/* Trust bar */}
      <div className="border-b border-border">
        <motion.div
          className="container grid grid-cols-3 gap-4 py-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {trustBadges.map(b => (
            <motion.div key={b.label} variants={fadeItem} className="text-center">
              <p className="font-display font-bold text-sm text-foreground">{b.label}</p>
              <p className="text-xs text-muted-foreground">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
            <div className="flex items-center gap-3 text-muted-foreground">
              <a href={BRAND.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-foreground transition-colors icon-hover-rotate"><Facebook className="h-5 w-5" /></a>
              <a href={BRAND.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-foreground transition-colors icon-hover-rotate"><Instagram className="h-5 w-5" /></a>
              <a href={BRAND.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-foreground transition-colors icon-hover-rotate"><Youtube className="h-5 w-5" /></a>
              <a href={BRAND.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-sm font-bold hover:text-foreground transition-colors">TT</a>
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
                <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> {BRAND.email}
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

        <div className="mt-8 pt-6 border-t border-border flex flex-col items-center gap-4">
          <img src={zorluDtasLogo} alt="Zorlu Digital Trade & Services Ltd." className="h-28 md:h-36 w-auto object-contain" />
          <p className="text-xs text-muted-foreground text-center">
            ZorluPlus bir Zorlu Digital Trade &amp; Services Ltd. kuruluşudur. Tüm hakları saklıdır. 2026©
          </p>
        </div>
      </div>
    </footer>
  );
}
