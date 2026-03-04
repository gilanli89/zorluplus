import { BRANCHES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

export default function BranchesPage() {
  return (
    <div className="container py-6">
      <h1 className="font-display text-2xl font-bold mb-6 text-foreground">Şubelerimiz</h1>
      <div className="grid gap-6">
        {BRANCHES.map(b => (
          <div key={b.id} className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="aspect-video">
              <iframe
                src={b.mapEmbed}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                title={b.name}
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-bold text-foreground mb-3">{b.name}</h2>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {b.address}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> {b.phone}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> {b.hours}</div>
              </div>
              <div className="flex gap-3">
                <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2"><MapPin className="h-4 w-4" /> Yol Tarifi Al</Button>
                </a>
                <a href={`tel:${b.phone}`}>
                  <Button variant="outline" className="gap-2"><Phone className="h-4 w-4" /> Ara</Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
