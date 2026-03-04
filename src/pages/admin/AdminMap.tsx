import { BRANCHES } from "@/lib/constants";

export default function AdminMap() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Kıbrıs Haritası</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {BRANCHES.map(b => (
          <div key={b.id} className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={b.mapEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={b.name}
              />
            </div>
            <div className="p-4">
              <h3 className="font-display font-bold text-foreground">{b.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{b.address}</p>
              <p className="text-sm text-muted-foreground">{b.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
