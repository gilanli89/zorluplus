import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import shieldIcon from "@/assets/icons/shield.png";
import awardIcon from "@/assets/icons/award.png";
import wrenchIcon from "@/assets/icons/wrench.png";

const TRUST_ITEMS = [
  {
    icon3d: shieldIcon,
    labelKey: "trust.authorizedService",
    descKey: "trust.authorizedServiceDesc",
  },
  {
    icon3d: awardIcon,
    labelKey: "trust.warranty",
    descKey: "trust.warrantyDesc",
  },
  {
    icon3d: wrenchIcon,
    labelKey: "trust.freeInstall",
    descKey: "trust.freeInstallDesc",
  },
];

export default function TrustSection() {
  const { t } = useLanguage();

  return (
    <section className="py-6 md:py-10">
      <div className="container">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="card-premium card-premium-border group relative min-w-[220px] flex-1 rounded-2xl p-5 md:p-6 cursor-default"
            >
              <div className="relative z-10 flex items-center gap-4">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-primary/10 blur-sm opacity-60" />
                  <img
                    src={item.icon3d}
                    alt={t(item.labelKey)}
                    className="relative z-10 w-12 h-12 object-contain drop-shadow-[0_3px_6px_hsl(var(--primary)/0.25)] group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground leading-tight">
                    {t(item.labelKey)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
