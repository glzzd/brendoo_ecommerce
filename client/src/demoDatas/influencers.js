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
    description: 'Dəb və yaşam tərzi üzrə mütəxəssis',
    stories: [
      { id: 101, type: 'image', url: inf1, duration: 3000 },
      { id: 102, type: 'text', content: 'Yeni kolleksiya möhtəşəmdir! 😍', bg: 'bg-purple-500', duration: 3000 }
    ]
  },
  {
    id: 2,
    name: 'Samir Əliyev',
    handle: '@samir_aliyev',
    image: inf2,
    followers: '89K',
    description: 'Texnologiya və qadcet icmalları',
    stories: [
        { id: 201, type: 'image', url: inf2, duration: 3000 },
        { id: 202, type: 'text', content: 'Bu gün yeni iPhone icmalı gəlir!', bg: 'bg-blue-600', duration: 3000 }
    ]
  },
  {
    id: 3,
    name: 'Günay Həsənova',
    handle: '@gunay_style',
    image: inf3,
    followers: '230K',
    description: 'Gözəllik və makiyaj sirləri',
    stories: [
        { id: 301, type: 'image', url: inf3, duration: 3000 },
        { id: 302, type: 'text', content: 'Axşam saat 20:00-da canlı yayımdayam', bg: 'bg-pink-500', duration: 3000 }
    ]
  }
];
