import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useWPPageBySlug } from "@/hooks/useWordPress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function WPPageDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: page, isLoading, error } = useWPPageBySlug(slug || "");

  if (isLoading) {
    return (
      <div className="container py-8 max-w-3xl">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container py-16 text-center">
        <h1 className="heading-2 text-foreground mb-4">Sayfa bulunamadı</h1>
        <Link to="/blog">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Blog'a Dön
          </Button>
        </Link>
      </div>
    );
  }

  const image = page._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

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
          alt={page.title.rendered}
          className="w-full rounded-2xl mb-6 object-cover max-h-[400px]"
        />
      )}

      <h1
        className="heading-1 text-foreground mb-6"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />

      <div
        className="prose prose-sm md:prose-base max-w-none text-muted-foreground
          [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:text-foreground [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-lg [&_h3]:mt-6 [&_h3]:mb-2
          [&_p]:leading-relaxed [&_p]:mb-4
          [&_img]:rounded-xl [&_img]:my-6
          [&_a]:text-primary [&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5"
        dangerouslySetInnerHTML={{ __html: page.content.rendered }}
      />
    </article>
  );
}
