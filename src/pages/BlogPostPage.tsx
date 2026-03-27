import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { ArrowLeft, Calendar } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { useWPPostBySlug } from "@/hooks/useWordPress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Local fallback images for posts without WP featured media
const FALLBACK_IMAGES: Record<string, string> = {
  "kktc-televizyon-fiyatlari-2026-boyuta-ve-ozellige-gore-rehber": "/blog/kktc-televizyon-rehber-2026.jpg",
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useWPPostBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="container py-8 max-w-3xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-64 w-full rounded-2xl mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-16 text-center">
        <h1 className="heading-2 text-foreground mb-4">Yazı bulunamadı</h1>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Blog'a Dön
          </Button>
        </Link>
      </div>
    );
  }

  const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || FALLBACK_IMAGES[slug || ""] || null;
  const cats = post._embedded?.["wp:term"]?.[0] || [];

  return (
    <article className="container py-8 max-w-3xl">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Blog'a Dön
      </Link>

      {image && (
        <img
          src={image}
          alt={post.title.rendered}
          className="w-full rounded-2xl mb-6 object-cover max-h-[400px]"
        />
      )}

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {format(new Date(post.date), "d MMMM yyyy", { locale: tr })}
        </span>
        {cats.map((cat: any) => (
          <Badge key={cat.id} variant="secondary">
            {cat.name}
          </Badge>
        ))}
      </div>

      <h1
        className="heading-1 text-foreground mb-6"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div
        className="prose prose-sm md:prose-base max-w-none text-muted-foreground
          [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:text-foreground [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:leading-relaxed [&_p]:mb-4
          [&_img]:rounded-xl [&_img]:my-6
          [&_a]:text-primary [&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
