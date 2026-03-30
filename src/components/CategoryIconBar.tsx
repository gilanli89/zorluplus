import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { CATEGORIES, CATEGORY_GROUPS } from "@/lib/constants";
import { CATEGORY_3D_ICONS } from "@/lib/categoryIcons";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export default function CategoryIconBar() {
  const { t, lang } = useLanguage();
  const { categorySlug } = useParams();
  const [activeGroup, setActiveGroup] = useState<string>("tv-ses");

  // Auto-select group when a category from URL params is active
  useEffect(() => {
    if (categorySlug) {
      const cat = CATEGORIES.find(c => c.slug === categorySlug);
      if (cat && cat.group) {
        setActiveGroup(cat.group);
      }
    }
  }, [categorySlug]);

  const filteredCats = CATEGORIES.filter(c => c.group === activeGroup);

  const getCatName = (slug: string) => {
    const key = `cat.${slug}`;
    const translated = t(key);
    return translated !== key ? translated : CATEGORIES.find(c => c.slug === slug)?.name || slug;
  };

  return (
    <div className="sticky top-[88px] z-30 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 mb-3">
      <div className="flex items-center gap-1 px-4 mb-1">
        {CATEGORY_GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
              activeGroup === g.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {lang === "tr" ? g.name : g.nameEn}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filteredCats.map((cat, i) => {
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
