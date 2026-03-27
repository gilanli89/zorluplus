import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, ArrowRight, FileText, Loader2 } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { motion } from "framer-motion";
import { useWPPosts, useWPPages, useWPCategories } from "@/hooks/useWordPress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

function getFeaturedImage(item: any): string | null {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

export default function BlogPage() {
  const { t } = useLanguage();
  const { data: posts, isLoading: postsLoading } = useWPPosts();
  const { data: pages, isLoading: pagesLoading } = useWPPages();
  const { data: categories } = useWPCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filteredPosts = selectedCategory
    ? posts?.filter((p) => p.categories.includes(selectedCategory))
    : posts;

  const catMap = new Map(categories?.map((c) => [c.id, c]) || []);

  return (
    <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="heading-1 text-foreground">Blog</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Teknoloji dünyasından haberler, rehberler ve ipuçları
        </p>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mx-auto flex w-fit mb-8">
          <TabsTrigger value="posts">Yazılar</TabsTrigger>
          <TabsTrigger value="pages">Sayfalar</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts">
          {/* Category Filter */}
          {categories && categories.filter((c) => c.count > 0).length > 1 && (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                Tümü
              </Badge>
              {categories
                .filter((c) => c.count > 0 && c.slug !== "uncategorized")
                .map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </Badge>
                ))}
            </div>
          )}

          {postsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : !filteredPosts?.length ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Henüz yazı bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, i) => {
                const image = getFeaturedImage(post);
                const postCategories = post.categories
                  .map((id) => catMap.get(id))
                  .filter(Boolean);

                return (
                  <motion.div
                    key={post.id}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-30px" }}
                    variants={fadeUp}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={image}
                            alt={stripHtml(post.title.rendered)}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(post.date), "d MMMM yyyy", { locale: tr })}
                          </span>
                          {postCategories.map((cat: any) => (
                            <Badge key={cat.id} variant="secondary" className="text-[10px]">
                              {cat.name}
                            </Badge>
                          ))}
                        </div>
                        <h2
                          className="font-display font-bold text-foreground text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                        />
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {stripHtml(post.excerpt.rendered)}
                        </p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                          Devamını Oku <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages">
          {pagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mt-2" />
                </div>
              ))}
            </div>
          ) : !pages?.length ? (
            <div className="text-center py-16 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
              <p>Henüz sayfa bulunmuyor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pages.map((page, i) => (
                <motion.div
                  key={page.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    to={`/sayfa/${page.slug}`}
                    className="group block rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h2
                      className="font-display font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors"
                      dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                    />
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {stripHtml(page.excerpt.rendered || page.content.rendered)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
                      Görüntüle <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
