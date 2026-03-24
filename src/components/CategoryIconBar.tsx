import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { icons } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CategoryIconBar() {
  const { t } = useLanguage();
  const { categorySlug } = useParams();
  const getCatName = (slug: string) => {
    const key = `cat.${slug}`;
    const translated = t(key);
    return translated !== key ? translated : CATEGORIES.find(c => c.slug === slug)?.name || slug;
  };

  return (
    <div className="sticky top-[88px] z-30 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 mb-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat, i) => {
          const IconComp = icons[cat.icon as keyof typeof icons];
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
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5"
                }`}
              >
                {IconComp && <IconComp className="h-5 w-5" />}
                <span className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap">{getCatName(cat.slug)}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
