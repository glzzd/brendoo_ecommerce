import adidas from '../assets/brands/adidas.svg';
import bershka from '../assets/brands/bershka.svg';
import chanel from '../assets/brands/chanel.webp';
import massimo from '../assets/brands/massimo.png';
import nike from '../assets/brands/nike.png';
import zara from '../assets/brands/zara.png';

export const products = [
  {
    id: 1,
    name: 'Ultraboost Light Running Shoes',
    brand: 'Adidas',
    brandSlug: 'adidas',
    image: adidas,
    price: 180,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    views: 12500
  },
  {
    id: 2,
    name: 'Air Force 1 \'07',
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    price: 110,
    rating: 4.9,
    reviewCount: 856,
    isBestSeller: true,
    views: 18900
  },
  {
    id: 3,
    name: 'Oversized Wool Coat',
    brand: 'Zara',
    brandSlug: 'zara',
    image: zara,
    price: 129.99,
    rating: 4.5,
    reviewCount: 45,
    views: 8400
  },
  {
    id: 4,
    name: 'Wide-leg Jeans',
    brand: 'Bershka',
    brandSlug: 'bershka',
    image: bershka,
    price: 45.90,
    originalPrice: 59.90,
    rating: 4.6,
    reviewCount: 210,
    discount: 23,
    views: 9200
  },
  {
    id: 5,
    name: 'Slim Fit Cotton Shirt',
    brand: 'Massimo Dutti',
    brandSlug: 'massimo-dutti',
    image: massimo,
    price: 89.95,
    rating: 4.7,
    isNew: true,
    reviewCount: 32,
    views: 5600
  },
  {
    id: 6,
    name: 'Coco Mademoiselle',
    brand: 'Chanel',
    brandSlug: 'chanel',
    image: chanel,
    price: 135,
    rating: 5.0,
    reviewCount: 1500,
    isBestSeller: true,
    views: 25000
  },
  {
    id: 7,
    name: 'Tech Fleece Hoodie',
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    price: 130,
    rating: 4.8,
    reviewCount: 420,
    views: 14500
  },
  {
    id: 8,
    name: 'Forum Low Shoes',
    brand: 'Adidas',
    brandSlug: 'adidas',
    image: adidas,
    price: 100,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 180,
    views: 7800
  },
  {
    id: 9,
    name: 'Printed Midi Dress',
    brand: 'Zara',
    brandSlug: 'zara',
    image: zara,
    price: 69.90,
    rating: 4.4,
    reviewCount: 65,
    isNew: true,
    views: 3200
  },
  {
    id: 10,
    name: 'Air Max 90',
    brand: 'Nike',
    brandSlug: 'nike',
    image: nike,
    price: 130,
    rating: 4.8,
    reviewCount: 320,
    isNew: true,
    views: 11000
  },
  {
    id: 11,
    name: 'Linen Blazer',
    brand: 'Massimo Dutti',
    brandSlug: 'massimo-dutti',
    image: massimo,
    price: 149.00,
    originalPrice: 199.00,
    rating: 4.7,
    reviewCount: 42,
    discount: 25,
    views: 4500
  },
  {
    id: 12,
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    brandSlug: 'chanel',
    image: chanel,
    price: 115,
    originalPrice: 145,
    rating: 4.9,
    reviewCount: 890,
    discount: 20,
    views: 19500
  }
];
