const BRAND_LOGOS: Record<string, string> = {
  samsung: "/brands/samsung-logo.png",
  lg: "/brands/lg-logo.png",
  midea: "/brands/midea.svg",
  aux: "/brands/aux.png",
  toshiba: "/brands/toshiba.png",
  philips: "/brands/philips.svg",
  krups: "/brands/krups.svg",
  sharp: "/brands/sharp.png",
  bosch: "/brands/bosch.svg",
  sony: "/brands/sony.png",
  xiaomi: "/brands/xiaomi.png",
  tcl: "/brands/tcl.png",
  jbl: "/brands/jbl.svg",
  tefal: "/brands/tefal.png",
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
  xs: "h-4 max-w-[52px]",
  sm: "h-5 max-w-[60px]",
  md: "h-6 max-w-[78px]",
  lg: "h-8 max-w-[104px]",
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
      className={`${sizeClass} w-auto object-contain select-none opacity-80 hover:opacity-100 transition-opacity ${className}`}
      loading="lazy"
    />
  );
}
