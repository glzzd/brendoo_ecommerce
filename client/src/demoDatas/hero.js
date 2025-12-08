// Hero bölümü için demo verileri (dinamikmiş gibi kullanılacak)
// Not: imageKey değerleri Hero.jsx içinde import edilen görsellerle eşleştirilir.
export const heroSlides = [
  {
    id: 1,
    imageKey: 'hero1',
    title: {
      az: 'Yeni Sezon Kolleksiyası',
      en: 'New Season Collection',
      tr: 'Yeni Sezon Koleksiyonu'
    },
    description: {
      az: 'Gündəlik rahatlıq və şık görünüş bir arada.',
      en: 'Everyday comfort and stylish look combined.',
      tr: 'Günlük rahatlık ve şık görünüm bir arada.'
    },
    ctaText: {
      az: 'İndi kəşf et',
      en: 'Discover Now',
      tr: 'Şimdi Keşfet'
    },
    ctaLink: '/shop/yeni-gelenler',
    align: 'left',
  },
  {
    id: 2,
    imageKey: 'hero1',
    title: {
      az: 'Elektronika endirimləri',
      en: 'Electronics Discounts',
      tr: 'Elektronik İndirimleri'
    },
    description: {
      az: 'Telefon, noutbuk və aksesuarlar xüsusi qiymətlərlə.',
      en: 'Phones, laptops, and accessories at special prices.',
      tr: 'Telefon, laptop ve aksesuarlar özel fiyatlarla.'
    },
    ctaText: {
      az: 'Məhsullara bax',
      en: 'View Products',
      tr: 'Ürünlere Bak'
    },
    ctaLink: '/shop/elektronika',
    align: 'center',
  },
  {
    id: 3,
    imageKey: 'hero1',
    title: {
      az: 'Ətriyyat & kosmetika',
      en: 'Perfume & Cosmetics',
      tr: 'Parfüm & Kozmetik'
    },
    description: {
      az: 'Sevdiyin brendlər üçün seçilmiş kampaniyalar.',
      en: 'Selected campaigns for your favorite brands.',
      tr: 'Sevdiğiniz markalar için seçilmiş kampanyalar.'
    },
    ctaText: {
      az: 'Endirimləri gör',
      en: 'See Discounts',
      tr: 'İndirimleri Gör'
    },
    ctaLink: '/shop/endirim',
    align: 'right',
  },
]
