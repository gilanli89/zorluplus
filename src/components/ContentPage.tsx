interface ContentPageProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentPage({ title, children }: ContentPageProps) {
  return (
    <div className="container py-6 max-w-3xl">
      <h1 className="heading-2 mb-6 text-foreground">{title}</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground [&_h2]:text-foreground [&_h2]:font-display [&_h2]:font-bold [&_h2]:text-lg [&_h2]:sm:text-xl [&_h2]:mt-6 [&_h2]:mb-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}
