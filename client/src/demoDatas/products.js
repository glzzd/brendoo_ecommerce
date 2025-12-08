import adidas from '../assets/brands/adidas.svg';
import bershka from '../assets/brands/bershka.svg';
import chanel from '../assets/brands/chanel.webp';
import massimo from '../assets/brands/massimo.png';
import nike from '../assets/brands/nike.png';
import zara from '../assets/brands/zara.png';

export const products = [
  {
    id: 1,
    name: {
      az: 'Ultraboost Light Qaçış Ayaqqabısı',
      en: 'Ultraboost Light Running Shoes',
      tr: 'Ultraboost Light Koşu Ayakkabısı'
    },
    description: {
      az: 'Hər addımda maksimum enerji qaytarılması üçün nəzərdə tutulmuşdur.',
      en: 'Designed for maximum energy return in every step.',
      tr: 'Her adımda maksimum enerji dönüşü için tasarlandı.'
    },
    brand: 'Adidas',
    brandSlug: 'adidas',
    image: adidas,
    images: [adidas, nike, zara],
    price: 180,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    views: 12500,
    category: 'kisi-geyimi',
    type: 'shoes',
    createdAt: '2023-12-01T10:00:00Z'
  },
  {
    id: 2,
    name: {
      az: "Air Force 1 '07",
      en: "Air Force 1 '07",
      tr: "Air Force 1 '07"
    },
    description: {
      az: 'Klassik basketbol stili, gündəlik istifadə üçün yeniləndi.',
      en: 'Classic basketball style updated for everyday wear.',
      tr: 'Günlük kullanım için yenilenen klasik basketbol stili.'
    },
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    images: [nike, adidas, zara],
    price: 110,
    rating: 4.9,
    reviewCount: 856,
    isBestSeller: true,
    views: 18900,
    category: 'kisi-geyimi',
    type: 'shoes',
    createdAt: '2023-11-20T14:30:00Z'
  },
  {
    id: 3,
    name: {
      az: 'Oversize Yun Palto',
      en: 'Oversized Wool Coat',
      tr: 'Oversize Yün Kaban'
    },
    description: {
      az: 'Soyuq havalar üçün isti və şık seçim.',
      en: 'Warm and stylish choice for cold weather.',
      tr: 'Soğuk havalar için sıcak ve şık seçim.'
    },
    brand: 'Zara',
    brandSlug: 'zara',
    image: zara,
    images: [zara, bershka, massimo],
    price: 129.99,
    rating: 4.5,
    reviewCount: 45,
    views: 8400,
    category: 'qadin-geyimi',
    type: 'clothing',
    createdAt: '2023-11-25T09:15:00Z'
  },
  {
    id: 4,
    name: {
      az: 'Geniş Balaq Cins',
      en: 'Wide-leg Jeans',
      tr: 'Geniş Paça Kot Pantolon'
    },
    description: {
      az: 'Yüksək belli, rahat və modern görünüş.',
      en: 'High-waisted, comfortable and modern look.',
      tr: 'Yüksek belli, rahat ve modern görünüm.'
    },
    brand: 'Bershka',
    brandSlug: 'bershka',
    image: bershka,
    images: [bershka, zara, nike],
    price: 45.90,
    originalPrice: 59.90,
    rating: 4.6,
    reviewCount: 210,
    discount: 23,
    views: 9200,
    category: 'qadin-geyimi',
    type: 'clothing',
    createdAt: '2023-10-15T16:45:00Z'
  },
  {
    id: 5,
    name: {
      az: 'Slim Fit Pambıq Köynək',
      en: 'Slim Fit Cotton Shirt',
      tr: 'Slim Fit Pamuklu Gömlek'
    },
    description: {
      az: 'Rəsmi və gündəlik geyim üçün ideal seçim.',
      en: 'Ideal choice for formal and casual wear.',
      tr: 'Resmi ve günlük giyim için ideal seçim.'
    },
    brand: 'Massimo Dutti',
    brandSlug: 'massimo-dutti',
    image: massimo,
    price: 89.95,
    rating: 4.7,
    isNew: true,
    reviewCount: 32,
    views: 5600,
    category: 'kisi-geyimi',
    type: 'clothing',
    createdAt: '2023-12-05T11:20:00Z'
  },
  {
    id: 6,
    name: {
      az: 'Coco Mademoiselle',
      en: 'Coco Mademoiselle',
      tr: 'Coco Mademoiselle'
    },
    description: {
      az: 'Qadınlar üçün şərq qoxulu, təravətli ətir.',
      en: 'Oriental, fresh fragrance for women.',
      tr: 'Kadınlar için oryantal, taze bir koku.'
    },
    brand: 'Chanel',
    brandSlug: 'chanel',
    image: chanel,
    images: [chanel, chanel, chanel],
    price: 135,
    rating: 5.0,
    reviewCount: 1500,
    isBestSeller: true,
    views: 25000,
    category: 'etriyyat-kosmetika',
    type: 'perfume',
    createdAt: '2023-09-10T08:00:00Z'
  },
  {
    id: 7,
    name: {
      az: 'Tech Fleece Hudi',
      en: 'Tech Fleece Hoodie',
      tr: 'Tech Fleece Kapüşonlu Üst'
    },
    description: {
      az: 'Yüngül çəkidə istilik və müasir stil.',
      en: 'Lightweight warmth and modern style.',
      tr: 'Hafif sıcaklık ve modern tarz.'
    },
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    price: 130,
    rating: 4.8,
    reviewCount: 420,
    views: 14500,
    category: 'kisi-geyimi',
    type: 'clothing',
    createdAt: '2023-11-01T13:00:00Z'
  },
  {
    id: 8,
    name: {
      az: 'Forum Low Ayaqqabı',
      en: 'Forum Low Shoes',
      tr: 'Forum Low Ayakkabı'
    },
    description: {
      az: '80-ci illərin basketbol ikonu, uşaqlar üçün.',
      en: "80's basketball icon, for kids.",
      tr: "Çocuklar için 80'lerin basketbol ikonu."
    },
    brand: 'Adidas',
    brandSlug: 'adidas',
    image: adidas,
    price: 100,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 180,
    views: 7800,
    category: 'usag-geyimi',
    type: 'shoes',
    createdAt: '2023-10-25T15:30:00Z'
  },
  {
    id: 9,
    name: {
      az: 'Naxışlı Midi Don',
      en: 'Printed Midi Dress',
      tr: 'Desenli Midi Elbise'
    },
    description: {
      az: 'Zərif naxışlarla bəzədilmiş axıcı parça.',
      en: 'Flowy fabric adorned with elegant patterns.',
      tr: 'Zarif desenlerle süslenmiş akıcı kumaş.'
    },
    brand: 'Zara',
    brandSlug: 'zara',
    image: zara,
    price: 69.90,
    rating: 4.4,
    reviewCount: 65,
    isNew: true,
    views: 3200,
    category: 'qadin-geyimi',
    type: 'clothing',
    createdAt: '2023-12-08T09:00:00Z'
  },
  {
    id: 10,
    name: {
      az: 'Air Max 90',
      en: 'Air Max 90',
      tr: 'Air Max 90'
    },
    description: {
      az: 'Rahatlıq və irs, gənc nəsil üçün.',
      en: 'Comfort and heritage, for the younger generation.',
      tr: 'Genç nesil için konfor ve miras.'
    },
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    price: 130,
    rating: 4.8,
    reviewCount: 320,
    isNew: true,
    views: 11000,
    category: 'usag-geyimi',
    type: 'shoes',
    createdAt: '2023-12-02T10:45:00Z'
  },
  {
    id: 11,
    name: {
      az: 'Kətan Pencək',
      en: 'Linen Blazer',
      tr: 'Keten Ceket'
    },
    description: {
      az: 'Yaz ayları üçün yüngül və nəfəs alan kətan.',
      en: 'Lightweight and breathable linen for summer months.',
      tr: 'Yaz ayları için hafif ve nefes alan keten.'
    },
    brand: 'Massimo Dutti',
    brandSlug: 'massimo-dutti',
    image: massimo,
    price: 149.00,
    originalPrice: 199.00,
    rating: 4.7,
    reviewCount: 42,
    discount: 25,
    views: 4500,
    category: 'qadin-geyimi',
    type: 'clothing',
    createdAt: '2023-11-12T14:15:00Z'
  },
  {
    id: 12,
    name: {
      az: 'Bleu de Chanel',
      en: 'Bleu de Chanel',
      tr: 'Bleu de Chanel'
    },
    description: {
      az: 'Kişilər üçün aromatik-odunsu ətir.',
      en: 'Aromatic-woody fragrance for men.',
      tr: 'Erkekler için aromatik-odunsu koku.'
    },
    brand: 'Chanel',
    brandSlug: 'chanel',
    image: chanel,
    price: 115,
    originalPrice: 145,
    rating: 4.9,
    reviewCount: 890,
    discount: 20,
    views: 19500,
    category: 'etriyyat-kosmetika',
    type: 'perfume',
    createdAt: '2023-09-20T11:30:00Z'
  }
];
