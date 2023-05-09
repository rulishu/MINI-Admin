export async function getBoutiqueOrder() {
  return { data: wines };
}

const wines = [
  {
    id: 1,
    name: 'Cabernet Sauvignon',
    price: 188,
    description: '红酒的经典，柔和且复杂，适合多种口味。',
    inventory: 100,
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
  {
    id: 2,
    name: 'Chardonnay',
    price: 168,
    description: '清爽且充满果香，适合搭配各种菜肴。',
    inventory: 50,
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
  {
    id: 3,
    name: 'Sauvignon Blanc',
    price: 128,
    description: '果香浓郁，口感清新，是夏日的最爱。',
    inventory: 80,
    image: 'https://img.yzcdn.cn/vant/cat.jpeg',
  },
];
