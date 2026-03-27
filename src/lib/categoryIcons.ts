// 3D rendered category icon mapping
import tvIcon from "@/assets/icons/tv.png";
import speakerIcon from "@/assets/icons/speaker.png";
import fridgeIcon from "@/assets/icons/fridge.png";
import ovenIcon from "@/assets/icons/oven.png";
import acIcon from "@/assets/icons/ac.png";
import kitchenIcon from "@/assets/icons/kitchen.png";
import applianceIcon from "@/assets/icons/appliance.png";
import accessoryIcon from "@/assets/icons/accessory.png";
import gamepadIcon from "@/assets/icons/gamepad.png";
import shieldIcon from "@/assets/icons/shield.png";
import awardIcon from "@/assets/icons/award.png";
import wrenchIcon from "@/assets/icons/wrench.png";
import installIcon from "@/assets/icons/install.png";
import certificateIcon from "@/assets/icons/certificate.png";
import installmentIcon from "@/assets/icons/installment.png";

/** Maps category slug → 3D PNG icon */
export const CATEGORY_3D_ICONS: Record<string, string> = {
  "tv-goruntu": tvIcon,
  "ses-sistemleri": speakerIcon,
  "beyaz-esya": fridgeIcon,
  "ankastre": ovenIcon,
  "klima-isitma": acIcon,
  "mutfak-aletleri": kitchenIcon,
  "kucuk-ev-aletleri": applianceIcon,
  "aksesuar": accessoryIcon,
  "oyun": gamepadIcon,
};

/** Maps trust icon name → 3D PNG icon */
export const TRUST_3D_ICONS: Record<string, string> = {
  Shield: shieldIcon,
  Award: awardIcon,
  Wrench: wrenchIcon,
};

/** Header trust badge 3D icons */
export const HEADER_BADGE_ICONS = {
  install: installIcon,
  certificate: certificateIcon,
  installment: installmentIcon,
};

/** Maps footer category label keywords → 3D icon for footer chips */
const FOOTER_CATEGORY_ICON_MAP: Array<{ keywords: string[]; icon: string }> = [
  { keywords: ["beyaz eşya", "buzdolabı"], icon: fridgeIcon },
  { keywords: ["ankastre", "fırın", "davlumbaz", "ocak"], icon: ovenIcon },
  { keywords: ["klima", "ısıtıcı", "konvektör"], icon: acIcon },
  { keywords: ["televizyon", "tv"], icon: tvIcon },
  { keywords: ["çamaşır", "bulaşık", "kurutma"], icon: fridgeIcon },
  { keywords: ["mikrodalga", "kahve", "airfryer"], icon: kitchenIcon },
  { keywords: ["ev aletleri"], icon: applianceIcon },
  { keywords: ["ses", "soundbar", "hoparlör"], icon: speakerIcon },
  { keywords: ["projeksiyon", "kumanda", "duvar", "aparat", "aksesuar"], icon: accessoryIcon },
  { keywords: ["oyun"], icon: gamepadIcon },
];

export function getFooterCategoryIcon(label: string): string | undefined {
  const lower = label.toLowerCase();
  for (const entry of FOOTER_CATEGORY_ICON_MAP) {
    if (entry.keywords.some(kw => lower.includes(kw))) return entry.icon;
  }
  return undefined;
}

export function getCategoryIcon(slug: string): string | undefined {
  return CATEGORY_3D_ICONS[slug];
}
