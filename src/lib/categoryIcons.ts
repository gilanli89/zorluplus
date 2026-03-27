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

export function getCategoryIcon(slug: string): string | undefined {
  return CATEGORY_3D_ICONS[slug];
}
