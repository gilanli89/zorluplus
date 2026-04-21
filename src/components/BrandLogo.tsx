const BRAND_LOGOS: Record<string, string> = {
  samsung: "/brands/samsung-logo.png",
  lg: "/brands/lg-logo.png",
  midea: "/brands/midea.svg",
  aux: "/brands/aux.png",
  toshiba: "/brands/toshiba.svg",
  philips: "/brands/philips.svg",
  krups: "/brands/krups.svg",
  sharp: "/brands/sharp.svg",
  bosch: "/brands/bosch.svg",
  sony: "/brands/sony.png",
  xiaomi: "/brands/xiaomi.png",
  tcl: "/brands/tcl.svg",
  jbl: "/brands/jbl.svg",
  tefal: "/brands/tefal.svg",
  indesit: "/brands/indesit.svg",
  adax: "/brands/adax.png",
  atlantic: "/brands/atlantic.svg",
};

function normalizeBrand(brand: string): string {
  return brand.toLowerCase().trim();
}

interface BrandLogoProps {
  brand: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  xs: "h-5 min-w-[48px] max-w-[64px]",
  sm: "h-6 min-w-[56px] max-w-[80px]",
  md: "h-7 min-w-[72px] max-w-[96px]",
  lg: "h-9 min-w-[96px] max-w-[128px]",
};

export default function BrandLogo({ brand, size = "sm", className = "" }: BrandLogoProps) {
  const key = normalizeBrand(brand);
  const logo = BRAND_LOGOS[key];

  if (!logo) {
    return (
      <span className={`text-[11px] font-semibold text-primary/70 uppercase tracking-wider ${className}`}>
        {brand}
      </span>
    );
  }

  const sizeClass = SIZES[size];

  return (
    <img
      src={logo}
      alt={brand}
      className={`${sizeClass} w-full object-contain select-none opacity-90 hover:opacity-100 transition-opacity ${className}`}
      loading="lazy"
    />
  );
}
