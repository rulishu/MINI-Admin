import { getBoutiqueOrder } from '@/models/boutique';
import { Button, Card, Form, Input } from 'antd';
import { useEffect, useState } from 'react';

const { Meta } = Card;

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
            <img src={wine.image} alt={wine.name} style={{ height: 240, objectFit: 'cover' }} />
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
