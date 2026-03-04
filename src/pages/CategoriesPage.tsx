import { Link } from "react-router-dom";
import { CATEGORIES } from "@/lib/constants";

export default function CategoriesPage() {
  return (
    <div className="container py-6">
      <h1 className="font-display text-2xl font-bold mb-6 text-foreground">Tüm Kategoriler</h1>
      <div className="grid gap-4">
        {CATEGORIES.map(cat => (
          <div key={cat.slug} className="rounded-xl border border-border bg-card p-5">
            <Link to={`/kategori/${cat.slug}`} className="font-display font-bold text-lg text-foreground hover:text-primary transition-colors">
              {cat.name}
            </Link>
            {cat.children.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {cat.children.map(sub => (
                  <Link
                    key={sub.slug}
                    to={`/kategori/${cat.slug}/${sub.slug}`}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
