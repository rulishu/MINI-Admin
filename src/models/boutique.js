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
    image:
      'https://img2.baidu.com/it/u=1112867676,244262082&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500',
  },
  {
    id: 2,
    name: 'Chardonnay',
    price: 168,
    description: '清爽且充满果香，适合搭配各种菜肴。',
    inventory: 50,
    image:
      'https://img0.baidu.com/it/u=4114436070,1313606601&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=800',
  },
  {
    id: 3,
    name: 'Sauvignon Blanc',
    price: 128,
    description: '果香浓郁，口感清新，是夏日的最爱。',
    inventory: 80,
    image:
      'https://img1.baidu.com/it/u=3554506093,2922680059&fm=253&fmt=auto&app=138&f=JPEG?w=580&h=500',
  },
];
