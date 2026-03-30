// Turkish special days & smart greeting system
// Includes fixed holidays, memorial days, dynamic Islamic holidays, and commercial days

export interface SpecialDay {
  name: string;
  nameEn: string;
  emoji: string;
  message: string;
  messageEn: string;
  type: "holiday" | "memorial" | "celebration" | "commercial" | "religious";
  /** CSS class for banner styling */
  bannerClass: string;
  /** Show KKTC & Turkey flags in header as doodle */
  showFlags?: boolean;
}

// Islamic holidays shift ~10-11 days each year. These are approximate.
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

// Approximate Kandil nights (Mevlid, Regaip, Mirac, Berat, Kadir)
const KANDIL_NIGHTS: { date: string; name: string; nameEn: string }[] = [
  // 2026 (approximate)
  { date: "2026-01-05", name: "Mevlid Kandili", nameEn: "Mawlid Night" },
  { date: "2026-01-26", name: "Regaip Kandili", nameEn: "Ragaib Night" },
  { date: "2026-02-16", name: "Mirac Kandili", nameEn: "Isra Night" },
  { date: "2026-03-04", name: "Berat Kandili", nameEn: "Barat Night" },
  { date: "2026-03-16", name: "Kadir Gecesi", nameEn: "Laylat al-Qadr" },
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
  "02-14": {
    name: "Sevgililer Günü",
    nameEn: "Valentine's Day",
    emoji: "❤️",
    message: "Sevgililer Gününüz kutlu olsun! Sevgi dolu bir gün dileriz 💕",
    messageEn: "Happy Valentine's Day! Wishing you a day full of love 💕",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-red-500 to-pink-500",
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
    showFlags: true,
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
    showFlags: true,
  },
  "07-20": {
    name: "20 Temmuz Barış ve Özgürlük Bayramı",
    nameEn: "Peace and Freedom Day",
    emoji: "🕊️",
    message: "20 Temmuz Barış ve Özgürlük Bayramı kutlu olsun! 🇹🇷",
    messageEn: "Happy Peace and Freedom Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
    showFlags: true,
  },
  "08-01": {
    name: "1 Ağustos TMT Günü",
    nameEn: "TMT Day",
    emoji: "🇹🇷",
    message: "1 Ağustos TMT Günü kutlu olsun!",
    messageEn: "Happy TMT Day!",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
    showFlags: true,
  },
  "08-30": {
    name: "30 Ağustos Zafer Bayramı",
    nameEn: "Victory Day",
    emoji: "🇹🇷",
    message: "30 Ağustos Zafer Bayramı kutlu olsun! Zafer bizimdir! 🇹🇷",
    messageEn: "Happy Victory Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
    showFlags: true,
  },
  "10-29": {
    name: "29 Ekim Cumhuriyet Bayramı",
    nameEn: "Republic Day",
    emoji: "🇹🇷",
    message: "29 Ekim Cumhuriyet Bayramımız kutlu olsun! Yaşasın Cumhuriyet! 🇹🇷",
    messageEn: "Happy Republic Day! Long live the Republic! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
    showFlags: true,
  },
  "10-31": {
    name: "Cadılar Bayramı",
    nameEn: "Halloween",
    emoji: "🎃",
    message: "Cadılar Bayramınız kutlu olsun! 🎃👻",
    messageEn: "Happy Halloween! 🎃👻",
    type: "celebration",
    bannerClass: "bg-gradient-to-r from-orange-600 to-purple-700",
  },
  "11-10": {
    name: "10 Kasım Atatürk'ü Anma Günü",
    nameEn: "Atatürk Remembrance Day",
    emoji: "🖤",
    message: "Atam, izindeyiz! Saygı ve minnetle anıyoruz. 🖤",
    messageEn: "We remember Atatürk with respect and gratitude. 🖤",
    type: "memorial",
    bannerClass: "bg-gradient-to-r from-gray-900 to-gray-700",
    showFlags: true,
  },
  "11-15": {
    name: "15 Kasım KKTC Kuruluş Günü",
    nameEn: "TRNC Foundation Day",
    emoji: "🇹🇷",
    message: "15 Kasım Kuzey Kıbrıs Türk Cumhuriyeti'nin kuruluş yıl dönümü kutlu olsun! 🇹🇷",
    messageEn: "Happy TRNC Foundation Day! 🇹🇷",
    type: "holiday",
    bannerClass: "bg-gradient-to-r from-red-700 to-red-500",
    showFlags: true,
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

function isInRange(now: Date, start: string, end: string): boolean {
  const startDate = new Date(start + "T00:00:00");
  const endDate = new Date(end + "T23:59:59");
  return now >= startDate && now <= endDate;
}

/** Get Nth weekday of month (e.g., 2nd Sunday of May for Mother's Day) */
function getNthWeekdayOfMonth(year: number, month: number, weekday: number, nth: number): Date {
  const firstDay = new Date(year, month, 1);
  let count = 0;
  for (let day = 1; day <= 31; day++) {
    const d = new Date(year, month, day);
    if (d.getMonth() !== month) break;
    if (d.getDay() === weekday) {
      count++;
      if (count === nth) return d;
    }
  }
  return firstDay;
}

/** Get last weekday of month (e.g., last Friday of November for Black Friday) */
function getLastWeekdayOfMonth(year: number, month: number, weekday: number): Date {
  const lastDay = new Date(year, month + 1, 0);
  for (let day = lastDay.getDate(); day >= 1; day--) {
    const d = new Date(year, month, day);
    if (d.getDay() === weekday) return d;
  }
  return lastDay;
}

/** Check dynamic commercial days */
function getDynamicSpecialDay(now: Date): SpecialDay | null {
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Mother's Day: 2nd Sunday of May
  const mothersDay = getNthWeekdayOfMonth(year, 4, 0, 2);
  if (month === 4 && date === mothersDay.getDate()) {
    return {
      name: "Anneler Günü",
      nameEn: "Mother's Day",
      emoji: "💐",
      message: "Anneler Gününüz kutlu olsun! Tüm anneleri sevgiyle kucaklıyoruz 💐❤️",
      messageEn: "Happy Mother's Day! Celebrating all mothers with love 💐❤️",
      type: "celebration",
      bannerClass: "bg-gradient-to-r from-pink-500 to-rose-500",
    };
  }

  // Father's Day: 3rd Sunday of June
  const fathersDay = getNthWeekdayOfMonth(year, 5, 0, 3);
  if (month === 5 && date === fathersDay.getDate()) {
    return {
      name: "Babalar Günü",
      nameEn: "Father's Day",
      emoji: "👔",
      message: "Babalar Gününüz kutlu olsun! Tüm babaları sevgiyle selamlıyoruz 👔💙",
      messageEn: "Happy Father's Day! Celebrating all fathers with love 👔💙",
      type: "celebration",
      bannerClass: "bg-gradient-to-r from-blue-600 to-indigo-600",
    };
  }

  // Black Friday: last Friday of November
  const blackFriday = getLastWeekdayOfMonth(year, 10, 5);
  if (month === 10 && date === blackFriday.getDate()) {
    return {
      name: "Black Friday",
      nameEn: "Black Friday",
      emoji: "🏷️",
      message: "Black Friday indirimleri başladı! Kaçırılmayacak fırsatlar sizi bekliyor 🏷️🔥",
      messageEn: "Black Friday deals are here! Don't miss incredible offers 🏷️🔥",
      type: "commercial",
      bannerClass: "bg-gradient-to-r from-gray-900 to-yellow-600",
    };
  }

  // New Year Sales: Dec 15-31
  if (month === 11 && date >= 15 && date < 25) {
    return {
      name: "Yılbaşı İndirimleri",
      nameEn: "New Year Sales",
      emoji: "🎁",
      message: "Yılbaşı indirimleri başladı! Sevdiklerinize en güzel hediyeler burada 🎁✨",
      messageEn: "New Year sales are here! Find the perfect gifts for your loved ones 🎁✨",
      type: "commercial",
      bannerClass: "bg-gradient-to-r from-red-600 to-green-600",
    };
  }

  return null;
}

export function getTodaySpecialDay(): SpecialDay | null {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const mmdd = `${month}-${day}`;

  // Check Islamic holidays FIRST (they move each year, take priority)
  for (const h of ISLAMIC_HOLIDAYS) {
    if (isInRange(now, h.start, h.end)) {
      if (h.type === "ramazan") {
        return {
          name: "Ramazan Bayramı",
          nameEn: "Eid al-Fitr",
          emoji: "🌙",
          message: "Ramazan Bayramınız mübarek olsun! Sevdiklerinizle nice güzel bayramlara 🌙✨",
          messageEn: "Happy Eid al-Fitr! Wishing you joy and blessings 🌙✨",
          type: "religious",
          bannerClass: "bg-gradient-to-r from-emerald-700 to-teal-600",
        };
      }
      return {
        name: "Kurban Bayramı",
        nameEn: "Eid al-Adha",
        emoji: "🐑",
        message: "Kurban Bayramınız mübarek olsun! Sağlık ve huzur dolu nice bayramlara 🐑🌙",
        messageEn: "Happy Eid al-Adha! Wishing you peace and blessings 🐑🌙",
        type: "religious",
        bannerClass: "bg-gradient-to-r from-emerald-700 to-teal-600",
      };
    }
  }

  // Check Kandil nights
  const nowStr = `${now.getFullYear()}-${month}-${day}`;
  for (const k of KANDIL_NIGHTS) {
    if (k.date === nowStr) {
      return {
        name: k.name,
        nameEn: k.nameEn,
        emoji: "🕌",
        message: `${k.name}niz mübarek olsun! Hayırlı kandiller 🕌✨`,
        messageEn: `Blessed ${k.nameEn}! 🕌✨`,
        type: "religious",
        bannerClass: "bg-gradient-to-r from-emerald-600 to-cyan-600",
      };
    }
  }

  // Check fixed days
  if (FIXED_SPECIAL_DAYS[mmdd]) {
    return FIXED_SPECIAL_DAYS[mmdd];
  }

  // Check dynamic commercial/celebration days
  const dynamic = getDynamicSpecialDay(now);
  if (dynamic) return dynamic;

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

  // Hayirli Cumalar (Friday)
  if (dayOfWeek === 5) {
    if (lang === "tr") {
      return hour < 12 ? "Hayırlı Cumalar! 🕌" : "Hayırlı Cumalar, iyi hafta sonları! 🌸";
    }
    return hour < 12 ? "Blessed Friday! 🕌" : "Blessed Friday, happy weekend! 🌸";
  }

  // Weekend greetings
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

/** Check if today is a national day that should show flags */
export function shouldShowFlags(): boolean {
  const specialDay = getTodaySpecialDay();
  return specialDay?.showFlags === true;
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

  if (now.getDay() === 5) {
    context += " Bugün Cuma. Hayırlı Cumalar!";
  }

  return context;
}
