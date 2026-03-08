// Turkish special days & smart greeting system
// Includes fixed holidays, memorial days, and dynamic Islamic holidays (approximate)

export interface SpecialDay {
  name: string;
  nameEn: string;
  emoji: string;
  message: string;
  messageEn: string;
  type: "holiday" | "memorial" | "celebration";
  /** CSS class for banner styling */
  bannerClass: string;
}

// Islamic holidays shift ~10-11 days each year. These are approximate.
// Ramazan Bayramı & Kurban Bayramı dates (YYYY-MM-DD)
const ISLAMIC_HOLIDAYS: { start: string; end: string; type: "ramazan" | "kurban" }[] = [
  // 2025
  { start: "2025-03-30", end: "2025-04-01", type: "ramazan" },
  { start: "2025-06-06", end: "2025-06-09", type: "kurban" },
  // 2026
  { start: "2026-03-20", end: "2026-03-22", type: "ramazan" },
  { start: "2026-05-27", end: "2026-05-30", type: "kurban" },
  // 2027
  { start: "2027-03-09", end: "2027-03-11", type: "ramazan" },
  { start: "2027-05-16", end: "2027-05-19", type: "kurban" },
];

// Fixed special days (MM-DD format)
const FIXED_SPECIAL_DAYS: Record<string, SpecialDay> = {
  "01-01": {
    name: "Yeni Yıl",
    nameEn: "New Year",
    emoji: "🎉",
    message: "Mutlu Yıllar! Yeni yıl sağlık, huzur ve mutluluk getirsin 🥂",
    messageEn: "Happy New Year! Wishing you health, peace and happiness 🥂",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-amber-600 to-red-600",
  },
  "03-08": {
    name: "Dünya Kadınlar Günü",
    nameEn: "International Women's Day",
    emoji: "🌸",
    message: "8 Mart Dünya Kadınlar Günü kutlu olsun! 💐",
    messageEn: "Happy International Women's Day! 💐",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-pink-600 to-purple-600",
  },
  "04-23": {
    name: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
    nameEn: "National Sovereignty and Children's Day",
    emoji: "🎈",
    message: "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı kutlu olsun! 🇹🇷",
    messageEn: "Happy National Sovereignty and Children's Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "05-01": {
    name: "1 Mayıs Emek ve Dayanışma Günü",
    nameEn: "Labour Day",
    emoji: "✊",
    message: "1 Mayıs Emek ve Dayanışma Günü kutlu olsun!",
    messageEn: "Happy Labour Day!",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-600 to-orange-600",
  },
  "05-19": {
    name: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı",
    nameEn: "Commemoration of Atatürk, Youth and Sports Day",
    emoji: "🇹🇷",
    message: "19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı kutlu olsun! 🇹🇷",
    messageEn: "Happy Youth and Sports Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "07-20": {
    name: "20 Temmuz Barış ve Özgürlük Bayramı",
    nameEn: "Peace and Freedom Day",
    emoji: "🕊️",
    message: "20 Temmuz Barış ve Özgürlük Bayramı kutlu olsun! 🇹🇷",
    messageEn: "Happy Peace and Freedom Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "08-01": {
    name: "1 Ağustos TMT Günü",
    nameEn: "TMT Day",
    emoji: "🇹🇷",
    message: "1 Ağustos TMT Günü kutlu olsun!",
    messageEn: "Happy TMT Day!",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "08-30": {
    name: "30 Ağustos Zafer Bayramı",
    nameEn: "Victory Day",
    emoji: "🇹🇷",
    message: "30 Ağustos Zafer Bayramı kutlu olsun! Zafer bizimdir! 🇹🇷",
    messageEn: "Happy Victory Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "10-29": {
    name: "29 Ekim Cumhuriyet Bayramı",
    nameEn: "Republic Day",
    emoji: "🇹🇷",
    message: "29 Ekim Cumhuriyet Bayramımız kutlu olsun! Yaşasın Cumhuriyet! 🇹🇷",
    messageEn: "Happy Republic Day! Long live the Republic! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "11-10": {
    name: "10 Kasım Atatürk'ü Anma Günü",
    nameEn: "Atatürk Remembrance Day",
    emoji: "🖤",
    message: "Atam, izindeyiz! Saygı ve minnetle anıyoruz. 🖤",
    messageEn: "We remember Atatürk with respect and gratitude. 🖤",
    type: "memorial",
    bannerClass: "bg-gradient-to-r from-gray-900 to-gray-700",
  },
  "11-15": {
    name: "15 Kasım KKTC Kuruluş Günü",
    nameEn: "TRNC Foundation Day",
    emoji: "🇹🇷",
    message: "15 Kasım Kuzey Kıbrıs Türk Cumhuriyeti'nin kuruluş yıl dönümü kutlu olsun! 🇹🇷",
    messageEn: "Happy TRNC Foundation Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
  },
  "12-25": {
    name: "Noel",
    nameEn: "Christmas",
    emoji: "🎄",
    message: "Mutlu Noeller! 🎄✨",
    messageEn: "Merry Christmas! 🎄✨",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-green-700 to-red-600",
  },
  "12-31": {
    name: "Yılbaşı Gecesi",
    nameEn: "New Year's Eve",
    emoji: "🎆",
    message: "Hoş geldin yeni yıl! Mutlu yıllar! 🎆🥂",
    messageEn: "Happy New Year's Eve! 🎆🥂",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-amber-600 to-purple-600",
  },
};

function isInRange(mmdd: string, year: number, start: string, end: string): boolean {
  const toDate = (md: string) => new Date(`${year}-${md}`);
  const current = toDate(mmdd);
  return current >= toDate(start) && current <= toDate(end);
}

export function getTodaySpecialDay(): SpecialDay | null {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const mmdd = `${month}-${day}`;
  const year = now.getFullYear();

  // Check fixed days first
  if (FIXED_SPECIAL_DAYS[mmdd]) {
    return FIXED_SPECIAL_DAYS[mmdd];
  }

  // Check Islamic holidays
  for (const h of ISLAMIC_HOLIDAYS) {
    if (isInRange(mmdd, year, h.start, h.end)) {
      if (h.type === "ramazan") {
        return {
          name: "Ramazan Bayramı",
          nameEn: "Eid al-Fitr",
          emoji: "🌙",
          message: "Ramazan Bayramınız mübarek olsun! Sevdiklerinizle nice güzel bayramlara 🌙✨",
          messageEn: "Happy Eid al-Fitr! Wishing you joy and blessings 🌙✨",
          type: "holiday",
          bannerClass: "bg-gradient-to-r from-emerald-700 to-teal-600",
        };
      }
      return {
        name: "Kurban Bayramı",
        nameEn: "Eid al-Adha",
        emoji: "🐑",
        message: "Kurban Bayramınız mübarek olsun! Sağlık ve huzur dolu nice bayramlara 🐑🌙",
        messageEn: "Happy Eid al-Adha! Wishing you peace and blessings 🐑🌙",
        type: "holiday",
        bannerClass: "bg-gradient-to-r from-emerald-700 to-teal-600",
      };
    }
  }

  return null;
}

export function getSmartGreeting(lang: "tr" | "en"): string {
  const now = new Date();
  const hour = now.getHours();
  const dayOfWeek = now.getDay(); // 0=Sun, 6=Sat
  const specialDay = getTodaySpecialDay();

  // Special day greetings take priority
  if (specialDay) {
    return lang === "tr"
      ? `${specialDay.emoji} ${specialDay.message}`
      : `${specialDay.emoji} ${specialDay.messageEn}`;
  }

  // Weekend greetings
  if (dayOfWeek === 5 && hour >= 14) {
    return lang === "tr" ? "İyi hafta sonları! 🎉" : "Happy weekend! 🎉";
  }
  if (dayOfWeek === 6) {
    return lang === "tr" ? "İyi hafta sonları! ☀️" : "Happy weekend! ☀️";
  }
  if (dayOfWeek === 0) {
    return lang === "tr" ? "Keyifli bir pazar günü! 🌿" : "Enjoy your Sunday! 🌿";
  }

  // Monday motivation
  if (dayOfWeek === 1 && hour < 12) {
    return lang === "tr" ? "Hayırlı haftalar! 💪" : "Happy new week! 💪";
  }

  // Time-based greetings
  if (lang === "tr") {
    if (hour >= 5 && hour < 12) return "Günaydın ☀️";
    if (hour >= 12 && hour < 17) return "İyi Günler 🌤️";
    if (hour >= 17 && hour < 21) return "İyi Akşamlar 🌆";
    return "İyi Geceler 🌙";
  }
  if (hour >= 5 && hour < 12) return "Good Morning ☀️";
  if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
  if (hour >= 17 && hour < 21) return "Good Evening 🌆";
  return "Good Night 🌙";
}

/** Get context string for AI chatbot about current date/time/special day */
export function getDateContext(): string {
  const now = new Date();
  const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
  const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const hour = now.getHours();
  const minute = String(now.getMinutes()).padStart(2, "0");
  
  let timeOfDay = "gece";
  if (hour >= 5 && hour < 12) timeOfDay = "sabah";
  else if (hour >= 12 && hour < 17) timeOfDay = "öğleden sonra";
  else if (hour >= 17 && hour < 21) timeOfDay = "akşam";

  const specialDay = getTodaySpecialDay();
  
  let context = `Bugün ${now.getDate()} ${monthName} ${now.getFullYear()}, ${dayName}. Saat ${hour}:${minute} (${timeOfDay}).`;
  
  if (specialDay) {
    context += ` Bugün özel bir gün: ${specialDay.name}. ${specialDay.type === "memorial" ? "Saygıyla anılması gereken bir gün." : "Kutlama günü!"}`;
  }

  const isWeekend = now.getDay() === 0 || now.getDay() === 6;
  if (isWeekend) {
    context += " Hafta sonu.";
  }

  return context;
}
