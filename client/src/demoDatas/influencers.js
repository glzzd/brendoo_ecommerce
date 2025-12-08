import inf1 from '../assets/influencers/inf1.jpg';
import inf2 from '../assets/influencers/inf2.webp';
import inf3 from '../assets/influencers/inf3.jpeg';

export const influencers = [
  {
    id: 1,
    name: 'Aysel Məmmədova',
    handle: '@aysel_m',
    image: inf1,
    followers: '125K',
    description: {
      az: 'Dəb və yaşam tərzi üzrə mütəxəssis',
      en: 'Fashion and lifestyle expert',
      tr: 'Moda ve yaşam tarzı uzmanı'
    },
    stories: [
      { id: 101, type: 'image', url: inf1, duration: 3000 },
      { 
        id: 102, 
        type: 'text', 
        content: {
          az: 'Yeni kolleksiya möhtəşəmdir! 😍',
          en: 'The new collection is amazing! 😍',
          tr: 'Yeni koleksiyon muhteşem! 😍'
        }, 
        bg: 'bg-purple-500', 
        duration: 3000 
      }
    ]
  },
  {
    id: 2,
    name: 'Samir Əliyev',
    handle: '@samir_aliyev',
    image: inf2,
    followers: '89K',
    description: {
      az: 'Texnologiya və qadcet icmalları',
      en: 'Technology and gadget reviews',
      tr: 'Teknoloji ve gadget incelemeleri'
    },
    stories: [
        { id: 201, type: 'image', url: inf2, duration: 3000 },
        { 
          id: 202, 
          type: 'text', 
          content: {
            az: 'Bu gün yeni iPhone icmalı gəlir!',
            en: 'New iPhone review coming today!',
            tr: 'Bugün yeni iPhone incelemesi geliyor!'
          }, 
          bg: 'bg-blue-600', 
          duration: 3000 
        }
    ]
  },
  {
    id: 3,
    name: 'Günay Həsənova',
    handle: '@gunay_style',
    image: inf3,
    followers: '230K',
    description: {
      az: 'Gözəllik və makiyaj sirləri',
      en: 'Beauty and makeup secrets',
      tr: 'Güzellik ve makyaj sırları'
    },
    stories: [
        { id: 301, type: 'image', url: inf3, duration: 3000 },
        { 
          id: 302, 
          type: 'text', 
          content: {
            az: 'Axşam saat 20:00-da canlı yayımdayam',
            en: "I'm live tonight at 20:00",
            tr: "Bu akşam saat 20:00'de canlı yayındayım"
          }, 
          bg: 'bg-pink-500', 
          duration: 3000 
        }
    ]
  }
];
