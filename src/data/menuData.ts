export type MenuCategory = 'ayam' | 'paket' | 'olahan' | 'minuman';

export interface SpiceLevelOption {
  level: 0 | 1 | 2 | 3 | 4;
  name: string;
  chiliCount: string;
  description: string;
  priceDelta: number;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  price: number;
  description: string;
  shortSpec: string;
  isSpicyCustomizable: boolean;
  defaultCutOptions?: string[];
  drinkTempOptions?: string[];
  featuredTag?: string;
}

export interface OutletLocation {
  id: string;
  name: string;
  district: string;
  address: string;
  hours: string;
  phone: string;
  whatsapp: string;
  googleMapsUrl: string;
  shopeeFoodUrl: string;
  grabFoodUrl: string;
  prepMinutes: number;
  amenities: string[];
  landmarks: string[];
  mapCoords: { x: number; y: number };
}

export const SPICE_LEVELS: SpiceLevelOption[] = [
  {
    level: 0,
    name: 'Original',
    chiliCount: '0 Cabai',
    description: 'Gurih renyah tanpa sambal ulek',
    priceDelta: 0,
  },
  {
    level: 1,
    name: 'Pedas Santai',
    chiliCount: '3 Cabai',
    description: 'Hangat ringan cocok untuk pemula',
    priceDelta: 0,
  },
  {
    level: 2,
    name: 'Pedas Sedang',
    chiliCount: '7 Cabai',
    description: 'Seimbang antara gurih dan pedas',
    priceDelta: 0,
  },
  {
    level: 3,
    name: 'Pedas Nagih',
    chiliCount: '15 Cabai',
    description: 'Racikan standar favorit pelanggan',
    priceDelta: 0,
  },
  {
    level: 4,
    name: 'Pedas Ekstrem',
    chiliCount: '25 Cabai',
    description: 'Ekstra rawit merah ulek segar',
    priceDelta: 2000,
  },
];

export const CHICKEN_ADDONS: AddOnOption[] = [
  { id: 'nasi-putih', name: 'Tambah Nasi Putih Hangat', price: 5000 },
  { id: 'ekstra-mozza', name: 'Ekstra Keju Mozza Torch', price: 7000 },
  { id: 'ekstra-saus-keju', name: 'Ekstra Saus Keju Lumer', price: 6000 },
  { id: 'ayam-karage-mini', name: 'Add-on Ayam Karage Mini (4 pcs)', price: 12000 },
  { id: 'dimsum-ayam-2', name: 'Add-on Dimsum Ayam (2 pcs)', price: 9000 },
  { id: 'ekstra-sambal', name: 'Ekstra Sambal Ulek Cup', price: 4000 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'geprek-mozza',
    name: 'Ayam Geprek Mozza',
    category: 'ayam',
    categoryLabel: 'Ayam Geprek',
    price: 26000,
    description:
      'Ayam geprek tepung renyah disiram sambal ulek segar lalu ditutup lelehan keju mozzarella yang di-torch.',
    shortSpec: 'Keju Mozza Torch · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Dada', 'Paha Atas', 'Paha Bawah'],
    featuredTag: 'Terlaris',
  },
  {
    id: 'geprek-lombok-ijo',
    name: 'Geprek Lombok Ijo',
    category: 'ayam',
    categoryLabel: 'Ayam Geprek',
    price: 23000,
    description:
      'Paduan ayam krispi dengan sambal cabai hijau besar, rawit hijau, bawang merah, dan aroma daun jeruk purut.',
    shortSpec: 'Sambal Hijau Segar · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Dada', 'Paha Atas', 'Paha Bawah'],
  },
  {
    id: 'geprek-pedas-nagih',
    name: 'Geprek Pedas Nagih',
    category: 'ayam',
    categoryLabel: 'Ayam Geprek',
    price: 22000,
    description:
      'Menu andalan dengan ulekan cabai rawit merah, bawang putih goreng, dan taburan bawang renyah khas Geprek Aja.',
    shortSpec: 'Sambal Bawang Merah · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Dada', 'Paha Atas', 'Paha Bawah'],
    featuredTag: 'Favorit',
  },
  {
    id: 'geprek-sambal-matah',
    name: 'Geprek Sambal Matah',
    category: 'ayam',
    categoryLabel: 'Ayam Geprek',
    price: 24000,
    description:
      'Ayam geprek gurih dengan siraman sambal matah irisan bawang merah, serai wangi, daun jeruk, dan minyak kelapa hangat.',
    shortSpec: 'Sambal Matah Segar · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Dada', 'Paha Atas', 'Paha Bawah'],
  },
  {
    id: 'geprek-ayam-keju',
    name: 'Geprek Saus Keju',
    category: 'ayam',
    categoryLabel: 'Ayam Geprek',
    price: 25000,
    description:
      'Ayam geprek renyah berpadu saus keju cheddar lumer dan sambal bawang ulek yang creamy sekaligus pedas.',
    shortSpec: 'Saus Keju Creamy · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Dada', 'Paha Atas', 'Paha Bawah'],
  },
  {
    id: 'paket-duo',
    name: 'Paket Duo',
    category: 'paket',
    categoryLabel: 'Menu Paket',
    price: 52000,
    description:
      'Hemat berdua: 2 porsi Ayam Geprek pilihan (Mozza/Lombok Ijo/Pedas Nagih), 2 Nasi Putih hangat, lalapan, dan 2 Es Teh Manis.',
    shortSpec: '2 Ayam + 2 Nasi + 2 Es Teh',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Campur (Dada & Paha)', 'Semua Dada', 'Semua Paha'],
    featuredTag: 'Hemat Berdua',
  },
  {
    id: 'paket-hemat',
    name: 'Paket Hemat',
    category: 'paket',
    categoryLabel: 'Menu Paket',
    price: 25000,
    description:
      'Kombo lengkap untuk makan siang praktis: 1 Ayam Geprek Pedas Nagih atau Lombok Ijo, 1 Nasi Putih, lalapan, dan 1 Es Teh Manis.',
    shortSpec: '1 Ayam + Nasi + Es Teh Manis',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Paha Atas', 'Dada', 'Paha Bawah'],
    featuredTag: 'Best Value',
  },
  {
    id: 'ayam-karage',
    name: 'Ayam Karage Krispi',
    category: 'olahan',
    categoryLabel: 'Olahan & Add-ons',
    price: 16000,
    description:
      'Potongan paha ayam fillet tanpa tulang dimarinasi jahe bawang, digoreng renyah keemasan dengan pilihan cocolan sambal atau saus keju.',
    shortSpec: '6 pcs Fillet · Pilihan Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Saus Sambal Ulek', 'Saus Keju', 'Original Mayo'],
    featuredTag: 'Add-on Populer',
  },
  {
    id: 'dimsum-ayam',
    name: 'Dimsum Ayam Kukus',
    category: 'olahan',
    categoryLabel: 'Olahan & Add-ons',
    price: 15000,
    description:
      '4 buah dimsum daging paha ayam cincang lembut dengan topping wortel parut dan cocolan saus chili oil atau sambal pedas manis.',
    shortSpec: '4 pcs Kukus · Chili Oil / Manis',
    isSpicyCustomizable: false,
    drinkTempOptions: ['Saus Chili Oil', 'Saus Asam Manis'],
  },
  {
    id: 'ayam-keju-bites',
    name: 'Ayam Keju Bites',
    category: 'olahan',
    categoryLabel: 'Olahan & Add-ons',
    price: 17000,
    description:
      'Camilan ayam dadu krispi berlapis bumbu gurih dengan siraman saus keju lumer dan taburan bubuk cabai.',
    shortSpec: 'Porsi Sharing · Saus Keju Lumer',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Saus Keju Original', 'Keju + Tabur Cabai'],
  },
  {
    id: 'kulit-tahu-krispi',
    name: 'Kulit Krispi & Tahu Geprek',
    category: 'olahan',
    categoryLabel: 'Olahan & Add-ons',
    price: 12000,
    description:
      'Kombinasi kulit ayam goreng garing dan tahu putih krispi digeprek bersama sambal ulek segar.',
    shortSpec: 'Pelengkap Renyah · Level 0–4',
    isSpicyCustomizable: true,
    defaultCutOptions: ['Kulit + Tahu', 'Full Kulit Krispi', 'Full Tahu Geprek'],
  },
  {
    id: 'es-teh-manis',
    name: 'Es Teh Manis',
    category: 'minuman',
    categoryLabel: 'Minuman Pendamping',
    price: 6000,
    description:
      'Seduhan teh melati pilihan dengan gula murni dan es batu kristal untuk meredakan sensasi pedas di setiap suapan.',
    shortSpec: 'Gelas 450ml · Gula Asli',
    isSpicyCustomizable: false,
    drinkTempOptions: ['Es Normal', 'Sedikit Es', 'Tanpa Es (Hangat)'],
  },
  {
    id: 'air-mineral',
    name: 'Air Mineral',
    category: 'minuman',
    categoryLabel: 'Minuman Pendamping',
    price: 5000,
    description:
      'Air mineral pegunungan murni dalam kemasan botol higienis 600ml, tersedia pilihan dingin dari showcase maupun suhu ruang.',
    shortSpec: 'Botol 600ml · Dingin / Biasa',
    isSpicyCustomizable: false,
    drinkTempOptions: ['Dingin', 'Suhu Ruang'],
  },
];

export const OUTLETS: OutletLocation[] = [
  {
    id: 'wonogiri-kota',
    name: 'Outlet Wonogiri Kota (Pusat)',
    district: 'Kabupaten Wonogiri',
    address:
      'Jl. Jenderal Sudirman No. 88, Wonokarto, Kec. Wonogiri, Kab. Wonogiri, Jawa Tengah 57612',
    hours: '10:00 – 22:00 WIB',
    phone: '0838-2184-6574',
    whatsapp: '6283821846574',
    googleMapsUrl:
      'https://maps.google.com/?q=Jalan+Jenderal+Sudirman+Wonogiri+Jawa+Tengah',
    shopeeFoodUrl: 'https://shopee.co.id/m/shopeefood',
    grabFoodUrl: 'https://food.grab.com/id/id/',
    prepMinutes: 10,
    amenities: ['Dine-in Luas', 'Parkir Motor & Mobil', 'Penukaran Barcode Kasir'],
    landmarks: ['200m dari Alun-Alun Giri Krida Bakti', 'Dekat Pasar Kota Wonogiri'],
    mapCoords: { x: 300, y: 165 },
  },
  {
    id: 'selogiri',
    name: 'Outlet Selogiri Wonogiri',
    district: 'Kec. Selogiri, Kab. Wonogiri',
    address:
      'Jl. Raya Solo–Wonogiri Km. 5, Kaliancar, Kec. Selogiri, Kab. Wonogiri, Jawa Tengah 57652',
    hours: '10:00 – 22:00 WIB',
    phone: '0838-2184-6574',
    whatsapp: '6283821846574',
    googleMapsUrl:
      'https://maps.google.com/?q=Selogiri+Kabupaten+Wonogiri+Jawa+Tengah',
    shopeeFoodUrl: 'https://shopee.co.id/m/shopeefood',
    grabFoodUrl: 'https://food.grab.com/id/id/',
    prepMinutes: 10,
    amenities: ['Area Singgah Nyaman', 'Wi-Fi Pelanggan', 'Layanan Takeaway Cepat'],
    landmarks: ['Dekat Terminal Giri Adipura', 'Jalur Utama Solo–Wonogiri'],
    mapCoords: { x: 185, y: 105 },
  },
  {
    id: 'baturetno',
    name: 'Outlet Baturetno Wonogiri',
    district: 'Kec. Baturetno, Kab. Wonogiri',
    address:
      'Jl. Raya Baturetno–Pacitan No. 24, Kec. Baturetno, Kab. Wonogiri, Jawa Tengah 57673',
    hours: '10:00 – 21:30 WIB',
    phone: '0838-2184-6574',
    whatsapp: '6283821846574',
    googleMapsUrl:
      'https://maps.google.com/?q=Baturetno+Kabupaten+Wonogiri+Jawa+Tengah',
    shopeeFoodUrl: 'https://shopee.co.id/m/shopeefood',
    grabFoodUrl: 'https://food.grab.com/id/id/',
    prepMinutes: 12,
    amenities: ['Meja Keluarga', 'Parkir Mudah', 'Menerima Pesanan Rombongan'],
    landmarks: ['300m dari Pasar Baturetno', 'Arah Wisata Waduk & Pacitan'],
    mapCoords: { x: 465, y: 255 },
  },
];

export const PLATFORM_LINKS = {
  shopeeFood: 'https://shopee.co.id/m/shopeefood',
  grabFood: 'https://food.grab.com/id/id/',
  whatsappMain: '6283821846574',
  githubRepoUrl: 'https://github.com/geprek-aja/geprek-aja-web',
};
