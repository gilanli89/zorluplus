import { motion } from "framer-motion";
import { Shield, Award, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TRUST_ITEMS = [
  {
    icon: Shield,
    labelKey: "trust.authorizedService",
    descKey: "trust.authorizedServiceDesc",
  },
  {
    icon: Award,
    labelKey: "trust.warranty",
    descKey: "trust.warrantyDesc",
  },
  {
    icon: Wrench,
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
              className="trust-card group relative min-w-[220px] flex-1 rounded-2xl p-5 md:p-6 cursor-default"
            >
              {/* Gradient border overlay */}
              <div className="absolute inset-0 rounded-2xl gradient-border pointer-events-none" />
              
              <div className="relative z-10 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 pulse-icon group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-primary" strokeWidth={2} />
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
