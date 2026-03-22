// =============================================================
// ZORLU.PLUS — ÜRÜN FİLTRE AĞACI
// Kaynak: wc-product-export-4-3-2026 (219 ürün, 23 kategori)
// Otomatik üretilmiştir — zorlu.plus/admin/urunler üzerinden yönetilir
// =============================================================

export type FilterType = 'checkbox' | 'toggle' | 'price_range' | 'size_range'

export interface FilterOption {
  key: string
  label_tr: string
  label_en?: string
  type: FilterType
  values?: string[]
  unit?: string
  min?: number
  max?: number
}

export interface CategoryFilterConfig {
  id: string
  name_tr: string
  name_en: string
  product_count: number
  price_range: { min: number; max: number }
  filters: FilterOption[]
}

export const FILTER_TREE: CategoryFilterConfig[] = [
  {
    "id": "televizyonlar",
    "name_tr": "Televizyonlar",
    "name_en": "TVs",
    "product_count": 38,
    "price_range": {
      "min": 12700,
      "max": 444000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "LG",
          "Samsung"
        ]
      },
      {
        "key": "screen_size_inch",
        "label_tr": "Ekran Boyutu",
        "type": "checkbox",
        "values": [
          "32\""
        ],
        "unit": "inç"
      },
      {
        "key": "panel_type",
        "label_tr": "Panel Türü",
        "type": "checkbox",
        "values": [
          "LED",
          "QLED",
          "Neo QLED",
          "OLED",
          "QNED",
          "NanoCell"
        ]
      },
      {
        "key": "resolution",
        "label_tr": "Çözünürlük",
        "type": "checkbox",
        "values": [
          "HD",
          "Full HD",
          "4K UHD",
          "8K"
        ]
      },
      {
        "key": "refresh_hz",
        "label_tr": "Ekran Yenileme Hızı",
        "type": "checkbox",
        "values": [
          "50 Hz",
          "60 Hz",
          "100 Hz",
          "120 Hz",
          "144 Hz"
        ]
      },
      {
        "key": "smart_tv",
        "label_tr": "Smart TV",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "os",
        "label_tr": "İşletim Sistemi",
        "type": "checkbox",
        "values": [
          "Tizen",
          "webOS",
          "Android TV",
          "Google TV",
          "Vidaa"
        ]
      },
      {
        "key": "has_satellite",
        "label_tr": "Uydu Alıcısı",
        "type": "toggle",
        "values": [
          "Dahili",
          "Dahili Değil"
        ]
      },
      {
        "key": "usb_count",
        "label_tr": "USB Sayısı",
        "type": "checkbox",
        "values": [
          "1",
          "2",
          "3",
          "4+"
        ]
      },
      {
        "key": "hdmi_count",
        "label_tr": "HDMI Sayısı",
        "type": "checkbox",
        "values": [
          "1",
          "2",
          "3",
          "4+"
        ]
      },
      {
        "key": "voice_remote",
        "label_tr": "Akıllı Kumanda",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 12700,
        "max": 444000
      }
    ]
  },
  {
    "id": "projeksiyon",
    "name_tr": "Projeksiyon Makineleri",
    "name_en": "Projectors",
    "product_count": 0,
    "price_range": {
      "min": 0,
      "max": 0
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": []
      },
      {
        "key": "panel_type",
        "label_tr": "Panel Türü",
        "type": "checkbox",
        "values": [
          "LED",
          "DLP",
          "LCD",
          "Laser"
        ]
      },
      {
        "key": "resolution",
        "label_tr": "Çözünürlük",
        "type": "checkbox",
        "values": [
          "HD",
          "Full HD",
          "4K UHD",
          "8K"
        ]
      },
      {
        "key": "refresh_hz",
        "label_tr": "Yenileme Hızı",
        "type": "checkbox",
        "values": [
          "60 Hz",
          "120 Hz",
          "144 Hz"
        ]
      },
      {
        "key": "smart_tv",
        "label_tr": "Smart Özellik",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "os",
        "label_tr": "İşletim Sistemi",
        "type": "checkbox",
        "values": [
          "Android",
          "Google TV",
          "Windows"
        ]
      },
      {
        "key": "hdmi_count",
        "label_tr": "HDMI Sayısı",
        "type": "checkbox",
        "values": [
          "1",
          "2",
          "3",
          "4+"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 0,
        "max": 100000
      }
    ]
  },
  {
    "id": "hdmi-kablo",
    "name_tr": "HDMI Kablo",
    "name_en": "HDMI Cables",
    "product_count": 3,
    "price_range": {
      "min": 0,
      "max": 0
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": []
      },
      {
        "key": "cable_length",
        "label_tr": "Kablo Uzunluğu",
        "type": "checkbox",
        "values": [
          "1m",
          "1.5m",
          "2m",
          "3m",
          "5m"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 0,
        "max": 0
      }
    ]
  },
  {
    "id": "tv-askisi",
    "name_tr": "TV Duvar Askı Aparatları",
    "name_en": "TV Wall Mounts",
    "product_count": 16,
    "price_range": {
      "min": 1500,
      "max": 404243
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Aksesuar",
          "BRATECK",
          "Brateck",
          "SILVERCREST",
          "SONOROUS",
          "VONTECH"
        ]
      },
      {
        "key": "mount_type",
        "label_tr": "Çeşit",
        "type": "checkbox",
        "values": [
          "Sabit",
          "Dönebilen",
          "Köşe/Dam Aparatı"
        ]
      },
      {
        "key": "tv_size_min",
        "label_tr": "TV Boyutu Uyumluluğu",
        "type": "size_range",
        "min": 19,
        "max": 98,
        "unit": "\""
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 500,
        "max": 8000
      }
    ]
  },
  {
    "id": "kumanda",
    "name_tr": "Kumandalar",
    "name_en": "Remote Controls",
    "product_count": 28,
    "price_range": {
      "min": 1500,
      "max": 4000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "LG",
          "PHILIPS",
          "Samsung",
          "SONY",
          "TCL",
          "TOSHIBA",
          "XIAOMI"
        ]
      },
      {
        "key": "remote_type",
        "label_tr": "Uyumlu Cihaz",
        "type": "checkbox",
        "values": [
          "TV",
          "Akıllı TV",
          "Soundbar",
          "Klima"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 1000,
        "max": 5000
      }
    ]
  },
  {
    "id": "ses-sistemleri",
    "name_tr": "Ses Sistemleri",
    "name_en": "Audio Systems",
    "product_count": 85,
    "price_range": {
      "min": 1500,
      "max": 444000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Brateck",
          "JBL",
          "LG",
          "PHILIPS",
          "Samsung",
          "SONOROUS",
          "SONY",
          "TCL",
          "TOSHIBA",
          "XIAOMI"
        ]
      },
      {
        "key": "audio_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Soundbar",
          "Party Box",
          "Bluetooth Hoparlör",
          "Boombox",
          "Kulaklık"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "2",
          "500"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 1500,
        "max": 444000
      }
    ]
  },
  {
    "id": "su-sebili",
    "name_tr": "Su Sebilleri",
    "name_en": "Water Dispensers",
    "product_count": 14,
    "price_range": {
      "min": 4999,
      "max": 10000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Midea",
          "MIDEA",
          "Toshiba",
          "TOSHIBA"
        ]
      },
      {
        "key": "water_type",
        "label_tr": "Damacana Yeri",
        "type": "checkbox",
        "values": [
          "Üstten Damacanalı",
          "Alttan Damacanalı",
          "Alttan/Gizli Damacanalı"
        ]
      },
      {
        "key": "water_size",
        "label_tr": "Boy",
        "type": "checkbox",
        "values": [
          "Yarım Boy",
          "Tam Boy"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 4999,
        "max": 10000
      }
    ]
  },
  {
    "id": "kahve-makinesi",
    "name_tr": "Kahve Makineleri",
    "name_en": "Coffee Machines",
    "product_count": 7,
    "price_range": {
      "min": 3850,
      "max": 7250
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "KRUPS",
          "Krups",
          "Tefal"
        ]
      },
      {
        "key": "coffee_type",
        "label_tr": "Kahve Türü",
        "type": "checkbox",
        "values": [
          "Filtreli",
          "Kapsüllü",
          "Espresso",
          "French Press",
          "Çok Amaçlı"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "800W",
          "1000W",
          "1050W",
          "1100W"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 3850,
        "max": 7250
      }
    ]
  },
  {
    "id": "air-fryer",
    "name_tr": "Air Fryer",
    "name_en": "Air Fryers",
    "product_count": 5,
    "price_range": {
      "min": 5555,
      "max": 13500
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Philips"
        ]
      },
      {
        "key": "capacity_lt",
        "label_tr": "Kapasite",
        "type": "checkbox",
        "values": [
          "3L",
          "4L",
          "4.1L",
          "5L",
          "6L",
          "6.2L",
          "7L",
          "7.3L"
        ],
        "unit": "Litre"
      },
      {
        "key": "wifi",
        "label_tr": "Wi-Fi Bağlantı",
        "type": "toggle",
        "values": [
          "Wi-Fi'li",
          "Wi-Fi'siz"
        ]
      },
      {
        "key": "persons",
        "label_tr": "Kaç Kişilik",
        "type": "checkbox",
        "values": [
          "1-2 Kişilik",
          "3-4 Kişilik",
          "5-6 Kişilik",
          "7+ Kişilik"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 5555,
        "max": 13500
      }
    ]
  },
  {
    "id": "mikrodalga",
    "name_tr": "Mikrodalga Fırınlar",
    "name_en": "Microwave Ovens",
    "product_count": 11,
    "price_range": {
      "min": 8150,
      "max": 22000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "microwave_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Solo",
          "Ankastre"
        ]
      },
      {
        "key": "grill",
        "label_tr": "Izgara Fonks.",
        "type": "toggle",
        "values": [
          "Izgaralı",
          "Izgarasız"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "700W",
          "800W",
          "900W",
          "950W",
          "1000W"
        ]
      },
      {
        "key": "capacity_lt",
        "label_tr": "Kapasite (Litre)",
        "type": "checkbox",
        "values": [
          "20L",
          "23L",
          "28L",
          "32L",
          "40L"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 8150,
        "max": 22000
      }
    ]
  },
  {
    "id": "ankastre-ocak",
    "name_tr": "Ankastre Ocaklar",
    "name_en": "Built-in Hobs",
    "product_count": 5,
    "price_range": {
      "min": 10000,
      "max": 30000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "stove_type",
        "label_tr": "Yakıt Tipi",
        "type": "checkbox",
        "values": [
          "Gazlı",
          "Elektrikli",
          "Seramik",
          "İndüksiyon",
          "Karma"
        ]
      },
      {
        "key": "surface",
        "label_tr": "Yüzey",
        "type": "checkbox",
        "values": [
          "Cam",
          "Emaye",
          "Paslanmaz Çelik"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 10000,
        "max": 30000
      }
    ]
  },
  {
    "id": "ankastre-firin",
    "name_tr": "Ankastre Fırınlar",
    "name_en": "Built-in Ovens",
    "product_count": 7,
    "price_range": {
      "min": 5500,
      "max": 36000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "PHILIPS",
          "Samsung"
        ]
      },
      {
        "key": "capacity_lt",
        "label_tr": "Kapasite (Litre)",
        "type": "checkbox",
        "values": [
          "60L",
          "65L",
          "68L",
          "70L",
          "75L"
        ]
      },
      {
        "key": "program_count",
        "label_tr": "Program Sayısı",
        "type": "checkbox",
        "values": [
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10+"
        ]
      },
      {
        "key": "oven_fuel",
        "label_tr": "Enerji Tipi",
        "type": "checkbox",
        "values": [
          "Elektrikli",
          "Gazlı"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 5500,
        "max": 36000
      }
    ]
  },
  {
    "id": "ankastre-davlumbaz",
    "name_tr": "Ankastre Davlumbazlar",
    "name_en": "Built-in Range Hoods",
    "product_count": 5,
    "price_range": {
      "min": 10000,
      "max": 20000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "hood_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Duvar",
          "Ada",
          "Aspiratör",
          "Kebapçı",
          "Döşeme Altı"
        ]
      },
      {
        "key": "width_cm",
        "label_tr": "Genişlik",
        "type": "checkbox",
        "values": [
          "60 cm",
          "90 cm"
        ],
        "unit": "cm"
      },
      {
        "key": "surface",
        "label_tr": "Yüzey",
        "type": "checkbox",
        "values": [
          "Cam",
          "Emaye",
          "Paslanmaz Çelik"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 10000,
        "max": 20000
      }
    ]
  },
  {
    "id": "bulasik-makinesi",
    "name_tr": "Bulaşık Makineleri",
    "name_en": "Dishwashers",
    "product_count": 4,
    "price_range": {
      "min": 27000,
      "max": 40000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "dishwasher_type",
        "label_tr": "Montaj Tipi",
        "type": "checkbox",
        "values": [
          "Solo",
          "Yarı Ankastre",
          "Ankastre"
        ]
      },
      {
        "key": "program_count",
        "label_tr": "Program Sayısı",
        "type": "checkbox",
        "values": [
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10+"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 27000,
        "max": 40000
      }
    ]
  },
  {
    "id": "derin-dondurucu",
    "name_tr": "Derin Dondurucular",
    "name_en": "Freezers",
    "product_count": 8,
    "price_range": {
      "min": 22000,
      "max": 49500
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "LG",
          "MIDEA",
          "Samsung"
        ]
      },
      {
        "key": "freezer_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Sandık Tipi",
          "Dikey"
        ]
      },
      {
        "key": "capacity_lt",
        "label_tr": "Kapasite (Litre)",
        "type": "price_range",
        "min": 100,
        "max": 400,
        "unit": "lt"
      },
      {
        "key": "inverter",
        "label_tr": "Inverter",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "no_frost",
        "label_tr": "No-Frost",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 22000,
        "max": 49500
      }
    ]
  },
  {
    "id": "buzdolabi",
    "name_tr": "Buzdolapları",
    "name_en": "Refrigerators",
    "product_count": 18,
    "price_range": {
      "min": 4900,
      "max": 90000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "LG",
          "Samsung",
          "Sharp",
          "SHARP"
        ]
      },
      {
        "key": "fridge_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Normal",
          "Side by Side",
          "French Door",
          "Mini Bar",
          "Alttan Derin Donduruculu"
        ]
      },
      {
        "key": "capacity_lt",
        "label_tr": "Kapasite",
        "type": "price_range",
        "min": 100,
        "max": 700,
        "unit": "lt"
      },
      {
        "key": "inverter",
        "label_tr": "Inverter",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "no_frost",
        "label_tr": "No-Frost",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "water_dispenser",
        "label_tr": "Su Pınarı",
        "type": "toggle",
        "values": [
          "Var",
          "Yok"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox",
          "Titanyum"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 4900,
        "max": 90000
      }
    ]
  },
  {
    "id": "camasir-makinesi",
    "name_tr": "Çamaşır Makineleri",
    "name_en": "Washing Machines",
    "product_count": 2,
    "price_range": {
      "min": 25500,
      "max": 66500
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "capacity_kg",
        "label_tr": "Kapasite (kg)",
        "type": "checkbox",
        "values": [
          "7 kg",
          "8 kg",
          "9 kg",
          "10 kg",
          "12 kg"
        ]
      },
      {
        "key": "inverter",
        "label_tr": "Inverter Motor",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "has_dryer",
        "label_tr": "Kurutmalı",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 25500,
        "max": 66500
      }
    ]
  },
  {
    "id": "kurutma-makinesi",
    "name_tr": "Kurutma Makineleri",
    "name_en": "Dryers",
    "product_count": 1,
    "price_range": {
      "min": 50000,
      "max": 50000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Samsung"
        ]
      },
      {
        "key": "capacity_kg",
        "label_tr": "Kapasite (kg)",
        "type": "checkbox",
        "values": [
          "7 kg",
          "8 kg",
          "9 kg",
          "10 kg",
          "12 kg"
        ]
      },
      {
        "key": "inverter",
        "label_tr": "Isı Pompalı/Inverter",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş/İnox"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 50000,
        "max": 50000
      }
    ]
  },
  {
    "id": "supurge",
    "name_tr": "Süpürgeler",
    "name_en": "Vacuum Cleaners",
    "product_count": 2,
    "price_range": {
      "min": 3300,
      "max": 6375
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Lydsto",
          "Samsung"
        ]
      },
      {
        "key": "vacuum_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Şarjlı",
          "Kablolu",
          "Robot"
        ]
      },
      {
        "key": "bagless",
        "label_tr": "Toz Torbasız",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "600W",
          "700W",
          "800W",
          "850W",
          "1000W",
          "1200W",
          "1800W",
          "2000W+"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Mavi",
          "Kırmızı"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 3300,
        "max": 6375
      }
    ]
  },
  {
    "id": "vantilatör",
    "name_tr": "Vantilatörler",
    "name_en": "Fans",
    "product_count": 1,
    "price_range": {
      "min": 3500,
      "max": 3500
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "MIDEA"
        ]
      },
      {
        "key": "fan_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Ayaklı",
          "Masa Tipi",
          "Tavan",
          "Duvar"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gri"
        ]
      },
      {
        "key": "remote",
        "label_tr": "Kumanda",
        "type": "toggle",
        "values": [
          "Kumandali",
          "Kumandasız"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 3500,
        "max": 3500
      }
    ]
  },
  {
    "id": "klima",
    "name_tr": "Klimalar",
    "name_en": "Air Conditioners",
    "product_count": 12,
    "price_range": {
      "min": 20000,
      "max": 145000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "AUX",
          "BOSCH",
          "LG",
          "Samsung"
        ]
      },
      {
        "key": "ac_type",
        "label_tr": "Tip",
        "type": "checkbox",
        "values": [
          "Split",
          "Portatif",
          "ArtCool"
        ]
      },
      {
        "key": "btu",
        "label_tr": "Kapasite (BTU)",
        "type": "checkbox",
        "values": [
          "9000 BTU",
          "12000 BTU",
          "18000 BTU",
          "24000 BTU",
          "36000 BTU"
        ]
      },
      {
        "key": "inverter",
        "label_tr": "Inverter",
        "type": "toggle",
        "values": [
          "Evet",
          "Hayır"
        ]
      },
      {
        "key": "wifi",
        "label_tr": "Wi-Fi Kontrol",
        "type": "toggle",
        "values": [
          "Wi-Fi'li",
          "Wi-Fi'siz"
        ]
      },
      {
        "key": "color",
        "label_tr": "Renk",
        "type": "checkbox",
        "values": [
          "Beyaz",
          "Siyah",
          "Gümüş"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 20000,
        "max": 145000
      }
    ]
  },
  {
    "id": "konvektor-isitici",
    "name_tr": "Konvektör Isıtıcılar",
    "name_en": "Convector Heaters",
    "product_count": 9,
    "price_range": {
      "min": 12800,
      "max": 18000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Atlantic",
          "ATLANTIC",
          "Bosch",
          "Cevesa"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "500W",
          "750W",
          "1000W",
          "1250W",
          "1500W",
          "2000W",
          "2500W"
        ]
      },
      {
        "key": "heater_mount",
        "label_tr": "Montaj",
        "type": "checkbox",
        "values": [
          "Taşınabilir",
          "Duvar Tipi"
        ]
      },
      {
        "key": "wifi",
        "label_tr": "Wi-Fi/Akıllı",
        "type": "toggle",
        "values": [
          "Wi-Fi'li",
          "Wi-Fi'siz"
        ]
      },
      {
        "key": "thermostat",
        "label_tr": "Termostat",
        "type": "toggle",
        "values": [
          "Var",
          "Yok"
        ]
      },
      {
        "key": "timer",
        "label_tr": "Zamanlayıcı",
        "type": "toggle",
        "values": [
          "Var",
          "Yok"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 12800,
        "max": 18000
      }
    ]
  },
  {
    "id": "voltaj-regulatoru",
    "name_tr": "Voltaj Regülatörleri",
    "name_en": "Voltage Regulators",
    "product_count": 2,
    "price_range": {
      "min": 5000,
      "max": 5000
    },
    "filters": [
      {
        "key": "brand",
        "label_tr": "Marka",
        "type": "checkbox",
        "values": [
          "Mervesan"
        ]
      },
      {
        "key": "watt",
        "label_tr": "Güç (Watt)",
        "type": "checkbox",
        "values": [
          "1000W",
          "2000W",
          "3000W",
          "5000W",
          "10000W"
        ]
      },
      {
        "key": "price",
        "label_tr": "Fiyat Aralığı",
        "type": "price_range",
        "min": 5000,
        "max": 5000
      }
    ]
  }
]

// Helper: get filter config by category ID
export function getFilterConfig(categoryId: string): CategoryFilterConfig | undefined {
  return FILTER_TREE.find(c => c.id === categoryId)
}

// All category IDs for routing
export const CATEGORY_IDS = FILTER_TREE.map(c => c.id)

// Global filters (applied on every category)
export const GLOBAL_FILTERS: FilterOption[] = [
  {
    key: 'price',
    label_tr: 'Fiyat Aralığı',
    label_en: 'Price Range',
    type: 'price_range',
    min: 500,
    max: 444000,
  },
  {
    key: 'brand',
    label_tr: 'Marka',
    label_en: 'Brand',
    type: 'checkbox',
    values: [
      'Samsung', 'LG', 'MIDEA', 'PHILIPS', 'ATLANTIC', 'BOSCH', 'TOSHIBA',
      'SHARP', 'JBL', 'KRUPS', 'AUX', 'Tefal', 'Indesit', 'Cevesa',
      'Mervesan', 'BRATECK', 'SILVERCREST', 'SONOROUS', 'VONTECH', 'MAG',
      'MASTER X', 'U GREEN', 'PREMIUM', 'SONY', 'TCL', 'XIAOMI',
    ],
  },
  {
    key: 'in_stock',
    label_tr: 'Stok Durumu',
    label_en: 'Availability',
    type: 'toggle',
    values: ['Stokta Var', 'Tümü'],
  },
  {
    key: 'on_sale',
    label_tr: 'Sadece İndirimli',
    label_en: 'On Sale Only',
    type: 'toggle',
    values: ['Evet', 'Hayır'],
  },
]
