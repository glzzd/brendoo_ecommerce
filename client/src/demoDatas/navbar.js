export const navbarItems = [
  {
    id: 1,
    name: 'Home',
    link: '/',
    isActive: true,
  },
  {
    id: 2,
    name: 'Shop',
    link: '/shop',
    children: [
      {
        id: 21,
        name: 'Giyim',
        link: '/shop/giyim',
        children: [
          { id: 211, name: 'Erkek', link: '/shop/giyim/erkek' },
          { id: 212, name: 'Kadın', link: '/shop/giyim/kadin' },
          { id: 213, name: 'Çocuk', link: '/shop/giyim/cocuk' },
        ],
      },
      {
        id: 22,
        name: 'Ayakkabı',
        link: '/shop/ayakkabi',
        children: [
          { id: 221, name: 'Sneakers', link: '/shop/ayakkabi/sneakers' },
          { id: 222, name: 'Bot', link: '/shop/ayakkabi/bot' },
          { id: 223, name: 'Topuklu', link: '/shop/ayakkabi/topuklu' },
        ],
      },
      {
        id: 23,
        name: 'Aksesuar',
        link: '/shop/aksesuar',
        children: [
          { id: 231, name: 'Çanta', link: '/shop/aksesuar/canta' },
          { id: 232, name: 'Takı', link: '/shop/aksesuar/taki' },
          { id: 233, name: 'Kemer', link: '/shop/aksesuar/kemer' },
        ],
      },
      {
        id: 24,
        name: 'Elektronik',
        link: '/shop/elektronik',
        children: [
          { id: 241, name: 'Telefonlar', link: '/shop/elektronik/telefonlar' },
          { id: 242, name: 'Bilgisayarlar', link: '/shop/elektronik/bilgisayarlar' },
          { id: 243, name: 'Aksesuarlar', link: '/shop/elektronik/aksesuarlar' },
        ],
      },
      {
        id: 25,
        name: 'Güzellik',
        link: '/shop/guzellik',
        children: [
          { id: 251, name: 'Makyaj', link: '/shop/guzellik/makyaj' },
          { id: 252, name: 'Cilt Bakımı', link: '/shop/guzellik/cilt-bakimi' },
          { id: 253, name: 'Parfüm', link: '/shop/guzellik/parfum' },
        ],
      },
      {
        id: 26,
        name: 'Ev',
        link: '/shop/ev',
        children: [
          { id: 261, name: 'Mobilya', link: '/shop/ev/mobilya' },
          { id: 262, name: 'Mutfak', link: '/shop/ev/mutfak' },
          { id: 263, name: 'Dekorasyon', link: '/shop/ev/dekorasyon' },
        ],
      },
      { id: 27, name: 'Yeni Gelenler', link: '/shop/yeni-gelenler' },
      { id: 28, name: 'İndirim', link: '/shop/indirim' },
    ],
  },
  { id: 3, name: 'Hakkımızda', link: '/about' },
  { id: 4, name: 'İletişim', link: '/contact' },
]