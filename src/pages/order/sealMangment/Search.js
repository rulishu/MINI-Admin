import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useState } from 'react';

const Search = () => {
  const [filters, setFilters] = useState({ name: '', group: '', orderNumber: '' });

  const handleSearch = () => {
    // const { name, group, orderNumber } = filters;
    // const filtered = data.filter(
    //   (item) =>
    //     item.name.includes(name) &&
    //     item.group.includes(group) &&
    //     item.order_number.includes(orderNumber),
    // );
    // setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({ name: '', group: '', orderNumber: '' });
    // setSearchText('');
    // setFilteredData(data);
  };

  const handleFilterChange = (key) => (e) => {
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="请输入商品名称"
          allowClear
          value={filters.name}
          onChange={handleFilterChange('name')}
          style={{ width: 200, marginRight: 8 }}
        />
        <Input
          placeholder="请输入商品分组"
          allowClear
          value={filters.group}
          onChange={handleFilterChange('group')}
          style={{ width: 200, marginRight: 8 }}
        />
        <Input
          placeholder="请输入订单编号"
          allowClear
          value={filters.orderNumber}
          onChange={handleFilterChange('orderNumber')}
          style={{ width: 200, marginRight: 8 }}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
          查询
        </Button>
        <Button icon={<RedoOutlined />} onClick={handleReset} style={{ marginLeft: 8 }}>
          重置
        </Button>
      </div>
    </div>
  );
};

export default Search;
