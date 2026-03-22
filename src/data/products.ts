// =============================================================
// ZORLU.PLUS — ÜRÜN VERİ KATALOĞU
// Kaynak: wc-product-export-4-3-2026 (219 ürün)
// Tüm ürünler zenginleştirilmiş özelliklerle birlikte
// =============================================================

export interface Product {
  id: number
  name: string
  sku: string
  category: string
  brand: string
  price: number | null
  sale_price: number | null
  in_stock: boolean
  short_desc: string
  image: string
  slug: string
  attrs: Record<string, string | number | boolean>
}

export const PRODUCTS: Product[] = [
  {
    "id": 7742,
    "name": "PHILIPS BUHAR İSTASYONLU ÜTÜ",
    "sku": "ZD-IRON",
    "category": "Diğer Ürünler",
    "brand": "Philips",
    "price": 8500.0,
    "sale_price": 7500.0,
    "in_stock": true,
    "short_desc": "BUHAR İSTASYONLU ÜTÜ",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/PHILIPS-BUHAR-ISTASYONLU-UTU.png",
    "slug": "philips-buhar-i-stasyonlu--t-",
    "attrs": {}
  },
  {
    "id": 7745,
    "name": "AUX PORTATİF KLİMA",
    "sku": "ZD-PAC",
    "category": "İklimlendirme",
    "brand": "AUX",
    "price": 20000.0,
    "sale_price": 17900.0,
    "in_stock": true,
    "short_desc": "PORTATİF KLİMA",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/0703010046-1_552x552_pad_478b24840a.jpg",
    "slug": "aux-portati-f-kli-ma",
    "attrs": {
      "ac_type": "Portatif"
    }
  },
  {
    "id": 7747,
    "name": "ATLANTIC KONVEKTÖR ISITICI",
    "sku": "ZD-Heaters",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Atlantic",
    "price": 12900.0,
    "sale_price": 8500.0,
    "in_stock": true,
    "short_desc": "KONVEKTÖR ISITICI",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/33cc21cd2a9c-f120-d-packshot-face.jpg",
    "slug": "atlantic-konvekt-r-isitici",
    "attrs": {
      "heater_mount": "Taşınabilir"
    }
  },
  {
    "id": 7772,
    "name": "JBL 2.1 DEEP BASS SOUNDBAR",
    "sku": "ZD-AUDIO-JBL-SOUNDBARS",
    "category": "Video / Audio > Soundbarlar",
    "brand": "JBL",
    "price": 24650.0,
    "sale_price": 18800.0,
    "in_stock": true,
    "short_desc": "SOUNDBAR",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/JBL_Bar_2.1_Deep_Bass_Hero_0167.png",
    "slug": "jbl-2-1-deep-bass-soundbar",
    "attrs": {
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 8084,
    "name": "MERVESAN Voltaj Regülatörü",
    "sku": "",
    "category": "Diğer Ürünler",
    "brand": "Mervesan",
    "price": 5000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Otomatik Voltaj Regülatörü",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/a.png",
    "slug": "mervesan-voltaj-reg-lat-r-",
    "attrs": {}
  },
  {
    "id": 8085,
    "name": "HDMI 2.1 Cable 1,5 m",
    "sku": "",
    "category": "Oyun > Aksesuar",
    "brand": "MASTER X",
    "price": 1300.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Ultra HD 8K HDMI Cable",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/masterx-mx-18938-8k-60hz-ultra-hd-1.5-metre-hdmi-kablo-kcm23796079-1-6c6cf856462844beb597eb2b9d399824.jpg",
    "slug": "hdmi-2-1-cable-1-5-m",
    "attrs": {}
  },
  {
    "id": 8086,
    "name": "HDMI 2.1 Cable 2m",
    "sku": "",
    "category": "Oyun > Aksesuar",
    "brand": "U GREEN",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Ultra HD 8K HDMI Cable",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/712zRvk3ayL.jpg",
    "slug": "hdmi-2-1-cable-2m",
    "attrs": {}
  },
  {
    "id": 8087,
    "name": "HDMI 2.1 Cable 3m",
    "sku": "",
    "category": "Oyun > Aksesuar",
    "brand": "PREMIUM",
    "price": 1750.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Ultra HD 8K HDMI Cable",
    "image": "https://zorluplus.com/wp-content/uploads/2025/11/4_88fc079c-1202-4dea-bc4c-7742b3176f0f.jpg",
    "slug": "hdmi-2-1-cable-3m",
    "attrs": {}
  },
  {
    "id": 8093,
    "name": "MERVESAN Voltaj Regülatörü",
    "sku": "ZD-ACC-AUTVREG",
    "category": "Diğer Ürünler",
    "brand": "Mervesan",
    "price": 5000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Otomatik Voltaj Regülatörü",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/a.png",
    "slug": "mervesan-voltaj-reg-lat-r-",
    "attrs": {}
  },
  {
    "id": 8095,
    "name": "JBL KULAK İÇİ KABLOSUZ KULAKLIK",
    "sku": "ZD-AUDIO-JBL-EAR",
    "category": "Video / Audio > Kulaklıklar",
    "brand": "JBL",
    "price": 2150.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "KABLOSUZ BT KULAKLIK",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/JBL-T115T.png",
    "slug": "jbl-kulak-i--i--kablosuz-kulaklik",
    "attrs": {
      "audio_type": "Kulaklık"
    }
  },
  {
    "id": 8097,
    "name": "MIDEA ÜSTTEN DAMACANALI YARIM BOY MASA ÜSTÜ SU SEBİLİ",
    "sku": "ZD-WD-MIDEA1",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 4999.0,
    "sale_price": 3350.0,
    "in_stock": true,
    "short_desc": "ÜSTTEN DAMACANALI SU SEBİLİ",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/gallery1-8-.webp",
    "slug": "midea--stten-damacanali-yarim-boy-masa--st--su-sebi-li-",
    "attrs": {
      "water_type": "Üstten Damacanalı",
      "water_size": "Yarım Boy"
    }
  },
  {
    "id": 8098,
    "name": "KRUPS 1100 W PROAROMA FILTRE KAHVE MAKINESİ",
    "sku": "ZD-CMPKRUPS1",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "KRUPS",
    "price": 3850.0,
    "sale_price": 3100.0,
    "in_stock": true,
    "short_desc": "FİLTRE KAHVE MAKİNESİ",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/0040065-image1-500x500-1.jpg",
    "slug": "krups-1100-w-proaroma-filtre-kahve-makinesi-",
    "attrs": {}
  },
  {
    "id": 8101,
    "name": "PHILIPS 1000 W MULTI COOKER",
    "sku": "ZD-PHCP1",
    "category": "Ankastre > Fırınlar",
    "brand": "PHILIPS",
    "price": 5500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "ÇOKLU PİŞİRİCİ",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/0705010060-multikukyr-hd4713-40-1300-w-60-programi-3-d-sistema-za-nagrjavane-5-sloen-syd-philips-1.jpg",
    "slug": "philips-1000-w-multi-cooker",
    "attrs": {
      "color": "Beyaz"
    }
  },
  {
    "id": 8102,
    "name": "SAMSUNG 800 W ANKASTRE MİKRODALGA FIRIN",
    "sku": "ZD-MWO-BI",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 16000.0,
    "sale_price": 13950.0,
    "in_stock": true,
    "short_desc": "MİKRODALGA FIRIN",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/404698599.jpg",
    "slug": "samsung-800-w-ankastre-mi-krodalga-firin",
    "attrs": {
      "watt": 800,
      "microwave_type": "Ankastre",
      "color": "Beyaz",
      "oven_type": "Ankastre"
    }
  },
  {
    "id": 8103,
    "name": "SAMSUNG ANKASTRE ELEKTRİKLİ SERAMİK OCAK",
    "sku": "ZD-COOKER-BI",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 22500.0,
    "sale_price": 19000.0,
    "in_stock": true,
    "short_desc": "ELEKTRİKLİ SERAMİK OCAK",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/4415.jpg",
    "slug": "samsung-ankastre-elektri-kli--serami-k-ocak",
    "attrs": {
      "stove_type": "Elektrikli Seramik",
      "oven_type": "Ankastre"
    }
  },
  {
    "id": 8108,
    "name": "MIDEA SANDIK TİPİ DERİN DONDURUCU",
    "sku": "ZD-DF-SOLO",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "MIDEA",
    "price": 24500.0,
    "sale_price": 17500.0,
    "in_stock": true,
    "short_desc": "DERİN DONDURUCU",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/71I-12qk3L._AC_SL1500_.jpg",
    "slug": "midea-sandik-ti-pi--deri-n-dondurucu",
    "attrs": {
      "freezer_type": "Sandık Tipi"
    }
  },
  {
    "id": 8109,
    "name": "SHARP MINI BAR BUZDOLABI",
    "sku": "ZD-MB-SOLO",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "SHARP",
    "price": 4900.0,
    "sale_price": 4500.0,
    "in_stock": true,
    "short_desc": "MİNİ BAR BUZDOLABI",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/51Jo0XTGcML._AC_SL1500_.jpg",
    "slug": "sharp-mini-bar-buzdolabi",
    "attrs": {
      "fridge_type": "Mini Bar"
    }
  },
  {
    "id": 8110,
    "name": "SAMSUNG INVERTER NO FROST BUZDOLABI",
    "sku": "ZD-REFRIGERATOR-3",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 26500.0,
    "sale_price": 22500.0,
    "in_stock": true,
    "short_desc": "BUZDOLABI",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/tm-mt-bmt-1108-rt-0245_88-058710a0.webp",
    "slug": "samsung-inverter-no-frost-buzdolabi",
    "attrs": {
      "fridge_type": "Normal",
      "inverter": true,
      "no_frost": true
    }
  },
  {
    "id": 8114,
    "name": "SAMSUNG 9 KG ÇAMAŞIR MAKİNESİ",
    "sku": "ZD-WM",
    "category": "Beyaz Eşya > Çamaşır Makineleri",
    "brand": "Samsung",
    "price": 25500.0,
    "sale_price": 23900.0,
    "in_stock": true,
    "short_desc": "ÇAMAŞIR MAKİNESİ",
    "image": "https://zorluplus.com/wp-content/uploads/2025/12/62f96140-a786-4681-a844-e8c2ed34f638.jpg",
    "slug": "samsung-9-kg--ama-ir-maki-nesi-",
    "attrs": {
      "capacity_kg": 9
    }
  },
  {
    "id": 8537,
    "name": "AUX PORTATİF KLİMA",
    "sku": "ZD-PAC-AUX",
    "category": "İklimlendirme",
    "brand": "AUX",
    "price": 20000.0,
    "sale_price": 17900.0,
    "in_stock": true,
    "short_desc": "PORTATİF KLİMA",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/AUX-PORTATIF-KLIMA.avif",
    "slug": "aux-portati-f-kli-ma",
    "attrs": {
      "ac_type": "Portatif"
    }
  },
  {
    "id": 8538,
    "name": "ATLANTIC KONVEKTÖR ISITICI",
    "sku": "ZD-Heaters-ATL",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Atlantic",
    "price": 12900.0,
    "sale_price": 8500.0,
    "in_stock": true,
    "short_desc": "KONVEKTÖR ISITICI",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/ATLANTIC-KONVEKTOR-ISITICI.avif",
    "slug": "atlantic-konvekt-r-isitici",
    "attrs": {
      "heater_mount": "Taşınabilir"
    }
  },
  {
    "id": 8539,
    "name": "Samsung DV90DG52A0AB 9 KG Heatpump Kurutma Makinesi",
    "sku": "SAM-DV90DG52A0AB",
    "category": "Beyaz Eşya > Kurutma Makineleri",
    "brand": "Samsung",
    "price": 50000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "9 kg Isı Pompası Kurutma Makinesi, A Enerji Sınıfı, SmartThings",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-DV90DG52A0AB-9-KG-Heatpump-Kurutma-Makinesi.avif",
    "slug": "samsung-dv90dg52a0ab-9-kg-heatpump-kurutma-makinesi",
    "attrs": {
      "capacity_kg": 9,
      "inverter": true
    }
  },
  {
    "id": 8540,
    "name": "Lydsto H3 Toz Torbasız Şarjlı El Süpürgesi",
    "sku": "LYD-H3",
    "category": "Ev Aletleri > Süpürgeler",
    "brand": "Lydsto",
    "price": 3300.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "120W Maksimum Güç, Kablosuz El Süpürgesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/110000168750065.jpg",
    "slug": "lydsto-h3-toz-torbas-z--arjl--el-s-p-rgesi",
    "attrs": {
      "vacuum_type": "Şarjlı",
      "bagless": true
    }
  },
  {
    "id": 8541,
    "name": "Philips PSG2000/20 Buharlı İstasyonlu Ütü",
    "sku": "PHI-PSG2000/20",
    "category": "Ev Aletleri > Ütüler",
    "brand": "Philips",
    "price": 8500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "2400W Buharlı Ütü, 6 Bar Basınç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-PSG200020-Buharli-Istasyonlu-Utu.avif",
    "slug": "philips-psg2000-20-buharl--i-stasyonlu--t-",
    "attrs": {}
  },
  {
    "id": 8542,
    "name": "Samsung VCC4550S3R AirTrack 850W Toz Torbasız Süpürge",
    "sku": "SAM-VCC4550S3R",
    "category": "Ev Aletleri > Süpürgeler",
    "brand": "Samsung",
    "price": 6375.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "850W Elektrikli Süpürge, AirTrack Teknolojisi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/1_org.webp",
    "slug": "samsung-vcc4550s3r-airtrack-850w-toz-torbas-z-s-p-rge",
    "attrs": {
      "watt": 850,
      "vacuum_type": "Kablolu",
      "bagless": true,
      "color": "Beyaz"
    }
  },
  {
    "id": 8543,
    "name": "Samsung AR18BXHQASISK/SK 18000 BTU Inverter Klima",
    "sku": "SAM-AR18BXHQASISK",
    "category": "İklimlendirme > Klimalar",
    "brand": "Samsung",
    "price": 27000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "18000 BTU Inverter Duvar Tipi Klima, A++",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/samsung-ar18txhqasi-air-conditioner-18000-btu-inverter-heat-pump-maximum-surface-area-90-m.jpg",
    "slug": "samsung-ar18bxhqasisk-sk-18000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8544,
    "name": "Atlantic F120 Design Konvektör Isıtıcı",
    "sku": "ATL-F120",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Atlantic",
    "price": 12800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "2000W Konvektör Panel Isıtıcı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Atlantic-F120-Design-Konvektor-Isitici.jpg",
    "slug": "atlantic-f120-design-konvekt-r-is-t-c-",
    "attrs": {
      "heater_mount": "Taşınabilir"
    }
  },
  {
    "id": 8545,
    "name": "Indesit NCAA 55 cm 208 LT Statik Derin Dondurucu Buzdolabı",
    "sku": "IND-NCAA55",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Indesit",
    "price": 22000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "208 LT Çift Kapılı Statik Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Indesit-NCAA-55-cm-208-LT-Statik-Derin-Dondurucu-Buzdolabi.jpg",
    "slug": "indesit-ncaa-55-cm-208-lt-statik-derin-dondurucu-buzdolab-",
    "attrs": {
      "capacity_lt": 208,
      "fridge_type": "Normal"
    }
  },
  {
    "id": 8546,
    "name": "Samsung RF50N5970B1 535 LT French Door No Frost Buzdolabı",
    "sku": "SAM-RF50N5970B1",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 75000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "535 LT French Door Buzdolabı, No Frost",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RF50N5970B1-535-LT-French-Door-No-Frost-Buzdolabi.jpg",
    "slug": "samsung-rf50n5970b1-535-lt-french-door-no-frost-buzdolab-",
    "attrs": {
      "capacity_lt": 535,
      "fridge_type": "French Door",
      "no_frost": true
    }
  },
  {
    "id": 8547,
    "name": "LG GSBV70SWTM 655 LT Inverter Side By Side Buzdolabı",
    "sku": "LG-GSBV70SWTM",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "LG",
    "price": 66000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "655 LT Side By Side No Frost Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GSBV70SWTM-655-LT-Inverter-Side-By-Side-Buzdolabi.jpg",
    "slug": "lg-gsbv70swtm-655-lt-inverter-side-by-side-buzdolab-",
    "attrs": {
      "capacity_lt": 655,
      "fridge_type": "Side by Side",
      "inverter": true
    }
  },
  {
    "id": 8548,
    "name": "Bosch HC 4000-20 2000W Konvektör Isıtıcı",
    "sku": "BOS-HC4000-20",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Bosch",
    "price": 12800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "2000W Elektrikli Konvektör Panel",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Bosch-HC-4000-20-2000W-Konvektor-Isitici.avif",
    "slug": "bosch-hc-4000-20-2000w-konvekt-r-is-t-c-",
    "attrs": {
      "watt": 2000,
      "heater_mount": "Taşınabilir"
    }
  },
  {
    "id": 8549,
    "name": "Tesy FinEco Cloud Konvektör Isıtıcı",
    "sku": "TES-FinEco",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "",
    "price": 12800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "FinEco Cloud Wi-Fi Konvektör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Tesy-FinEco-Cloud-Konvektor-Isitici.jpg.webp",
    "slug": "tesy-fineco-cloud-konvekt-r-is-t-c-",
    "attrs": {
      "heater_mount": "Taşınabilir",
      "wifi": true
    }
  },
  {
    "id": 8550,
    "name": "Samsung RS64DG53R3B1F 635 LT Side By Side Buzdolabı",
    "sku": "SAM-RS64DG53R3B1F",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 88000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "635 LT Side By Side No Frost Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RS64DG53R3B1F-635-LT-Side-By-Side-Buzdolabi.png.webp",
    "slug": "samsung-rs64dg53r3b1f-635-lt-side-by-side-buzdolab-",
    "attrs": {
      "capacity_lt": 635,
      "fridge_type": "Side by Side"
    }
  },
  {
    "id": 8551,
    "name": "Samsung WW90T654DBE/S7 9 KG Inverter Çamaşır Makinesi",
    "sku": "SAM-WW90T654DBE",
    "category": "Beyaz Eşya > Çamaşır Makineleri",
    "brand": "Samsung",
    "price": 66500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "9 kg EcoBubble Inverter Çamaşır Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-WW90T654DBES7-9-KG-Inverter-Camasir-Makinesi.avif",
    "slug": "samsung-ww90t654dbe-s7-9-kg-inverter--ama--r-makinesi",
    "attrs": {
      "capacity_kg": 9,
      "inverter": true,
      "color": "Beyaz"
    }
  },
  {
    "id": 8552,
    "name": "Krups KP17110NDG Nescafé Dolce Gusto Infinissima Beyaz Kahve Makinesi",
    "sku": "KRU-KP17110NDG",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Krups",
    "price": 6100.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "15 Bar Pompa, Ristretto-Espresso-Lungo-Cappuccino",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Krups-KP17110NDG-Nescafe-Dolce.png",
    "slug": "krups-kp17110ndg-nescaf--dolce-gusto-infinissima-beyaz-kahve-makinesi",
    "attrs": {
      "coffee_type": "Kapsüllü"
    }
  },
  {
    "id": 8553,
    "name": "Krups KP440E10 Nescafé Dolce Gusto Genio Touch Silver Kahve Makinesi",
    "sku": "KRU-KP440E10",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Krups",
    "price": 7250.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "15 Bar Pompa, Dokunmatik Ekran, Ristretto-Cappuccino",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Krups-KP440E10-Nescafe-Dolce-Gusto-Genio-Touch-Silver-Kahve-Makinesi.jpg",
    "slug": "krups-kp440e10-nescaf--dolce-gusto-genio-touch-silver-kahve-makinesi",
    "attrs": {
      "coffee_type": "Kapsüllü"
    }
  },
  {
    "id": 8554,
    "name": "Tefal CM6931 1000W 1.25L Filtre Kahve Makinesi",
    "sku": "TEF-CM6931",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Tefal",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Otomatik Filtreleme, 10 Bardak Kapasite",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Tefal-CM6931-1000W-1.25L-Filtre-Kahve-Makinesi.jpg",
    "slug": "tefal-cm6931-1000w-1-25l-filtre-kahve-makinesi",
    "attrs": {}
  },
  {
    "id": 8555,
    "name": "Philips HD4713 5L 1000W Multi Cooker (Çok Amaçlı Pişirici)",
    "sku": "PHI-HD4713",
    "category": "Mutfak Aletleri > Pişiriciler",
    "brand": "Philips",
    "price": 6500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "5L Kapasite, 18 Güvenlik Sistemi, Çocuk Kilidi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/PHILIPS-HD4713-Multicooker-All-in-One-Cooker-Series-3000-1.5L-1000W-White_Silver.webp",
    "slug": "philips-hd4713-5l-1000w-multi-cooker---ok-ama-l--pi-irici-",
    "attrs": {}
  },
  {
    "id": 8556,
    "name": "Samsung NA64N7100AB Gazlı Ankastre Cam Ocak",
    "sku": "SAM-NA64N7100AB",
    "category": "Ankastre > Ocaklar",
    "brand": "Samsung",
    "price": 16000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60cm 4 Göz Gazlı, Cam Yüzey",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NA64N7100AB-Gazli-Ankastre-Cam-Ocak.avif",
    "slug": "samsung-na64n7100ab-gazl--ankastre-cam-ocak",
    "attrs": {
      "stove_type": "Gazlı",
      "surface": "Cam"
    }
  },
  {
    "id": 8557,
    "name": "Samsung NV60K5140BW 60L 7 Programlı Ankastre Elektrikli Fırın",
    "sku": "SAM-NV60K5140BW",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60L Turbo Fırın, Beyaz Cam",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NV60K5140BW-60L-7-Programli-Ankastre-Elektrikli-Firin.avif",
    "slug": "samsung-nv60k5140bw-60l-7-programl--ankastre-elektrikli-f-r-n",
    "attrs": {
      "capacity_lt": 60,
      "program_count": 7,
      "oven_type": "Ankastre",
      "color": "Beyaz"
    }
  },
  {
    "id": 8558,
    "name": "Samsung DW60M5070FW 7 Programlı Solo Bulaşık Makinesi",
    "sku": "SAM-DW60M5070FW",
    "category": "Beyaz Eşya > Bulaşık Makineleri",
    "brand": "Samsung",
    "price": 27500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "14 Kişilik, Enerji Performanslı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-DW60M5070FW-7-Programli-Solo-Bulasik-Makinesi.avif",
    "slug": "samsung-dw60m5070fw-7-programl--solo-bula--k-makinesi",
    "attrs": {
      "program_count": 7,
      "dishwasher_type": "Solo",
      "color": "Beyaz"
    }
  },
  {
    "id": 8559,
    "name": "Philips HD9252/90 Essential 4.1L Air Fryer",
    "sku": "PHI-HD9252",
    "category": "Mutfak Aletleri > Air Fryer",
    "brand": "Philips",
    "price": 5555.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Yağsız Pişirme, Wi-Fi Bağlantılı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD925290-Essential-4.1L-Air-Fryer.jpg",
    "slug": "philips-hd9252-90-essential-4-1l-air-fryer",
    "attrs": {
      "capacity_lt": 1
    }
  },
  {
    "id": 8560,
    "name": "Philips HD9650/90 XXL 7.3L Air Fryer",
    "sku": "PHI-HD9650",
    "category": "Mutfak Aletleri > Air Fryer",
    "brand": "Philips",
    "price": 13500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Büyük Kapasite Yağsız Pişirme",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD965090-XXL-7.3L-Air-Fryer.jpg",
    "slug": "philips-hd9650-90-xxl-7-3l-air-fryer",
    "attrs": {
      "capacity_lt": 3
    }
  },
  {
    "id": 8562,
    "name": "LG GC-J257SQSC 611 LT Side By Side No Frost Buzdolabı",
    "sku": "LG-GC-J257SQSC",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "LG",
    "price": 75000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "611 LT Side By Side Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GC-J257SQSC-611-LT-Side-By-Side-No-Frost-Buzdolabi.avif",
    "slug": "lg-gc-j257sqsc-611-lt-side-by-side-no-frost-buzdolab-",
    "attrs": {
      "capacity_lt": 611,
      "fridge_type": "Side by Side",
      "no_frost": true
    }
  },
  {
    "id": 8563,
    "name": "Samsung RH65A5401M9 628 LT SBS Inverter No Frost Buzdolabı",
    "sku": "SAM-RH65A5401M9",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 90000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "628 LT Side By Side Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RH65A5401M9-628-LT-SBS-Inverter-No-Frost-Buzdolabi.jpg",
    "slug": "samsung-rh65a5401m9-628-lt-sbs-inverter-no-frost-buzdolab-",
    "attrs": {
      "capacity_lt": 628,
      "fridge_type": "Side by Side",
      "inverter": true,
      "no_frost": true,
      "color": "Siyah"
    }
  },
  {
    "id": 8564,
    "name": "Samsung RS67A8810WW 634 LT SBS Inverter No Frost Buzdolabı",
    "sku": "SAM-RS67A8810WW",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 74000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "634 LT Side By Side Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RS67A8810WW-634-LT-SBS-Inverter-No-Frost-Buzdolabi.avif",
    "slug": "samsung-rs67a8810ww-634-lt-sbs-inverter-no-frost-buzdolab-",
    "attrs": {
      "capacity_lt": 634,
      "fridge_type": "Side by Side",
      "inverter": true,
      "no_frost": true,
      "color": "Beyaz"
    }
  },
  {
    "id": 8565,
    "name": "Samsung RS62DG5003S9EF 655 LT SBS Inverter No Frost Buzdolabı",
    "sku": "SAM-RS62DG5003S9EF",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 70000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "655 LT Side By Side Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RS62DG5003S9EF-655-LT-SBS-Inverter-No-Frost-Buzdolabi.avif",
    "slug": "samsung-rs62dg5003s9ef-655-lt-sbs-inverter-no-frost-buzdolab-",
    "attrs": {
      "capacity_lt": 655,
      "fridge_type": "Side by Side",
      "inverter": true,
      "no_frost": true,
      "color": "Siyah"
    }
  },
  {
    "id": 8566,
    "name": "Samsung RT35CG5000WW 348 LT Inverter Buzdolabı",
    "sku": "SAM-RT35CG5000WW",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "348 LT Inverter Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RT35CG5000WW-348-LT-Inverter-Buzdolabi.avif",
    "slug": "samsung-rt35cg5000ww-348-lt-inverter-buzdolab-",
    "attrs": {
      "capacity_lt": 348,
      "fridge_type": "Normal",
      "inverter": true,
      "color": "Beyaz"
    }
  },
  {
    "id": 8567,
    "name": "LG GN-B332SQBB 350 LT Inverter Buzdolabı",
    "sku": "LG-GN-B332SQBB",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "LG",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "350 LT Inverter Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GN-B332SQBB-350-LT-Inverter-Buzdolabi.jpg",
    "slug": "lg-gn-b332sqbb-350-lt-inverter-buzdolab-",
    "attrs": {
      "capacity_lt": 350,
      "fridge_type": "Normal",
      "inverter": true
    }
  },
  {
    "id": 8568,
    "name": "LG GN-B392SMBB 413 LT Inverter Buzdolabı",
    "sku": "LG-GN-B392SMBB",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "LG",
    "price": 42500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "413 LT Inverter Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GN-B392SMBB-413-LT-Inverter-Buzdolabi.avif",
    "slug": "lg-gn-b392smbb-413-lt-inverter-buzdolab-",
    "attrs": {
      "capacity_lt": 413,
      "fridge_type": "Normal",
      "inverter": true
    }
  },
  {
    "id": 8569,
    "name": "Samsung RT38CG6404S9 388 LT Inverter Buzdolabı",
    "sku": "SAM-RT38CG6404S9",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 42500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "388 LT Inverter Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RT38CG6404S9-388-LT-Inverter-Buzdolabi.avif",
    "slug": "samsung-rt38cg6404s9-388-lt-inverter-buzdolab-",
    "attrs": {
      "capacity_lt": 388,
      "fridge_type": "Normal",
      "inverter": true,
      "color": "Siyah"
    }
  },
  {
    "id": 8570,
    "name": "LG GTF412PGSZ 355 LT Inverter No Frost Derin Dondurucu",
    "sku": "LG-GTF412PGSZ",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "LG",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "355 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GTF412PGSZ-355-LT-Inverter-No-Frost-Derin-Dondurucu.webp",
    "slug": "lg-gtf412pgsz-355-lt-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8571,
    "name": "Samsung RZ32M71207F 315 LT Inverter No Frost Derin Dondurucu",
    "sku": "SAM-RZ32M71207F",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "Samsung",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "315 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RZ32M71207F-315-LT-Inverter-No-Frost-Derin-Dondurucu.webp",
    "slug": "samsung-rz32m71207f-315-lt-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8572,
    "name": "Samsung RZ32A7485AP 323 LT Ankastre Inverter No Frost Derin Dondurucu",
    "sku": "SAM-RZ32A7485AP",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "Samsung",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "323 LT Ankastre Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RZ32A7485AP-323-LT-Ankastre-Inverter-No-Frost-Derin-Dondurucu.jpg.webp",
    "slug": "samsung-rz32a7485ap-323-lt-ankastre-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8573,
    "name": "Samsung RZ32M7120WW 315 LT Inverter No Frost Derin Dondurucu",
    "sku": "SAM-RZ32M7120WW",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "Samsung",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "315 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RZ32M7120WW-315-LT-Inverter-No-Frost-Derin-Dondurucu.webp",
    "slug": "samsung-rz32m7120ww-315-lt-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8574,
    "name": "Samsung DW60DG540FSR 4 Programlı Solo Bulaşık Makinesi",
    "sku": "SAM-DW60DG540FSR",
    "category": "Beyaz Eşya > Bulaşık Makineleri",
    "brand": "Samsung",
    "price": 27000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "4 Programlı Solo Bulaşık Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-DW60DG540FSR-4-Programli-Solo-Bulasik-Makinesi.avif",
    "slug": "samsung-dw60dg540fsr-4-programl--solo-bula--k-makinesi",
    "attrs": {
      "program_count": 4,
      "dishwasher_type": "Solo"
    }
  },
  {
    "id": 8575,
    "name": "LG GN-304SL 168 LT Statik Inverter Derin Dondurucu",
    "sku": "LG-GN-304SL",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "LG",
    "price": 22000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "168 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GN-304SL-168-LT-Statik-Inverter-Derin-Dondurucu.avif",
    "slug": "lg-gn-304sl-168-lt-statik-inverter-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8576,
    "name": "Samsung NV60K3140BS Ankastre Elektrikli Fırın",
    "sku": "SAM-NV60K3140BS",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 17000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60L 7 Programlı Turbo Fırın",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NV60K3140BS-Ankastre-Elektrikli-Firin.webp",
    "slug": "samsung-nv60k3140bs-ankastre-elektrikli-f-r-n",
    "attrs": {
      "oven_type": "Ankastre",
      "color": "Siyah"
    }
  },
  {
    "id": 8577,
    "name": "Samsung MG23K3515AS 800W Izgaralı Solo Mikrodalga Fırın",
    "sku": "SAM-MG23K3515AS",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 8900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG23K3515AS-800W-Izgarali-Solo-Mikrodalga-Firin.avif",
    "slug": "samsung-mg23k3515as-800w-izgaral--solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8578,
    "name": "Samsung MS28F301TAK 800W Solo Mikrodalga Fırın",
    "sku": "SAM-MS28F301TAK",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 13000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "28L Solo Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MS28F301TAK-800W-Solo-Mikrodalga-Firin.jpg",
    "slug": "samsung-ms28f301tak-800w-solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8579,
    "name": "Krups F30901 1050W 1.25L Pro Aroma Filtre Kahve Makinesi",
    "sku": "KRU-F30901",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Krups",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "1.25L Filtre Kahve Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Krups-F30901-1050W-1.25L-Pro-Aroma-Filtre-Kahve-Makinesi.jpg",
    "slug": "krups-f30901-1050w-1-25l-pro-aroma-filtre-kahve-makinesi",
    "attrs": {}
  },
  {
    "id": 8580,
    "name": "Krups KM3210BU 1100W 1.25L ProAroma Plus Filtre Kahve Makinesi",
    "sku": "KRU-KM3210BU",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Krups",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "1.25L Filtre Kahve Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Krups-KM3210BU-1100W-1.25L-ProAroma-Plus-Filtre-Kahve-Makinesi.avif",
    "slug": "krups-km3210bu-1100w-1-25l-proaroma-plus-filtre-kahve-makinesi",
    "attrs": {}
  },
  {
    "id": 8581,
    "name": "Krups KM6008 1000W 1.25L Smart'n Filtre Kahve Makinesi",
    "sku": "KRU-KM6008",
    "category": "Mutfak Aletleri > Kahve Makineleri",
    "brand": "Krups",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "1.25L Smart Filtre Kahve Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Krups-KM6008-1000W-1.25L-Smartn-Filtre-Kahve-Makinesi.jpg",
    "slug": "krups-km6008-1000w-1-25l-smart-n-filtre-kahve-makinesi",
    "attrs": {}
  },
  {
    "id": 8582,
    "name": "Philips HD2151 5L 1000W Multi Cooker",
    "sku": "PHI-HD2151",
    "category": "Mutfak Aletleri > Pişiriciler",
    "brand": "Philips",
    "price": 12500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "5L Çok Amaçlı Pişirici",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD2151-5L-1000W-Multi-Cooker.webp",
    "slug": "philips-hd2151-5l-1000w-multi-cooker",
    "attrs": {}
  },
  {
    "id": 8583,
    "name": "Philips HD9255/60 Essential Connected 4.1L Air Fryer",
    "sku": "PHI-HD9255/60",
    "category": "Mutfak Aletleri > Air Fryer",
    "brand": "Philips",
    "price": 5555.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "4.1L Yağsız Fritöz, Wi-Fi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD925560-Essential-Connected-4.1L-Air-Fryer.webp",
    "slug": "philips-hd9255-60-essential-connected-4-1l-air-fryer",
    "attrs": {
      "capacity_lt": 1,
      "wifi": true
    }
  },
  {
    "id": 8584,
    "name": "Philips HD9280/90 Connected 6.2L Air Fryer XL",
    "sku": "PHI-HD9280/90",
    "category": "Mutfak Aletleri > Air Fryer",
    "brand": "Philips",
    "price": 11650.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "6.2L Yağsız Fritöz XL, Wi-Fi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD928090-Connected-6.2L-Air-Fryer-XL.webp",
    "slug": "philips-hd9280-90-connected-6-2l-air-fryer-xl",
    "attrs": {
      "capacity_lt": 2,
      "wifi": true
    }
  },
  {
    "id": 8585,
    "name": "Philips HD9650/90 Avance Collection 7.3L Air Fryer XXL",
    "sku": "PHI-HD9650/90",
    "category": "Mutfak Aletleri > Air Fryer",
    "brand": "Philips",
    "price": 13500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "7.3L Yağsız Fritöz XXL",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Philips-HD965090-Avance-Collection-7.3L-Air-Fryer-XXL.webp",
    "slug": "philips-hd9650-90-avance-collection-7-3l-air-fryer-xxl",
    "attrs": {
      "capacity_lt": 3
    }
  },
  {
    "id": 8586,
    "name": "Sharp SJ-K75X-SL3 Mini Bar Buzdolabı",
    "sku": "SHA-SJ-K75X-SL3",
    "category": "Beyaz Eşya > Mini Buzdolapları",
    "brand": "Sharp",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "47L Mini Bar Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Sharp-SJ-K75X-SL3-Mini-Bar-Buzdolabi.webp",
    "slug": "sharp-sj-k75x-sl3-mini-bar-buzdolab-",
    "attrs": {
      "fridge_type": "Mini Bar"
    }
  },
  {
    "id": 8587,
    "name": "Sharp SJ-K75X-WH3 Mini Bar Buzdolabı",
    "sku": "SHA-SJ-K75X-WH3",
    "category": "Beyaz Eşya > Mini Buzdolapları",
    "brand": "Sharp",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "47L Mini Bar Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Sharp-SJ-K75X-WH3-Mini-Bar-Buzdolabi.jpg",
    "slug": "sharp-sj-k75x-wh3-mini-bar-buzdolab-",
    "attrs": {
      "fridge_type": "Mini Bar",
      "color": "Beyaz"
    }
  },
  {
    "id": 8588,
    "name": "Midea YL1633S Gizli Damacanalı Yarım Boy Su Sebili",
    "sku": "MID-YL1633S",
    "category": "Beyaz Eşya > Su Sebilleri, Mutfak Aletleri > Su Sebilleri",
    "brand": "Midea",
    "price": 5000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sıcak-Soğuk Su Sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Midea-YL1633S-Gizli-Damacanali-Yarim-Boy-Su-Sebili.jpg",
    "slug": "midea-yl1633s-gizli-damacanal--yar-m-boy-su-sebili",
    "attrs": {}
  },
  {
    "id": 8589,
    "name": "Midea YL1917SAE-W Üstten Damacanalı Su Sebili",
    "sku": "MID-YL1917SAE-W",
    "category": "Mutfak Aletleri > Su Sebilleri",
    "brand": "Midea",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sıcak-Soğuk Su Sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Midea-YL1917SAE-W-Ustten-Damacanali-Su-Sebili.jpg",
    "slug": "midea-yl1917sae-w--stten-damacanal--su-sebili",
    "attrs": {}
  },
  {
    "id": 8590,
    "name": "Midea YL2037SB Üstten Damacanalı Su Sebili",
    "sku": "MID-YL2037SB",
    "category": "Beyaz Eşya > Su Sebilleri, Mutfak Aletleri > Su Sebilleri",
    "brand": "MIDEA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sıcak-Soğuk Su Sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Midea-YL2037SB-Ustten-Damacanali-Su-Sebili.jpg",
    "slug": "midea-yl2037sb--stten-damacanal--su-sebili",
    "attrs": {}
  },
  {
    "id": 8591,
    "name": "Midea YL1917SAE-BK Üstten Damacanalı Su Sebili",
    "sku": "MID-YL1917SAE-BK",
    "category": "Mutfak Aletleri > Su Sebilleri, Beyaz Eşya > Su Sebilleri",
    "brand": "Midea",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sıcak-Soğuk Su Sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/YL1917S-.png",
    "slug": "midea-yl1917sae-bk--stten-damacanal--su-sebili",
    "attrs": {}
  },
  {
    "id": 8592,
    "name": "Samsung NK24N7060VB 60 CM Ankastre Dekoratif Cam Davlumbaz",
    "sku": "SAM-NK24N7060VB",
    "category": "Ankastre > Davlumbazlar",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Cam Davlumbaz",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NK24N7060VB-60-CM-Ankastre-Dekoratif-Cam-Davlumbaz.jpg",
    "slug": "samsung-nk24n7060vb-60-cm-ankastre-dekoratif-cam-davlumbaz",
    "attrs": {
      "width_cm": 60,
      "surface": "Cam"
    }
  },
  {
    "id": 8593,
    "name": "Samsung NK24M7060VW 60 CM Ankastre Dekoratif Cam Davlumbaz",
    "sku": "SAM-NK24M7060VW",
    "category": "Ankastre > Davlumbazlar",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Cam Davlumbaz",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NK24M7060VW-60-CM-Ankastre-Dekoratif-Cam-Davlumbaz.jpg",
    "slug": "samsung-nk24m7060vw-60-cm-ankastre-dekoratif-cam-davlumbaz",
    "attrs": {
      "width_cm": 60,
      "surface": "Cam",
      "color": "Beyaz"
    }
  },
  {
    "id": 8594,
    "name": "Samsung NV68A1140BS 68 LT 6 Programlı Ankastre Elektrikli Turbo Fırın",
    "sku": "SAM-NV68A1140BS",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 28000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "68 LT Turbo Fırın",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NV68A1140BS-68-LT-6-Programli-Ankastre-Elektrikli-Turbo-Firin.jpg",
    "slug": "samsung-nv68a1140bs-68-lt-6-programl--ankastre-elektrikli-turbo-f-r-n",
    "attrs": {
      "capacity_lt": 68,
      "program_count": 6,
      "oven_type": "Ankastre",
      "turbo": true,
      "color": "Siyah"
    }
  },
  {
    "id": 8595,
    "name": "Samsung NV75J3140BS 75 LT 6 Programlı Ankastre Elektrikli Turbo Fırın",
    "sku": "SAM-NV75J3140BS",
    "category": "Ankastre > Fırınlar",
    "brand": "Samsung",
    "price": 36000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "75 LT Turbo Fırın",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NV75J3140BS-75-LT-6-Programli-Ankastre-Elektrikli-Turbo-Firin.avif",
    "slug": "samsung-nv75j3140bs-75-lt-6-programl--ankastre-elektrikli-turbo-f-r-n",
    "attrs": {
      "capacity_lt": 75,
      "program_count": 6,
      "oven_type": "Ankastre",
      "turbo": true,
      "color": "Siyah"
    }
  },
  {
    "id": 8596,
    "name": "Samsung NK24M1030IS 60 CM Ankastre Aspiratör",
    "sku": "SAM-NK24M1030IS",
    "category": "Ankastre > Davlumbazlar",
    "brand": "Samsung",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Aspiratör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NK24M1030IS-60-CM-Ankastre-Aspirator.avif",
    "slug": "samsung-nk24m1030is-60-cm-ankastre-aspirat-r",
    "attrs": {
      "width_cm": 60,
      "color": "Gümüş/İnox"
    }
  },
  {
    "id": 8597,
    "name": "Samsung NK24M3050PS 60 CM Ankastre Kebabci Davlumbaz",
    "sku": "SAM-NK24M3050PS",
    "category": "Ankastre > Davlumbazlar",
    "brand": "Samsung",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Kebabci Davlumbaz",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NK24M3050PS-60-CM-Ankastre-Kebabci-Davlumbaz.png",
    "slug": "samsung-nk24m3050ps-60-cm-ankastre-kebabci-davlumbaz",
    "attrs": {
      "width_cm": 60,
      "color": "Gümüş/İnox"
    }
  },
  {
    "id": 8598,
    "name": "Samsung NK24M5070CS 60 CM Ankastre Davlumbaz",
    "sku": "SAM-NK24M5070CS",
    "category": "Ankastre > Davlumbazlar",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Davlumbaz",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NK24M5070CS-60-CM-Ankastre-Davlumbaz.avif",
    "slug": "samsung-nk24m5070cs-60-cm-ankastre-davlumbaz",
    "attrs": {
      "width_cm": 60
    }
  },
  {
    "id": 8599,
    "name": "Samsung C61R2AAST Ankastre Elektrikli Seramik Ocak",
    "sku": "SAM-C61R2AAST",
    "category": "Ankastre > Ocaklar",
    "brand": "Samsung",
    "price": 25000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Seramik Ocak",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/samsung-ctr464eb01-seramik-elektrikli-z.webp",
    "slug": "samsung-c61r2aast-ankastre-elektrikli-seramik-ocak",
    "attrs": {}
  },
  {
    "id": 8600,
    "name": "Samsung NZ64H37075K Ankastre Elektrikli Seramik Indüksiyonlu Ocak",
    "sku": "SAM-NZ64H37075K",
    "category": "Ankastre > Ocaklar",
    "brand": "Samsung",
    "price": 30000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Indüksiyonlu Ocak",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/samsung-ctr464eb01-seramik-elektrikli-z-1.webp",
    "slug": "samsung-nz64h37075k-ankastre-elektrikli-seramik-ind-ksiyonlu-ocak",
    "attrs": {}
  },
  {
    "id": 8601,
    "name": "Samsung NA64B3100AS/T Ankastre Emaye Gaz Ocak",
    "sku": "SAM-NA64B3100AS/T",
    "category": "Ankastre > Ocaklar",
    "brand": "Samsung",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Emaye Gaz Ocak",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/samsung-na64b3100as-gazli-ankastre-ocak-silver-91391958-sw2000sh2000.webp",
    "slug": "samsung-na64b3100as-t-ankastre-emaye-gaz-ocak",
    "attrs": {
      "stove_type": "Gazlı",
      "surface": "Emaye"
    }
  },
  {
    "id": 8602,
    "name": "Samsung NA64M7100AW Gazlı Ankastre Cam Ocak",
    "sku": "SAM-NA64M7100AW",
    "category": "Ankastre > Ocaklar",
    "brand": "Samsung",
    "price": 16000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "60 CM Cam Gaz Ocak",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-NA64M7100AW-Gazli-Ankastre-Cam-Ocak.webp",
    "slug": "samsung-na64m7100aw-gazl--ankastre-cam-ocak",
    "attrs": {
      "stove_type": "Gazlı",
      "surface": "Cam",
      "color": "Beyaz"
    }
  },
  {
    "id": 8603,
    "name": "Samsung MG402MADXB B 950W Izgaralı Solo Mikrodalga Fırın",
    "sku": "SAM-MG402MADXB B",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 14350.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "40L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG402MADXB-B-950W-Izgarali-Solo-Mikrodalga-Firin.avif",
    "slug": "samsung-mg402madxb-b-950w-izgaral--solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8604,
    "name": "Samsung MG40J5133T 900W Izgaralı Solo Mikrodalga Fırın",
    "sku": "SAM-MG40J5133T",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 14350.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "40L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG40J5133T-900W-Izgarali-Solo-Mikrodalga-Firin.webp",
    "slug": "samsung-mg40j5133t-900w-izgaral--solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8605,
    "name": "Samsung MS23A7013AT Ankastre Mikrodalga Fırın",
    "sku": "SAM-MS23A7013AT",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 21000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Solo Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MS23A7013AT-Ankastre-Mikrodalga-Firin.avif",
    "slug": "samsung-ms23a7013at-ankastre-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8606,
    "name": "Samsung MG23A7013CT Ankastre Izgaralı Mikrodalga Fırın",
    "sku": "SAM-MG23A7013CT",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 22000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG23A7013CT-Ankastre-Izgarali-Mikrodalga-Firin.webp",
    "slug": "samsung-mg23a7013ct-ankastre-izgaral--mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8607,
    "name": "Samsung MG23A7013CB Ankastre Izgaralı Mikrodalga Fırın",
    "sku": "SAM-MG23A7013CB",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 22000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG23A7013CB-Ankastre-Izgarali-Mikrodalga-Firin.jpg",
    "slug": "samsung-mg23a7013cb-ankastre-izgaral--mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8608,
    "name": "Samsung MS20A3010AL 700W Solo Mikrodalga Fırın",
    "sku": "SAM-MS20A3010AL",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 8150.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "20L Solo Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MS20A3010AL-700W-Solo-Mikrodalga-Firin.jpg",
    "slug": "samsung-ms20a3010al-700w-solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8609,
    "name": "Samsung MG23F301TAK 800W Izgaralı Solo Mikrodalga Fırın",
    "sku": "SAM-MG23F301TAK",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 8900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG23F301TAK-800W-Izgarali-Solo-Mikrodalga-Firin.jpg",
    "slug": "samsung-mg23f301tak-800w-izgaral--solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8610,
    "name": "Samsung MG23K3515CK 800W Izgaralı Solo Mikrodalga Fırın",
    "sku": "SAM-MG23K3515CK",
    "category": "Mutfak Aletleri > Mikrodalga",
    "brand": "Samsung",
    "price": 9500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "23L Izgaralı Mikrodalga",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-MG23K3515CK-800W-Izgarali-Solo-Mikrodalga-Firin.webp",
    "slug": "samsung-mg23k3515ck-800w-izgaral--solo-mikrodalga-f-r-n",
    "attrs": {}
  },
  {
    "id": 8611,
    "name": "Samsung DW60M6040SS/EG 6 Programlı Yarı Ankastre Bulaşık Makinesi",
    "sku": "SAM-DW60M6040SS/EG",
    "category": "Beyaz Eşya > Bulaşık Makineleri",
    "brand": "Samsung",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "6 Programlı Bulaşık Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-DW60M6040SSEG-6-Programli-Yari-Ankastre-Bulasik-Makinesi.avif",
    "slug": "samsung-dw60m6040ss-eg-6-programl--yar--ankastre-bula--k-makinesi",
    "attrs": {
      "program_count": 6,
      "dishwasher_type": "Yarı Ankastre"
    }
  },
  {
    "id": 8612,
    "name": "Samsung RR39M7310F 375 LT Inverter No Frost Su Pınarli Buzdolabı",
    "sku": "SAM-RR39M7310F",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 62000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "375 LT Su Pınarli Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RR39M7310F-375-LT-Inverter-No-Frost-Su-Pinarli-Buzdolabi.webp",
    "slug": "samsung-rr39m7310f-375-lt-inverter-no-frost-su-p-narli-buzdolab-",
    "attrs": {
      "capacity_lt": 375,
      "fridge_type": "Normal",
      "inverter": true,
      "no_frost": true,
      "water_dispenser": true
    }
  },
  {
    "id": 8613,
    "name": "Samsung RZ32T740505 323LT Inverter No Frost Derin Dondurucu",
    "sku": "SAM-RZ32T740505",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "Samsung",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "323 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RZ32T740505-323LT-Inverter-No-Frost-Derin-Dondurucu.avif",
    "slug": "samsung-rz32t740505-323lt-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8614,
    "name": "Samsung RZ32T740501 323LT Inverter No Frost Derin Dondurucu",
    "sku": "SAM-RZ32T740501",
    "category": "Beyaz Eşya > Derin Dondurucular",
    "brand": "Samsung",
    "price": 49500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "323 LT Derin Dondurucu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/samsung-RZ32T740501-323LT-.png",
    "slug": "samsung-rz32t740501-323lt-inverter-no-frost-derin-dondurucu",
    "attrs": {}
  },
  {
    "id": 8615,
    "name": "Samsung RR39M7310WW 375 LT Inverter No Frost Su Pınarli Buzdolabı",
    "sku": "SAM-RR39M7310WW",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "Samsung",
    "price": 62000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "375 LT Su Pınarli Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-RR39M7310WW-375-LT-Inverter-No-Frost-Su-Pinarli-Buzdolabi.webp",
    "slug": "samsung-rr39m7310ww-375-lt-inverter-no-frost-su-p-narli-buzdolab-",
    "attrs": {
      "capacity_lt": 375,
      "fridge_type": "Normal",
      "inverter": true,
      "no_frost": true,
      "water_dispenser": true,
      "color": "Beyaz"
    }
  },
  {
    "id": 8616,
    "name": "LG GN-B332SQGB 350 LT Inverter Buzdolabı",
    "sku": "LG-GN-B332SQGB",
    "category": "Beyaz Eşya > Buz Dolapları",
    "brand": "LG",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "350 LT Inverter Buzdolabı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-GN-B332SQGB-350-LT-Inverter-Buzdolabi.jpg",
    "slug": "lg-gn-b332sqgb-350-lt-inverter-buzdolab-",
    "attrs": {
      "capacity_lt": 350,
      "fridge_type": "Normal",
      "inverter": true
    }
  },
  {
    "id": 8617,
    "name": "Toshiba RWF-1766TU Üstten Damacanalı Beyaz Su Sebili",
    "sku": "TOS-RWF-1766TU",
    "category": "Mutfak Aletleri > Su Sebilleri, Beyaz Eşya > Su Sebilleri",
    "brand": "Toshiba",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sıcak-Soğuk Su Sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Toshiba-RWF-1766TU-Ustten-Damacanali-Beyaz-Su-Sebili.webp",
    "slug": "toshiba-rwf-1766tu--stten-damacanal--beyaz-su-sebili",
    "attrs": {}
  },
  {
    "id": 8618,
    "name": "Samsung DW60M6031BB 7 Programlı Tam Ankastre Bulaşık Makinesi",
    "sku": "SAM-DW60M6031BB",
    "category": "Beyaz Eşya > Bulaşık Makineleri",
    "brand": "Samsung",
    "price": 35000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "7 Programlı Bulaşık Makinesi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-DW60M6031BB-7-Programli-Tam-Ankastre-Bulasik-Makinesi.avif",
    "slug": "samsung-dw60m6031bb-7-programl--tam-ankastre-bula--k-makinesi",
    "attrs": {
      "program_count": 7,
      "dishwasher_type": "Ankastre"
    }
  },
  {
    "id": 8764,
    "name": "Samsung 32\" (80 cm) LED TV",
    "sku": "UE32T5372C-1",
    "category": "Diğer Ürünler",
    "brand": "Samsung",
    "price": 14900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Full HD (1920x1080) çözünürlük\\n\\n\\n\\nSmart TV uygulama desteği\\n\\n\\n\\nTizen işletim sistemi\\n\\n\\n\\nHDMI ve USB bağlantı girişleri\\n\\n\\n\\nWi‑Fi bağlantı desteği",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/SAMSUNG-UE32T5372C.png",
    "slug": "samsung-32---80-cm--led-tv",
    "attrs": {
      "screen_size_inch": 32,
      "panel_type": "LED"
    }
  },
  {
    "id": 8765,
    "name": "LG 32\" (80 cm) LED TV",
    "sku": "32LQ63806LC-1",
    "category": "Diğer Ürünler",
    "brand": "LG",
    "price": 12700.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Full HD (1920x1080) çözünürlük\\n\\n\\n\\nHDR10 Pro desteği\\n\\n\\n\\nwebOS Smart TV işletim sistemi\\n\\n\\n\\nHDMI ve USB bağlantıları\\n\\n\\n\\nWi‑Fi ve Bluetooth desteği",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/LG-32LQ63806LC-1.png",
    "slug": "lg-32---80-cm--led-tv",
    "attrs": {
      "screen_size_inch": 32,
      "panel_type": "LED"
    }
  },
  {
    "id": 8800,
    "name": "Midea FS4019K Ayaklı Vantilatör",
    "sku": "FS4019K",
    "category": "Küçük Ev Aletleri > Vantilatör",
    "brand": "MIDEA",
    "price": 3500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "16 inç, 3 hız kademesi, salınım, ayarlanabilir yükseklik",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/2-Midea-FS4019K-Ayakli-Vantilator-16-inc.jpg",
    "slug": "midea-fs4019k-ayakl--vantilat-r",
    "attrs": {
      "fan_type": "Ayaklı"
    }
  },
  {
    "id": 8801,
    "name": "AUX AM-H12A4 MAR2-EU 12000 BTU Portatif Klima",
    "sku": "AM-H12A4-MAR2-EU",
    "category": "İklimlendirme > Klimalar > Portatif Klima",
    "brand": "AUX",
    "price": 23500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "12000 BTU, R290 doğa dostu gaz, mobil kullanım, uzaktan kumanda, uyku modu",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/3-AUX-12000-BTU-Portatif-Klima.png",
    "slug": "aux-am-h12a4-mar2-eu-12000-btu-portatif-klima",
    "attrs": {}
  },
  {
    "id": 8802,
    "name": "LG A12GA2 Artcool New Gallery Premium 12000 BTU Dual Inverter Klima",
    "sku": "A12GA2",
    "category": "İklimlendirme > Klimalar",
    "brand": "LG",
    "price": 120000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "12000 BTU Dual Inverter klima, R32 doğa dostu gaz, Smart ThinQ (Wi-Fi), 6 kademeli hava akışı, dijital fotoğraf çerçeveli panel, hızlı soğutma ve yüksek ısıtma performansı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/4-LG-A12GA2-Artcool-New-Gallery-Premium-12000-BTU-Dual-Inverter-Klima.png",
    "slug": "lg-a12ga2-artcool-new-gallery-premium-12000-btu-dual-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8803,
    "name": "LG AC24BH 24000 BTU Dual Inverter Artcool Klima",
    "sku": "AC24BH",
    "category": "İklimlendirme > Klimalar > Split Klima",
    "brand": "LG",
    "price": 55000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Dual Inverter, R32 gaz, Wi-Fi, A++ enerji, hızlı soğutma",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/6-LG-AC24BH-24000-BTU-Dual-Inverter-Artcool-Klima.png",
    "slug": "lg-ac24bh-24000-btu-dual-inverter-artcool-klima",
    "attrs": {}
  },
  {
    "id": 8804,
    "name": "Samsung AR09 WindFree 9000 BTU Inverter Klima",
    "sku": "AR09BSFCMWKNER",
    "category": "İklimlendirme > Klimalar > Split Klima",
    "brand": "Samsung",
    "price": 22900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "WindFree teknolojisi, SmartThings, sessiz çalışma, R410A",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/8-Samsung-AR09BSFCMWKNER-9000-BTU-Inverter-WindFree-Klima.png",
    "slug": "samsung-ar09-windfree-9000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8805,
    "name": "Samsung AR12TXHQASIN 12000 BTU Inverter Klima",
    "sku": "AR12TXHQASINEU",
    "category": "İklimlendirme > Klimalar > Split Klima",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "R32 gaz, A++ enerji, sessiz mod, otomatik temizlik",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/9-Samsung-AR12TXHQASINEU-12.000-BTU-Inverter-Klima.png",
    "slug": "samsung-ar12txhqasin-12000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8806,
    "name": "Samsung AR18BXHQASI 18000 BTU Inverter Klima",
    "sku": "AR18BXHQASI-SK",
    "category": "İklimlendirme > Klimalar > Split Klima",
    "brand": "Samsung",
    "price": 27000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "R32 gaz, HD filtre, uyku modu, otomatik temizleme",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/10-Samsung-AR18BXHQASISK-18.000-BTU-Inverter-Klima.png",
    "slug": "samsung-ar18bxhqasi-18000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8807,
    "name": "Samsung AR24BXHQASI 24000 BTU Inverter Klima",
    "sku": "AR24BXHQASI-SK",
    "category": "İklimlendirme > Klimalar > Split Klima",
    "brand": "Samsung",
    "price": 38000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "R32 gaz, A++ enerji, otomatik temizlik, yüksek performans",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/12-Samsung-AR24BXHQASISK-24.000-BTU-Inverter-Klima.png",
    "slug": "samsung-ar24bxhqasi-24000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8808,
    "name": "Samsung 24000 BTU Inverter Klima",
    "sku": "AR12",
    "category": "İklimlendirme > Klimalar",
    "brand": "Samsung",
    "price": 85000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Dual Inverter 2400 BTU\n\\nÇift Katmanlı\n\\n6 Kademeli Hava Akışı\n\\nGizli Led Ekran",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Screenshot-2026-01-22-at-5.52.50-PM.png",
    "slug": "samsung-24000-btu-inverter-klima",
    "attrs": {}
  },
  {
    "id": 8809,
    "name": "Atlantic F120 Design 2000W Konvektör Isıtıcı",
    "sku": "F120-2000",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "ATLANTIC",
    "price": 16000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "2000W konvektör ısıtıcı, hızlı ısınma, duvar ve ayaklı kullanım, modern tasarım, güvenli ısıtma",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/13-Atlantic-F120-Design-2000W-Konvektor-Isitici.png",
    "slug": "atlantic-f120-design-2000w-konvekt-r-is-t-c-",
    "attrs": {
      "watt": 2000,
      "heater_mount": "Taşınabilir"
    }
  },
  {
    "id": 8810,
    "name": "Atlantic F120 Design Duvar Tipi Elektrikli Isıtıcı",
    "sku": "F120-DUVAR",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "ATLANTIC",
    "price": 16500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Duvar tipi elektrikli ısıtıcı, 2000W güç, ince tasarım, termostat kontrollü, sessiz çalışma",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/14-Atlantic-F120-Design-Duvar-Tipi-Elektrikli-Isitici.webp",
    "slug": "atlantic-f120-design-duvar-tipi-elektrikli-is-t-c-",
    "attrs": {
      "heater_mount": "Duvar Tipi"
    }
  },
  {
    "id": 8811,
    "name": "Teasy Fineco Cloud Elektrikli Isıtıcı",
    "sku": "FINECO",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Cevesa",
    "price": 18000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Akıllı elektrikli ısıtıcı, Wi-Fi kontrol, enerji verimli çalışma, modern tasarım, sessiz kullanım",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/15-teasy-fineco-cloud.jpg.webp",
    "slug": "teasy-fineco-cloud-elektrikli-is-t-c-",
    "attrs": {
      "heater_mount": "Taşınabilir",
      "wifi": true
    }
  },
  {
    "id": 8812,
    "name": "Bosch HC 4000-20 Klima",
    "sku": "HC4000",
    "category": "İklimlendirme > Klimalar",
    "brand": "BOSCH",
    "price": 145000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Yüksek verimli split klima, inverter teknoloji, güçlü soğutma ve ısıtma, Bosch kalite standartları",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/19-Bosch-HC-4000-20-Klima.png",
    "slug": "bosch-hc-4000-20-klima",
    "attrs": {}
  },
  {
    "id": 8813,
    "name": "Teasy Liveco Cloud Elektrikli Isıtıcı",
    "sku": "LIVECO",
    "category": "İklimlendirme > Isıtıcılar",
    "brand": "Cevesa",
    "price": 17000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Wi-Fi kontrollü elektrikli ısıtıcı, modern cloud tasarım, düşük enerji tüketimi, sessiz çalışma",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/16-teasy-liveco-cloud.jpg",
    "slug": "teasy-liveco-cloud-elektrikli-is-t-c-",
    "attrs": {
      "heater_mount": "Taşınabilir",
      "wifi": true
    }
  },
  {
    "id": 9052,
    "name": "Samsung 32” Led TV",
    "sku": "UE32T5372C",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 16000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "1920×1080p Full HD çözünürlük, 1000 PQI ekran yenileme hızı, PurColor renk teknolojisi, HDR10 desteği, HyperReal işlemci, 2×HDMI ve 1×USB bağlantı girişi, 2 kanallı 10W ses çıkışı, 4 çekirdekli Quad Core işlemci, Tizen 55 işletim sistemi, Screen Mirroring ekran paylaşımı, 50 Hz yenileme hızı, Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2032E2809D20Led20TV20UE32T5372C.png",
    "slug": "samsung-32--led-tv",
    "attrs": {
      "panel_type": "LED"
    }
  },
  {
    "id": 9058,
    "name": "LG 43” NanoCell TV",
    "sku": "43NANO81T3A",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 21000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, NanoCell ekran teknolojisi, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, 4K Active HDR teknolojisi, WebOS 24 işletim sistemi, Google Assistant ve ThinQ AI desteği, 50 Hz yenileme hızı, Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu-TV-Tempalte.png",
    "slug": "lg-43--nanocell-tv",
    "attrs": {}
  },
  {
    "id": 9060,
    "name": "Samsung 43” 4K Led TV",
    "sku": "UE43U8020F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 17000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2043E2809D204K20Led20TV20UE43U8020F.png",
    "slug": "samsung-43--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9053,
    "name": "Samsung 43” 4K QLED TV",
    "sku": "QE430Q8F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 22000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renkler, HDR10+ ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "",
    "slug": "samsung-43--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9062,
    "name": "Samsung 48” OLED TV",
    "sku": "QE48S90D",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 53000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED ekran teknolojisi, 120 Hz ekran yenileme hızı, HDR10+ desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos destekli ses sistemi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-48-OLED-TV-QE48S90D.png",
    "slug": "samsung-48--oled-tv",
    "attrs": {
      "panel_type": "OLED"
    }
  },
  {
    "id": 9064,
    "name": "Samsung 50” 4K Led TV",
    "sku": "UE50U8020F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 21000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2050E2809D204K20Led20TV20UE50U8020F.png",
    "slug": "samsung-50--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9066,
    "name": "Samsung 50” 4K Led TV",
    "sku": "UE50DU8072",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 20000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2050E2809D204K20Led20TV20UE50DU8072.png",
    "slug": "samsung-50--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9054,
    "name": "Samsung 50” 4K QLED TV",
    "sku": "QE50Q60D",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 23900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renkler, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, 4 çekirdekli AI işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "",
    "slug": "samsung-50--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9068,
    "name": "Samsung 50” 4K QLED TV",
    "sku": "QE50Q7",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 25000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renkler, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, 4 çekirdekli AI işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2050E2809D204K20QLED20TV20QE50Q7.png",
    "slug": "samsung-50--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9070,
    "name": "Samsung 50” 4K QLED TV",
    "sku": "QE50Q80D",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 29000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Direct Full Array aydınlatma, 120 Hz ekran yenileme hızı, Quantum Dot renk teknolojisi, HDR10+ ve HLG desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos destekli güçlü ses sistemi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu Pro ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2050E2809D204K20QLED20TV20QE50Q80D.png",
    "slug": "samsung-50--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9072,
    "name": "Samsung 50” 4K QLED TV",
    "sku": "QE50Q8F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 32000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renkler, HDR10+ ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-50-4K-QLED-TV-QE50Q8F.png",
    "slug": "samsung-50--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9076,
    "name": "Samsung 55” 4K Led TV",
    "sku": "UE55U8200F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 23000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2055E2809D204K20Led20TV20UE55U8200F.png",
    "slug": "samsung-55--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9080,
    "name": "Samsung 55” 4K QLED TV",
    "sku": "QE55Q7FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 27000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renk teknolojisi, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2055E2809D204K20QLED20TV20QE55Q7FA20.png",
    "slug": "samsung-55--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9082,
    "name": "LG 55” NanoCell TV",
    "sku": "55NANO81T3A",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 28000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, NanoCell ekran teknolojisi, 50 Hz ekran yenileme hızı, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, α5 Gen6 AI 4K işlemci, WebOS 23 işletim sistemi, Google Assistant ve ThinQ AI desteği, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_LG2055E2809D20NanoCell20TV2055NANO81T3A.png",
    "slug": "lg-55--nanocell-tv",
    "attrs": {}
  },
  {
    "id": 9084,
    "name": "LG 55” 4K QNED TV",
    "sku": "55QNED80T3A",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 32000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, QNED ekran teknolojisi, 50 Hz ekran yenileme hızı, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, α5 Gen6 AI 4K işlemci, WebOS işletim sistemi, Google Assistant ve ThinQ AI desteği, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_LG2055E2809D204K20QNED20TV2055QNED80T3A.png",
    "slug": "lg-55--4k-qned-tv",
    "attrs": {
      "panel_type": "QNED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9086,
    "name": "Samsung 55” Neo QLED TV",
    "sku": "QE55QN70FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 100 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 4×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound+ ses teknolojisi, Q Symphony uyumu, Neural Quantum 4K işlemci, Tizen işletim sistemi, Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2055E2809D20Neo20QLED20TV20QE55QN70FA20.png",
    "slug": "samsung-55--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9090,
    "name": "Samsung 55” OLED TV",
    "sku": "QE55S90C",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 53500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED ekran teknolojisi, 120 Hz ekran yenileme hızı, HDR10+ desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Smart TV ve Oyun Modu özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2055E2809D20OLED20TV20QE55S90C.png",
    "slug": "samsung-55--oled-tv",
    "attrs": {
      "panel_type": "OLED"
    }
  },
  {
    "id": 9092,
    "name": "Samsung 65” 4K Led TV",
    "sku": "UE65U8000F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 29000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2065E2809D204K20Led20TV20UE65U8072F.png",
    "slug": "samsung-65--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9093,
    "name": "Samsung 65” 4K QLED TV",
    "sku": "QE65Q6F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 33330.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renk teknolojisi, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "",
    "slug": "samsung-65--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9094,
    "name": "Samsung 65” 4K QLED TV",
    "sku": "QE65Q7F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 38000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renk teknolojisi, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2065E2809D204K20QLED20TV20QE65Q7F.png",
    "slug": "samsung-65--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9096,
    "name": "LG 65” 4K QNED TV",
    "sku": "65QNED80T3A",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 38000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, QNED ekran teknolojisi, 50 Hz ekran yenileme hızı, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, α5 Gen6 AI 4K işlemci, WebOS işletim sistemi, Google Assistant ve ThinQ AI desteği, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_LG2065E2809D204K20QNED20TV2065QNED80T3A.png",
    "slug": "lg-65--4k-qned-tv",
    "attrs": {
      "panel_type": "QNED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9098,
    "name": "Samsung 65” Neo QLED TV",
    "sku": "QE65QN70FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 50000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 100 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 4×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound+ ses teknolojisi, Q Symphony uyumu, Neural Quantum 4K işlemci, Tizen işletim sistemi, Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2065E2809D20Neo20QLED20TV20QE65QN70FA20.png",
    "slug": "samsung-65--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9100,
    "name": "Samsung 65” Neo QLED TV",
    "sku": "QE65QN90FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 75000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 144 Hz ekran yenileme hızı, HDR10+ Adaptive ve HLG desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS+ surround ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu Pro ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2065E2809D20Neo20QLED20TV20QE65QN90FA.png",
    "slug": "samsung-65--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9101,
    "name": "Samsung 65” OLED TV",
    "sku": "QE65S85F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 74990.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED ekran teknolojisi, 120 Hz ekran yenileme hızı, HDR10+ desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu Pro ve Smart TV özellikleri",
    "image": "",
    "slug": "samsung-65--oled-tv",
    "attrs": {
      "panel_type": "OLED"
    }
  },
  {
    "id": 9104,
    "name": "LG 75” 4K Led TV",
    "sku": "75UA75006LA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Direct LED panel, 60 Hz ekran yenileme hızı, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, α5 Gen6 AI 4K işlemci, WebOS 24 işletim sistemi, Google Assistant ve ThinQ AI desteği, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_LG2075E2809D204K20Led20TV2075UA75006LA.png",
    "slug": "lg-75--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9108,
    "name": "Samsung 75” 4K Led TV",
    "sku": "UE75U8072F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 40000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, 50 Hz ekran yenileme hızı, Crystal UHD ekran teknolojisi, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, 2 kanallı 20W ses çıkışı, Q Symphony ve Adaptive Sound desteği, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2075E2809D204K20Led20TV20UE75U8072F.png",
    "slug": "samsung-75--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9110,
    "name": "Samsung 75” 4K QLED TV",
    "sku": "QE75Q7FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 49950.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Dual LED aydınlatma teknolojisi, 50 Hz ekran yenileme hızı, Quantum Dot renk teknolojisi, HDR10+, HDR10 ve HLG desteği, 3×HDMI ve 2×USB bağlantı girişi, OTS Lite ve Adaptive Sound ses teknolojisi, Q Symphony uyumu, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2075E2809D204K20QLED20TV20QE75Q7FA.png",
    "slug": "samsung-75--4k-qled-tv",
    "attrs": {
      "panel_type": "QLED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9112,
    "name": "Samsung 75” Neo QLED TV",
    "sku": "QE75QN70F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 65000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 120 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Smart TV ve Oyun Modu özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2075E2809D20Neo20QLED20TV20QE75QN70F20.png",
    "slug": "samsung-75--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9114,
    "name": "Samsung 75” Neo QLED TV",
    "sku": "QE75QN90FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 100000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 144 Hz ekran yenileme hızı, HDR10+ Adaptive ve HLG desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS+ surround ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu Pro ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Screenshot-2026-01-27-at-6.33.50-PM.png",
    "slug": "samsung-75--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9116,
    "name": "LG 77” OLED evo TV",
    "sku": "OLED77G23LA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "LG",
    "price": 100000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED evo panel, 120 Hz ekran yenileme hızı, HDR10 ve Dolby Vision IQ desteği, 4×HDMI 21 ve 3×USB bağlantı girişi, Dolby Atmos destekli ses sistemi, α9 Gen5 AI 4K işlemci, WebOS işletim sistemi, Gallery Design, Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_LG2077E2809D20OLED20evo20TV20OLED77G23LA.png",
    "slug": "lg-77--oled-evo-tv",
    "attrs": {}
  },
  {
    "id": 9118,
    "name": "Samsung 77” OLED TV",
    "sku": "QE77S85F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 100000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED ekran teknolojisi, 120 Hz ekran yenileme hızı, HDR10+ desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu Pro ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2077E2809D20OLED20TV20QE77S85F20.png",
    "slug": "samsung-77--oled-tv",
    "attrs": {
      "panel_type": "OLED"
    }
  },
  {
    "id": 9120,
    "name": "Samsung 83” OLED TV",
    "sku": "QE83S90D",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 170000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, OLED ekran teknolojisi, 120 Hz ekran yenileme hızı, HDR10+ desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Smart TV ve gelişmiş Oyun Modu özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2083E2809D20OLED20TV20QE83S90D20.png",
    "slug": "samsung-83--oled-tv",
    "attrs": {
      "panel_type": "OLED"
    }
  },
  {
    "id": 9122,
    "name": "Samsung 85” 4K Led TV",
    "sku": "UE85U8092U",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 58000.0,
    "sale_price": NaN,
    "in_stock": false,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Crystal UHD ekran teknolojisi, 50 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 3×HDMI ve 1×USB bağlantı girişi, Q Symphony ve Adaptive Sound ses teknolojisi, Crystal 4K işlemci, Tizen işletim sistemi, Screen Mirroring ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2085E2809D204K20Led20TV20UE85U8000F.png",
    "slug": "samsung-85--4k-led-tv",
    "attrs": {
      "panel_type": "LED",
      "resolution": "4K UHD"
    }
  },
  {
    "id": 9126,
    "name": "Samsung 85” Neo QLED TV",
    "sku": "QE85QN70F",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 100000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 120 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 4×HDMI 21 ve 2×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Oyun Modu ve Smart TV özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Zorlu_Digital_Center_Televizyonlar_Samsung2085E2809D20Neo20QLED20TV20QE85QN70F20.png",
    "slug": "samsung-85--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9128,
    "name": "Samsung 98” Neo QLED TV",
    "sku": "QE98QN90A",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 444000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 120 Hz ekran yenileme hızı, HDR10+ Adaptive ve HLG desteği, 4×HDMI 21 ve 3×USB bağlantı girişi, Dolby Atmos ve OTS+ surround ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Premium Smart TV ve Oyun Modu Pro özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-98-Neo-QLED-TV-QE98QN90A.png",
    "slug": "samsung-98--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9130,
    "name": "Samsung 100” Neo QLED TV",
    "sku": "QE100QN80FA",
    "category": "Video / Audio > Televizyonlar",
    "brand": "Samsung",
    "price": 230000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "3840×2160p 4K UHD çözünürlük, Neo QLED ekran teknolojisi, Mini LED aydınlatma, 120 Hz ekran yenileme hızı, HDR10+ ve HLG desteği, 4×HDMI 21 ve 3×USB bağlantı girişi, Dolby Atmos ve OTS Lite ses teknolojisi, Neural Quantum 4K işlemci, Tizen işletim sistemi, Premium Smart TV ve gelişmiş Oyun Modu özellikleri",
    "image": "https://zorluplus.com/wp-content/uploads/2026/01/Samsung-100-Neo-QLED-TV-QE100QN80FA-.png",
    "slug": "samsung-100--neo-qled-tv",
    "attrs": {
      "panel_type": "Neo QLED"
    }
  },
  {
    "id": 9209,
    "name": "EXP SLIM Sabit TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "Aksesuar",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Ultra slim sabit TV askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/EXP-SLIM-Sabit-TV-Aski-Aparati-2.png",
    "slug": "exp-slim-sabit-tv-ask--aparat-",
    "attrs": {
      "mount_type": "Sabit"
    }
  },
  {
    "id": 9210,
    "name": "Z510 TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "Aksesuar",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "TV’lere kadar uyumlu sabit askı aparatı (75x75 – 300x300 mm)",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Z510-TV-Aski-Aparati-2.png",
    "slug": "z510-tv-ask--aparat-",
    "attrs": {}
  },
  {
    "id": 9211,
    "name": "Z520 TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "Aksesuar",
    "price": 3500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Geniş uyumlu sabit askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Z520-TV-Aski-Aparati-2.png",
    "slug": "z520-tv-ask--aparat-",
    "attrs": {}
  },
  {
    "id": 9212,
    "name": "Silvercrest SC-TA10 Sabit TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "SILVERCREST",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sabit TV askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Silvercrest-SC-TA10-Sabit-TV-Aski-Aparati-2.png",
    "slug": "silvercrest-sc-ta10-sabit-tv-ask--aparat-",
    "attrs": {
      "mount_type": "Sabit"
    }
  },
  {
    "id": 9213,
    "name": "Brateck TP85G Sabit TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "BRATECK",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Geniş ekranlar için sabit askı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Brateck-TP85G-Sabit-TV-Aski-Aparati-2.png",
    "slug": "brateck-tp85g-sabit-tv-ask--aparat-",
    "attrs": {}
  },
  {
    "id": 9214,
    "name": "Sonorous TP-55H Dönebilen Tek Kollu TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "SONOROUS",
    "price": 3000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Hareketli TV askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Sonorous-TP-55H-Donebilen-Tek-Kollu-TV-Aski-Aparati.png",
    "slug": "sonorous-tp-55h-d-nebilen-tek-kollu-tv-ask--aparat-",
    "attrs": {
      "mount_type": "Dönebilen"
    }
  },
  {
    "id": 9215,
    "name": "Vontech VT-23955 Dönebilen Tek Kollu TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "VONTECH",
    "price": 6500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Dönebilen tek kollu TV askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Vontech-VT-23955-Donebilen-Tek-Kollu-TV-Aski-Aparati.png",
    "slug": "vontech-vt-23955-d-nebilen-tek-kollu-tv-ask--aparat-",
    "attrs": {
      "mount_type": "Dönebilen"
    }
  },
  {
    "id": 9216,
    "name": "Brateck LPA13-484C Dönebilen Köşe TV Askı Aparatı",
    "sku": "",
    "category": "Aksesuarlar > TV Askı Aparatları",
    "brand": "BRATECK",
    "price": 5000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Köşe tipi dönebilen TV askı aparatı",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Brateck-LPA13-484C-Donebilen-Kose-TV-Aski-Aparati.png",
    "slug": "brateck-lpa13-484c-d-nebilen-k--e-tv-ask--aparat-",
    "attrs": {
      "mount_type": "Köşe/Dam"
    }
  },
  {
    "id": 9217,
    "name": "Brateck SC3 Ekran Temizleme Kiti",
    "sku": "",
    "category": "Aksesuarlar > Temizlik Ürünleri",
    "brand": "BRATECK",
    "price": 500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Ekran temizleme spreyi",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Brateck-Ekran-Temizleme-Kiti-200-ml.png",
    "slug": "brateck-sc3-ekran-temizleme-kiti",
    "attrs": {}
  },
  {
    "id": 9218,
    "name": "MAG Tek Girişli LNB",
    "sku": "",
    "category": "Aksesuarlar > Uydu Ekipmanları",
    "brand": "MAG",
    "price": 500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Tek girişli uydu LNB",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/MAG-Tek-Girisli-LNB-1.png",
    "slug": "mag-tek-giri-li-lnb",
    "attrs": {}
  },
  {
    "id": 9219,
    "name": "MAG Dual LNB",
    "sku": "",
    "category": "Aksesuarlar > Uydu Ekipmanları",
    "brand": "MAG",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Çift girişli uydu LNB",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/MAG-Dual-LNB.png",
    "slug": "mag-dual-lnb",
    "attrs": {}
  },
  {
    "id": 9220,
    "name": "MAG Digiturk MDU 5 LNB",
    "sku": "",
    "category": "Aksesuarlar > Uydu Ekipmanları",
    "brand": "MAG",
    "price": 1000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Digiturk uyumlu LNB",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/MAG-Digiturk-MDU-5-LNB.png",
    "slug": "mag-digiturk-mdu-5-lnb",
    "attrs": {}
  },
  {
    "id": 9221,
    "name": "JBL Club 120 Party Box",
    "sku": "",
    "category": "Ses Sistemleri > Bluetooth Hoparlörler",
    "brand": "JBL",
    "price": 18000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Taşınabilir Bluetooth hoparlör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/JBL-Club-120-Party-Box.png",
    "slug": "jbl-club-120-party-box",
    "attrs": {
      "audio_type": "Party Box"
    }
  },
  {
    "id": 9222,
    "name": "JBL T115BT Bluetooth Kulaklık",
    "sku": "",
    "category": "Ses Sistemleri > Kulaklıklar",
    "brand": "JBL",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Bluetooth kulaklık",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/JBL-T115BT-Bluetooth-Kulaklik.png",
    "slug": "jbl-t115bt-bluetooth-kulakl-k",
    "attrs": {
      "audio_type": "Kulaklık"
    }
  },
  {
    "id": 9223,
    "name": "JBL 2.1 Deep Bass Soundbar",
    "sku": "",
    "category": "Ses Sistemleri > Soundbar",
    "brand": "JBL",
    "price": 15500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "300W Soundbar",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/JBL-2.1-Deep-Bass-Soundbar.png",
    "slug": "jbl-2-1-deep-bass-soundbar",
    "attrs": {
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 9224,
    "name": "LG X5S Bluetooth Hoparlör",
    "sku": "",
    "category": "Ses Sistemleri > Bluetooth Hoparlörler",
    "brand": "LG",
    "price": 17250.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "200W taşınabilir hoparlör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-X5S-Bluetooth-Hoparlor.png",
    "slug": "lg-x5s-bluetooth-hoparl-r",
    "attrs": {
      "audio_type": "Bluetooth Hoparlör"
    }
  },
  {
    "id": 9225,
    "name": "LG X7S Bluetooth Hoparlör",
    "sku": "",
    "category": "Ses Sistemleri > Bluetooth Hoparlörler",
    "brand": "LG",
    "price": 21750.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "250W taşınabilir hoparlör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-X7S-Bluetooth-Hoparlor.png",
    "slug": "lg-x7s-bluetooth-hoparl-r",
    "attrs": {
      "audio_type": "Bluetooth Hoparlör"
    }
  },
  {
    "id": 9226,
    "name": "LG PL2W XBOOM Go Hoparlör",
    "sku": "",
    "category": "Ses Sistemleri > Bluetooth Hoparlörler",
    "brand": "LG",
    "price": 2900.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Taşınabilir hoparlör",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-PL2W-XBOOM-Go-Hoparlor.png",
    "slug": "lg-pl2w-xboom-go-hoparl-r",
    "attrs": {
      "watt": 2,
      "audio_type": "Bluetooth Hoparlör"
    }
  },
  {
    "id": 9227,
    "name": "LG OM6540 500W Boombox",
    "sku": "",
    "category": "Ses Sistemleri > Bluetooth Hoparlörler",
    "brand": "LG",
    "price": 15500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "500W DJ boombox",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-OM6540-500W-Boombox.png",
    "slug": "lg-om6540-500w-boombox",
    "attrs": {
      "watt": 500,
      "audio_type": "Boombox"
    }
  },
  {
    "id": 9228,
    "name": "Midea YL1635T Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 5000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Yarım boy su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Midea-YL1635T-Su-Sebili.png",
    "slug": "midea-yl1635t-su-sebili",
    "attrs": {}
  },
  {
    "id": 9229,
    "name": "Midea YL2037SB Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Üstten damacanalı su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Midea-YL2037SB-Su-Sebili.png",
    "slug": "midea-yl2037sb-su-sebili",
    "attrs": {}
  },
  {
    "id": 9230,
    "name": "Midea YL1917SAE-W Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Beyaz su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Midea-YL1917SAE-W-Su-Sebili.png",
    "slug": "midea-yl1917sae-w-su-sebili",
    "attrs": {}
  },
  {
    "id": 9231,
    "name": "Midea YL1917SAE-BK Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Siyah su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Midea-YL1917SAE-BK-Su-Sebili.png",
    "slug": "midea-yl1917sae-bk-su-sebili",
    "attrs": {}
  },
  {
    "id": 9232,
    "name": "Midea YL1633S Gizli Damacanalı Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "MIDEA",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Gizli damacanalı su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Midea-YL1633S-Gizli-Damacanali-Su-Sebili.png",
    "slug": "midea-yl1633s-gizli-damacanal--su-sebili",
    "attrs": {}
  },
  {
    "id": 9233,
    "name": "Toshiba RWF-W1615BU Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "TOSHIBA",
    "price": 10000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Gizli damacanalı su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Toshiba-RWF-W1615BU-Su-Sebili.png",
    "slug": "toshiba-rwf-w1615bu-su-sebili",
    "attrs": {}
  },
  {
    "id": 9234,
    "name": "Toshiba RWF-1766TU-BK Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "TOSHIBA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Siyah su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Toshiba-RWF-1766TU-BK-Su-Sebili.png",
    "slug": "toshiba-rwf-1766tu-bk-su-sebili",
    "attrs": {}
  },
  {
    "id": 9235,
    "name": "Toshiba RWF-1766TU-W Su Sebili",
    "sku": "",
    "category": "Beyaz Eşya > Su Sebilleri",
    "brand": "TOSHIBA",
    "price": 7800.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Beyaz su sebili",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Toshiba-RWF-1766TU-W-Su-Sebili.png",
    "slug": "toshiba-rwf-1766tu-w-su-sebili",
    "attrs": {}
  },
  {
    "id": 9416,
    "name": "Trust Samsung Uyumlu Smart Klavye + Kumanda",
    "sku": "TRUST-KB-TOUCH",
    "category": "Video / Audio > Aksesuar",
    "brand": "Samsung",
    "price": NaN,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "trust, samsung, klavye, kumanda, smart tv, touchpad",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Trust-Samsung-Uyumlu-Smart-Klavye-Kumanda.png",
    "slug": "trust-samsung-uyumlu-smart-klavye---kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9417,
    "name": "Master X HDMI 2.1 Kablo 1.5 m",
    "sku": "MASTERX-HDMI21-1.5M",
    "category": "Video / Audio > Aksesuar",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "hdmi, hdmi 2.1, master x, 48gbps, 4k, 8k, ps5, xbox",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Master-X-HDMI-2.1-Kablo-1.5-m.png",
    "slug": "master-x-hdmi-2-1-kablo-1-5-m",
    "attrs": {
      "cable_length": "1.5m"
    }
  },
  {
    "id": 9418,
    "name": "U Green HDMI 2.1 Kablo 2 m",
    "sku": "UGREEN-HDMI21-2M",
    "category": "Video / Audio > Aksesuar",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "hdmi, hdmi 2.1, ugreen, 48gbps, 4k, 8k, ps5, xbox",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/U-Green-HDMI-2.1-Kablo-2-m.png",
    "slug": "u-green-hdmi-2-1-kablo-2-m",
    "attrs": {}
  },
  {
    "id": 9419,
    "name": "Premium HDMI 2.1 Kablo 3 m",
    "sku": "PREMIUM-HDMI21-3M",
    "category": "Video / Audio > Aksesuar",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "hdmi, hdmi 2.1, premium, 48gbps, 4k, 8k, ps5, xbox",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Premium-HDMI-2.1-Kablo-3-m.png",
    "slug": "premium-hdmi-2-1-kablo-3-m",
    "attrs": {}
  },
  {
    "id": 9420,
    "name": "EXP Slim Sabit TV Askı Aparatı (42–50\")",
    "sku": "TVASKI-SABIT-42-50 EXP SLİM",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, sabit, duvar askı, 42 inç, 50 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/EXP-SLIM-SABIT-TV-ASKI-APARATI-1.png",
    "slug": "exp-slim-sabit-tv-ask--aparat---42-50--",
    "attrs": {
      "mount_type": "Sabit",
      "tv_size_min": 42,
      "tv_size_max": 50
    }
  },
  {
    "id": 9421,
    "name": "Z510 TV Askı Aparatı (19–45\")",
    "sku": "TVASKI-SABIT-19-45-300",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, sabit, vesa, 300x300, 19 inç, 45 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Z510-TV-ASKI-APARATI-1.png",
    "slug": "z510-tv-ask--aparat---19-45--",
    "attrs": {
      "tv_size_min": 19,
      "tv_size_max": 45
    }
  },
  {
    "id": 9422,
    "name": "Z520 TV Askı Aparatı (36–75\")",
    "sku": "TVASKI-SABIT-36-75-600",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, sabit, vesa, 600x500, 36 inç, 75 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Z520-TV-ASKI-APARATI-1.png",
    "slug": "z520-tv-ask--aparat---36-75--",
    "attrs": {
      "tv_size_min": 36,
      "tv_size_max": 75
    }
  },
  {
    "id": 9423,
    "name": "Sabit TV Askı Aparatı (37–55\")",
    "sku": "TVASKI-SABIT-37-55",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, sabit, 37 inç, 55 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SILVERCREST-SC-TA10-SABIT-TV-ASKI-APARATI-1.png",
    "slug": "sabit-tv-ask--aparat---37-55--",
    "attrs": {
      "tv_size_min": 37,
      "tv_size_max": 55
    }
  },
  {
    "id": 9424,
    "name": "Sabit TV Askı Aparatı (65–98\")",
    "sku": "TVASKI-SABIT-65-98",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, sabit, 65 inç, 98 inç, büyük ekran",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/BRATECK-TP85G-SABIT-TV-ASKI-APARATI-1.png",
    "slug": "sabit-tv-ask--aparat---65-98--",
    "attrs": {
      "tv_size_min": 65,
      "tv_size_max": 98
    }
  },
  {
    "id": 9425,
    "name": "Dönebilen Tek Kollu TV Askı Aparatı (40–43\")",
    "sku": "TVASKI-TEKKOL-40-43",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": 404243.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, dönebilen, tek kollu, 40 inç, 43 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/TP-55H-UYUMLU-DONEBILEN-TEK-KOLLU-TV-ASKI-APARATI-1.png",
    "slug": "d-nebilen-tek-kollu-tv-ask--aparat---40-43--",
    "attrs": {
      "mount_type": "Dönebilen",
      "tv_size_min": 40,
      "tv_size_max": 43
    }
  },
  {
    "id": 9426,
    "name": "VT-23955 Dönebilen Tek Kollu TV Askı Aparatı (46–55\")",
    "sku": "TVASKI-TEKKOL-46-55",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, dönebilen, tek kollu, 46 inç, 55 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/VT-23955-TV-ASKI-APARATI-1.png",
    "slug": "vt-23955-d-nebilen-tek-kollu-tv-ask--aparat---46-55--",
    "attrs": {
      "mount_type": "Dönebilen",
      "tv_size_min": 46,
      "tv_size_max": 55
    }
  },
  {
    "id": 9427,
    "name": "BRATECKLPA13-484C Dönebilen Köşe TV Askı Aparatı (46–65\")",
    "sku": "TVASKI-KOSE-46-65",
    "category": "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları",
    "brand": "Brateck",
    "price": null,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "tv askı aparatı, köşe, dönebilen, 46 inç, 65 inç",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/BRATECK-LPA13-484C-UYUMLU-DONEBILEN-KOSE-TV-ASKI-APARATI-1.png",
    "slug": "bratecklpa13-484c-d-nebilen-k--e-tv-ask--aparat---46-65--",
    "attrs": {
      "mount_type": "Köşe/Dam",
      "tv_size_min": 46,
      "tv_size_max": 65
    }
  },
  {
    "id": 9429,
    "name": "Sonorous Soundbar Askı Aparatı",
    "sku": "SONOROUS-SOUNDBAR-ASKI",
    "category": "Video / Audio > Aksesuar",
    "brand": "SONOROUS",
    "price": NaN,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "sonorous, soundbar, askı aparatı, montaj",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Sonorous-TP-55H-Donebilen-Tek-Kollu-TV-Aski-Aparati.png",
    "slug": "sonorous-soundbar-ask--aparat-",
    "attrs": {
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 9470,
    "name": "LG AKB76043505 Smart TV Kumanda",
    "sku": "AKB76043505",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AKB76043505-Smart-TV-Kumanda.png",
    "slug": "lg-akb76043505-smart-tv-kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9471,
    "name": "LG AKB75595361 Soundbar Kumanda",
    "sku": "AKB75595361",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AKB75595361-Soundbar-Kumanda.png",
    "slug": "lg-akb75595361-soundbar-kumanda",
    "attrs": {
      "remote_type": "Soundbar",
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 9472,
    "name": "LG AKB74815321 Soundbar Kumanda",
    "sku": "AKB74815321",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AKB74815321-Soundbar-Kumanda-.png",
    "slug": "lg-akb74815321-soundbar-kumanda",
    "attrs": {
      "remote_type": "Soundbar",
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 9473,
    "name": "LG AKB74815391 Soundbar Kumanda",
    "sku": "AKB74815391",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AKB74815391-Soundbar-Kumanda.png",
    "slug": "lg-akb74815391-soundbar-kumanda",
    "attrs": {
      "remote_type": "Soundbar",
      "audio_type": "Soundbar"
    }
  },
  {
    "id": 9474,
    "name": "LG AN-MR500 TV Kumanda",
    "sku": "AN-MR500",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR500-TV-KUMANDA.png",
    "slug": "lg-an-mr500-tv-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9475,
    "name": "LG AN-MR18BA Akıllı Kumanda",
    "sku": "AN-MR18BA",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR18BA-SES-VE-HAREKETE-DUYARLI-AKILLI-KUAMNDA.png",
    "slug": "lg-an-mr18ba-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9476,
    "name": "LG AN-MR19GA Akıllı Kumanda",
    "sku": "AN-MR19GA",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR19GA-Akilli-Kumanda.png",
    "slug": "lg-an-mr19ga-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9477,
    "name": "LG AN-MR20GA Akıllı Kumanda",
    "sku": "AN-MR20GA",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR20GA-Akilli-Kumanda.png",
    "slug": "lg-an-mr20ga-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9478,
    "name": "LG AN-MR21 Akıllı Kumanda",
    "sku": "AN-MR21",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR21-Akilli-Kumanda.png",
    "slug": "lg-an-mr21-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9479,
    "name": "LG AN-MR22 Akıllı Kumanda",
    "sku": "AN-MR22",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR22-Akilli-Kumanda.png",
    "slug": "lg-an-mr22-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9480,
    "name": "LG AN-MR23GA Akıllı Kumanda",
    "sku": "AN-MR23GA",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "LG",
    "price": 4000.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "LG Smart TV’lerle uyumludur.\\n Bluetooth bağlantı desteği.\\n Ses ve harekete duyarlı kullanım.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/LG-AN-MR23GA-Akilli-Kumanda.png",
    "slug": "lg-an-mr23ga-ak-ll--kumanda",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9481,
    "name": "Samsung BN5901313A Kumanda",
    "sku": "BN5901313A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Samsung-BN5901313A-Kumanda.png",
    "slug": "samsung-bn5901313a-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9482,
    "name": "Samsung BN5901315A/B Kumanda",
    "sku": "BN5901315A-B",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Samsung-BN5901315A-B-Kumanda.png",
    "slug": "samsung-bn5901315a-b-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9483,
    "name": "Samsung ARH-5126 Klima Kumandası",
    "sku": "ARH-5126",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung klima ile uyumludur.\\n Sıcaklık ve mod kontrolü.\\n Kullanımı pratiktir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Samsung-ARH-5126-Klima-Kumandasi.png",
    "slug": "samsung-arh-5126-klima-kumandas-",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9484,
    "name": "Samsung ARH-5109 Klima Kumandası",
    "sku": "ARH-5109",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung klima ile uyumludur.\\n Sıcaklık ve mod kontrolü.\\n Kullanımı pratiktir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SAMSUNG-ARH-5109-KLIMA-KUMANDASI.png",
    "slug": "samsung-arh-5109-klima-kumandas-",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9485,
    "name": "Samsung DB82-06904A Klima Kumandası",
    "sku": "DB82-06904A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung klima ile uyumludur.\\n Sıcaklık ve mod kontrolü.\\n Kullanımı pratiktir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SAMSUNG-DB82-06904A-KLIMA-KUMANDASI.png",
    "slug": "samsung-db82-06904a-klima-kumandas-",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9486,
    "name": "Samsung AH59-02294A Kumanda",
    "sku": "AH59-02294A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SAMSUNG-AH59-02294A-KUMANDA.png",
    "slug": "samsung-ah59-02294a-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9487,
    "name": "Samsung AA59-00759A Kumanda",
    "sku": "AA59-00759A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SAMSUNG-AA59-00759A-KUMANDA.png",
    "slug": "samsung-aa59-00759a-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9488,
    "name": "Samsung AA59-0631A Kumanda",
    "sku": "AA59-0631A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 2500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung uyumlu kumanda.\\n Kolay kullanım.\\n Günlük kullanım için idealdir.",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SAMSUNG-AA59-0631A-KUMANDA.png",
    "slug": "samsung-aa59-0631a-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9489,
    "name": "Samsung Smart TV Kumanda BN59-01313A",
    "sku": "BN59-01313A",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung Smart TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Samsung-BN5901313A-Kumanda-1.png",
    "slug": "samsung-smart-tv-kumanda-bn59-01313a",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9490,
    "name": "Samsung Smart TV Kumanda BN59-01315A/B",
    "sku": "BN59-01315A/B",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "Samsung",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Samsung Smart TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/Samsung-BN5901315A-B-Kumanda-1.png",
    "slug": "samsung-smart-tv-kumanda-bn59-01315a-b",
    "attrs": {
      "remote_type": "Akıllı TV"
    }
  },
  {
    "id": 9491,
    "name": "Sony Android TV Kumanda RMT-TX300E",
    "sku": "RMT-TX300E",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "SONY",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Sony Android TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/SONY-RMT-TX300E-KUMANDA.png",
    "slug": "sony-android-tv-kumanda-rmt-tx300e",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9492,
    "name": "Philips Ambilight TV Kumanda YKF456-009",
    "sku": "YKF456-009",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "PHILIPS",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Philips Smart TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/PHILIPS-YKF456-009-SMART-TV-KUMANDA.png",
    "slug": "philips-ambilight-tv-kumanda-ykf456-009",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9493,
    "name": "TCL Android TV Kumanda RC802N4",
    "sku": "RC802N4",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "TCL",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "TCL Android TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/TCL-RC802N4-SMART.png",
    "slug": "tcl-android-tv-kumanda-rc802n4",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9494,
    "name": "TCL Android TV Kumanda RC802V FMR1",
    "sku": "RC802V FMR1",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "TCL",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "TCL Android TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/TCL-RC802V-FMR1.png",
    "slug": "tcl-android-tv-kumanda-rc802v-fmr1",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9495,
    "name": "Xiaomi Mi TV Bluetooth Kumanda",
    "sku": "XMRM-010",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "XIAOMI",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Xiaomi Mi TV uyumlu\\n Bluetooth bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/XIAOMI-XMRM-010-MI-T.png",
    "slug": "xiaomi-mi-tv-bluetooth-kumanda",
    "attrs": {
      "remote_type": "TV"
    }
  },
  {
    "id": 9496,
    "name": "Toshiba Android TV Kumanda CT-8547",
    "sku": "CT-8547",
    "category": "Video / Audio > Aksesuar, Diğer Ürünler",
    "brand": "TOSHIBA",
    "price": 1500.0,
    "sale_price": NaN,
    "in_stock": true,
    "short_desc": "Toshiba Android TV uyumlu\\n Infrared bağlantı\\n Orijinal kumanda",
    "image": "https://zorluplus.com/wp-content/uploads/2026/02/TOSHIBA-CT-8547-SMAR-TV-KUMANDA.png",
    "slug": "toshiba-android-tv-kumanda-ct-8547",
    "attrs": {
      "remote_type": "TV"
    }
  }
]
