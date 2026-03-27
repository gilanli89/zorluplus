import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import { icons } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function CategoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="container py-6 md:py-8">
      <h1 className="heading-2 mb-6 text-foreground pulse-heading">{t("shop.title")}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {CATEGORIES.map((cat, i) => {
          const IconComp = icons[cat.icon as keyof typeof icons];
          const catName = t(`cat.${cat.slug}`) !== `cat.${cat.slug}` ? t(`cat.${cat.slug}`) : cat.name;
          return (
            <motion.div key={cat.slug} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <Link
                to={`/kategori/${cat.slug}`}
                className="group card-premium card-premium-border flex flex-col items-center gap-3 rounded-2xl p-5 md:p-6 h-full"
              >
                <div className="premium-icon-wrap">
                  <div className="premium-icon-inner flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 border border-primary/20 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.25),inset_0_1px_0_hsl(var(--primary-foreground)/0.1)] text-primary group-hover:shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.35)]">
                    {IconComp && <IconComp className="h-7 w-7 md:h-8 md:w-8 drop-shadow-[0_1px_3px_hsl(var(--primary)/0.4)]" />}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm md:text-base text-center text-foreground leading-tight">{catName}</span>
                  {cat.children.length > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary/15 text-primary text-[10px] font-bold shadow-[0_1px_4px_-1px_hsl(var(--primary)/0.2)]">
                      {cat.children.length}
                    </span>
                  )}
                </div>
                {cat.children.length > 0 && (
                  <span className="text-[11px] text-muted-foreground text-center leading-snug">
                    {cat.children.slice(0, 3).map(s => s.name).join(", ")}
                    {cat.children.length > 3 && " …"}
                  </span>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
