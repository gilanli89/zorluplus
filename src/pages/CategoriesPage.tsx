import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import { CATEGORY_3D_ICONS } from "@/lib/categoryIcons";
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
          const icon3d = CATEGORY_3D_ICONS[cat.slug];
          const catName = t(`cat.${cat.slug}`) !== `cat.${cat.slug}` ? t(`cat.${cat.slug}`) : cat.name;
          return (
            <motion.div key={cat.slug} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              <Link
                to={`/kategori/${cat.slug}`}
                className="group card-premium card-premium-border flex flex-col items-center gap-3 rounded-2xl p-5 md:p-6 h-full"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  {/* Glow backdrop */}
                  <div className="absolute inset-0 rounded-2xl bg-primary/8 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {icon3d && (
                    <img
                      src={icon3d}
                      alt={catName}
                      className="relative z-10 w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_4px_8px_hsl(var(--primary)/0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_6px_16px_hsl(var(--primary)/0.3)] transition-all duration-400"
                      loading="lazy"
                      width={64}
                      height={64}
                    />
                  )}
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
