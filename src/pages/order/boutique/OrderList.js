import { Button, Card, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

const { Meta } = Card;
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
async function getBoutiqueOrder() {
  return { data: wines };
}

const WineList = () => {
  const [wines, setWines] = useState([]);
  const [filteredWines, setFilteredWines] = useState([]);

  const getWines = async () => {
    const params = {};
    const { data } = await getBoutiqueOrder(params);
    console.log('【 data 】==>', data);
    setWines(data);
    setFilteredWines(data);
  };

  useEffect(() => {
    getWines();
  }, []);

  const handleFilter = (values) => {
    let filtered = wines.filter((wine) => {
      return (
        wine.name.includes(values.name) &&
        wine.price.toString().includes(values.price) &&
        wine.description.includes(values.description) &&
        wine.inventory.toString().includes(values.inventory)
      );
    });
    setFilteredWines(filtered);
  };

  return (
    <div>
      <Form onFinish={handleFilter} layout="inline" style={{ marginBottom: '16px' }}>
        <Form.Item name="name" label="名称">
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item name="price" label="价格">
          <Input placeholder="请输入价格" />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input placeholder="请输入描述" />
        </Form.Item>
        <Form.Item name="inventory" label="库存量">
          <Input placeholder="请输入库存量" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredWines.map((wine) => (
          <Card key={wine.id} hoverable style={{ width: 240, margin: '16px' }}>
            <img
              src={wine.image}
              alt={wine.name}
              style={{ height: 240, width: 190, objectFit: 'contain' }}
            />
            <Meta title={wine.name} description={wine.description} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>价格：{wine.price} 元</div>
              <div>库存：{wine.inventory}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WineList;
