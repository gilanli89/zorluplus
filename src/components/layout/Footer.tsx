import { Link } from "react-router-dom";
import { Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND, FOOTER_LINKS, TRUST_BADGES } from "@/lib/constants";
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
          {TRUST_BADGES.map(b => (
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-extrabold text-xs">
                Z+
              </div>
              <span className="font-display font-bold text-foreground">{BRAND.shortName}</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Kuzey Kıbrıs'ın güvenilir elektronik mağazası. Samsung & LG yetkili servis.
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
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">Kurumsal</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.kurumsal.map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline w-fit">{l.label}</Link>
              ))}
            </nav>
          </motion.div>

          {/* Destek */}
          <motion.div variants={fadeItem}>
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">Destek</h4>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.destek.map(l => (
                <Link key={l.href} to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline w-fit">{l.label}</Link>
              ))}
            </nav>
          </motion.div>

          {/* İletişim */}
          <motion.div variants={fadeItem}>
            <h4 className="font-display font-bold text-sm mb-3 text-foreground">İletişim</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> {BRAND.email}
              </a>
            </div>
            <div className="mt-4 flex flex-col gap-1.5">
              {FOOTER_LINKS.yasal.map(l => (
                <Link key={l.href} to={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          ©ZorluPlus bir Zorlu Digital Trade & Services Ltd. kuruluşudur. Tüm hakları saklıdır. 2026
        </div>
      </div>
    </footer>
  );
}
