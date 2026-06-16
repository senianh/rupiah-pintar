export interface Banknote {
  denomination: string;
  amount: number;
  gradientFrom: string;
  gradientTo: string;
  figure: string;
  backScene: string;
  backEmoji: string;
  textColor: string;
  borderColor: string;
  funFact: string;
}

export const BANKNOTES: Banknote[] = [
  {
    denomination: 'Rp1.000',
    amount: 1000,
    gradientFrom: '#D4B896',
    gradientTo: '#EDD5B4',
    figure: 'Tjut Meutia',
    backScene: 'Kepulauan Banda Neira',
    backEmoji: '🏝️',
    textColor: '#5D3A1A',
    borderColor: '#8B5E3C',
    funFact: 'Tjut Meutia adalah pahlawan nasional dari Aceh yang gagah berani melawan penjajah Belanda!',
  },
  {
    denomination: 'Rp2.000',
    amount: 2000,
    gradientFrom: '#B8C0CC',
    gradientTo: '#D8E0EC',
    figure: 'M. H. Thamrin',
    backScene: 'Ngarai Sianok, Sumatera Barat',
    backEmoji: '🏔️',
    textColor: '#2C3E50',
    borderColor: '#4A6080',
    funFact: 'Mohammad Husni Thamrin adalah pahlawan dari Jakarta yang memperjuangkan hak rakyat Indonesia!',
  },
  {
    denomination: 'Rp5.000',
    amount: 5000,
    gradientFrom: '#8B6E52',
    gradientTo: '#C4A882',
    figure: 'Idham Chalid',
    backScene: 'Jembatan Akar, Sumatera Barat',
    backEmoji: '🌉',
    textColor: '#3E1A00',
    borderColor: '#6B3A10',
    funFact: 'Idham Chalid adalah tokoh Islam terkemuka yang berperan besar dalam kemerdekaan Indonesia!',
  },
  {
    denomination: 'Rp10.000',
    amount: 10000,
    gradientFrom: '#7B3FAB',
    gradientTo: '#B080DF',
    figure: 'Frans Kaisiepo',
    backScene: 'Danau Sentani, Papua',
    backEmoji: '🦅',
    textColor: '#1E0040',
    borderColor: '#5C2D8A',
    funFact: 'Frans Kaisiepo adalah pahlawan dari Papua yang berjuang menyatukan Papua dengan Indonesia!',
  },
  {
    denomination: 'Rp20.000',
    amount: 20000,
    gradientFrom: '#2E7D32',
    gradientTo: '#66BB6A',
    figure: 'Otto Iskandar Dinata',
    backScene: 'Kawah Ijen, Jawa Timur',
    backEmoji: '🌋',
    textColor: '#0A2000',
    borderColor: '#1B5E20',
    funFact: 'Otto Iskandar Dinata dari Jawa Barat dikenal dengan julukan "Si Jalak Harupat"!',
  },
  {
    denomination: 'Rp50.000',
    amount: 50000,
    gradientFrom: '#1565C0',
    gradientTo: '#5B9BD5',
    figure: 'Djuanda Kartawidjaja',
    backScene: 'Taman Nasional Komodo',
    backEmoji: '🦎',
    textColor: '#051530',
    borderColor: '#0D3785',
    funFact: 'Djuanda Kartawidjaja adalah PM ke-10 Indonesia yang terkenal dengan Deklarasi Djuanda tahun 1957!',
  },
  {
    denomination: 'Rp100.000',
    amount: 100000,
    gradientFrom: '#B71C1C',
    gradientTo: '#EF5350',
    figure: 'Soekarno & Hatta',
    backScene: 'Raja Ampat, Papua Barat',
    backEmoji: '🐠',
    textColor: '#1A0000',
    borderColor: '#7F0000',
    funFact: 'Soekarno dan Hatta adalah Proklamator sekaligus Presiden dan Wakil Presiden pertama Indonesia!',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  points: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Budi punya 2 lembar Rp10.000.\nBerapa total uang Budi? 💰',
    options: ['Rp15.000', 'Rp20.000', 'Rp12.000', 'Rp25.000'],
    answer: 1,
    explanation: '2 × Rp10.000 = Rp20.000 ✅',
    points: 100,
  },
  {
    id: 2,
    question: 'Ani beli es krim seharga Rp7.500.\nDia bayar Rp10.000. Berapa kembaliannya? 🍦',
    options: ['Rp2.000', 'Rp2.500', 'Rp3.000', 'Rp1.500'],
    answer: 1,
    explanation: 'Rp10.000 − Rp7.500 = Rp2.500 ✅',
    points: 100,
  },
  {
    id: 3,
    question: 'Rafi punya Rp50.000. Beli mainan Rp32.000.\nBerapa sisa uang Rafi? 🎮',
    options: ['Rp28.000', 'Rp17.000', 'Rp18.000', 'Rp22.000'],
    answer: 2,
    explanation: 'Rp50.000 − Rp32.000 = Rp18.000 ✅',
    points: 100,
  },
  {
    id: 4,
    question: '1 lembar Rp20.000 + 1 lembar Rp10.000\n+ 2 lembar Rp5.000 = ? 🧮',
    options: ['Rp35.000', 'Rp40.000', 'Rp45.000', 'Rp50.000'],
    answer: 1,
    explanation: 'Rp20.000 + Rp10.000 + Rp10.000 = Rp40.000 ✅',
    points: 100,
  },
  {
    id: 5,
    question: 'Harga pensil Rp2.500, penghapus Rp1.500,\nbuku Rp8.000. Berapa totalnya? 📚',
    options: ['Rp11.000', 'Rp12.000', 'Rp12.500', 'Rp10.500'],
    answer: 1,
    explanation: 'Rp2.500 + Rp1.500 + Rp8.000 = Rp12.000 ✅',
    points: 100,
  },
  {
    id: 6,
    question: 'Ibu punya Rp100.000. Belanja sayur Rp35.000\ndan buah Rp28.000. Sisa uang Ibu? 🛒',
    options: ['Rp47.000', 'Rp37.000', 'Rp42.000', 'Rp63.000'],
    answer: 1,
    explanation: 'Rp100.000 − Rp35.000 − Rp28.000 = Rp37.000 ✅',
    points: 150,
  },
  {
    id: 7,
    question: 'Dika menabung Rp5.000 setiap hari.\nDalam 6 hari, berapa tabungan Dika? 🐷',
    options: ['Rp25.000', 'Rp30.000', 'Rp35.000', 'Rp11.000'],
    answer: 1,
    explanation: '6 × Rp5.000 = Rp30.000 ✅',
    points: 150,
  },
  {
    id: 8,
    question: 'Tiket kebun binatang Rp15.000 per orang.\nBiaya untuk 3 orang adalah? 🦁',
    options: ['Rp35.000', 'Rp40.000', 'Rp45.000', 'Rp50.000'],
    answer: 2,
    explanation: '3 × Rp15.000 = Rp45.000 ✅',
    points: 150,
  },
];

export interface ShoppingItem {
  id: number;
  name: string;
  emoji: string;
  price: number;
  priceLabel: string;
}

export interface ShoppingRound {
  items: ShoppingItem[];
  total: number;
  totalLabel: string;
  description: string;
}

export const SHOPPING_ROUNDS: ShoppingRound[] = [
  {
    items: [
      { id: 1, name: 'Susu', emoji: '🥛', price: 5000, priceLabel: 'Rp5.000' },
      { id: 2, name: 'Roti', emoji: '🍞', price: 7500, priceLabel: 'Rp7.500' },
    ],
    total: 12500,
    totalLabel: 'Rp12.500',
    description: 'Belanja 2 barang',
  },
  {
    items: [
      { id: 1, name: 'Apel', emoji: '🍎', price: 8000, priceLabel: 'Rp8.000' },
      { id: 2, name: 'Biskuit', emoji: '🍪', price: 12000, priceLabel: 'Rp12.000' },
      { id: 3, name: 'Jus Jeruk', emoji: '🍊', price: 5000, priceLabel: 'Rp5.000' },
    ],
    total: 25000,
    totalLabel: 'Rp25.000',
    description: 'Belanja 3 barang',
  },
  {
    items: [
      { id: 1, name: 'Mainan', emoji: '🎮', price: 35000, priceLabel: 'Rp35.000' },
      { id: 2, name: 'Pensil Warna', emoji: '🖍️', price: 15000, priceLabel: 'Rp15.000' },
    ],
    total: 50000,
    totalLabel: 'Rp50.000',
    description: 'Belanja 2 barang mahal',
  },
];

export const TUKAR_CHALLENGES = [
  { target: 10000, targetLabel: 'Rp10.000' },
  { target: 20000, targetLabel: 'Rp20.000' },
  { target: 50000, targetLabel: 'Rp50.000' },
];

export const WALLET_DENOMINATIONS = [
  { value: 1000, label: 'Rp1.000', shortLabel: '1K', gradientFrom: '#D4B896', gradientTo: '#EDD5B4', textColor: '#5D3A1A' },
  { value: 2000, label: 'Rp2.000', shortLabel: '2K', gradientFrom: '#B8C0CC', gradientTo: '#D8E0EC', textColor: '#2C3E50' },
  { value: 5000, label: 'Rp5.000', shortLabel: '5K', gradientFrom: '#8B6E52', gradientTo: '#C4A882', textColor: '#3E1A00' },
  { value: 10000, label: 'Rp10.000', shortLabel: '10K', gradientFrom: '#7B3FAB', gradientTo: '#B080DF', textColor: '#1E0040' },
  { value: 20000, label: 'Rp20.000', shortLabel: '20K', gradientFrom: '#2E7D32', gradientTo: '#66BB6A', textColor: '#0A2000' },
  { value: 50000, label: 'Rp50.000', shortLabel: '50K', gradientFrom: '#1565C0', gradientTo: '#5B9BD5', textColor: '#051530' },
];

export const TUKAR_DENOMINATIONS = [
  { value: 1000, label: 'Rp1.000', gradientFrom: '#D4B896', gradientTo: '#EDD5B4', textColor: '#5D3A1A' },
  { value: 2000, label: 'Rp2.000', gradientFrom: '#B8C0CC', gradientTo: '#D8E0EC', textColor: '#2C3E50' },
  { value: 5000, label: 'Rp5.000', gradientFrom: '#8B6E52', gradientTo: '#C4A882', textColor: '#3E1A00' },
  { value: 10000, label: 'Rp10.000', gradientFrom: '#7B3FAB', gradientTo: '#B080DF', textColor: '#1E0040' },
  { value: 20000, label: 'Rp20.000', gradientFrom: '#2E7D32', gradientTo: '#66BB6A', textColor: '#0A2000' },
];

export const formatRupiah = (amount: number): string => {
  return 'Rp' + amount.toLocaleString('id-ID');
};
