import QuoteForm from "@/components/QuoteForm";

export default function QuotePage() {
  return (
    <div className="container py-6 max-w-lg">
      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">Teklif Al</h1>
      <p className="text-muted-foreground mb-6">Bilgilerinizi bırakın, size en uygun teklifi sunalım.</p>
      <div className="rounded-xl border border-border bg-card p-6">
        <QuoteForm />
      </div>
    </div>
  );
}
