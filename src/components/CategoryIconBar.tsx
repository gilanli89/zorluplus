import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES } from "@/lib/constants";
import { CATEGORY_3D_ICONS } from "@/lib/categoryIcons";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryIconBarProps {
  /** Sticky header altında sabitleyici davranış. Category sayfası için true (default), HomePage gibi yerlerde false. */
  sticky?: boolean;
}

export default function CategoryIconBar({ sticky = true }: CategoryIconBarProps = {}) {
  const { t } = useLanguage();
  const { categorySlug } = useParams();
  const getCatName = (slug: string) => {
    const key = `cat.${slug}`;
    const translated = t(key);
    return translated !== key ? translated : CATEGORIES.find(c => c.slug === slug)?.name || slug;
  };

  return (
    <div className={sticky
      ? "sticky top-[88px] z-30 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 mb-3"
      : "py-2"
    }>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat, i) => {
          const icon3d = CATEGORY_3D_ICONS[cat.slug];
          const isActive = categorySlug === cat.slug;
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                to={`/kategori/${cat.slug}`}
                className={`flex flex-col items-center gap-1.5 min-w-[72px] rounded-xl border px-3 py-3 text-xs transition-all tap-scale ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary shadow-[0_2px_12px_-4px_hsl(var(--primary)/0.3)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-[0_2px_8px_-4px_hsl(var(--primary)/0.2)]"
                }`}
              >
                {icon3d && (
                  <div className={`rounded-lg p-1 ${
                    isActive ? "bg-primary/10" : "bg-muted/50"
                  }`}>
                    <img
                      src={icon3d}
                      alt={getCatName(cat.slug)}
                      className="h-8 w-8 object-contain drop-shadow-[0_2px_4px_hsl(var(--primary)/0.2)] transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      width={32}
                      height={32}
                    />
                  </div>
                )}
                <span className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap">{getCatName(cat.slug)}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
