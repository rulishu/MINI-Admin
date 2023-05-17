import { Button, Input, Table } from 'antd';
import { useEffect, useState } from 'react';

const SKUList = ({ editData = [], data = [], onChange }) => {
  console.log('SKUListvalue: ', editData, data);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const generateSKUs = (attributes, index, prefix, skuList) => {
        if (index === attributes.length) {
          skuList.push({
            ...prefix,
            // skuName: '',
            sales: 0,
            price: 0,
            stock: 0,
          });
          return;
        }

        const attribute = attributes[index];
        const { attribute_name = '', attribute_value = '', valueList = [] } = attribute;
        for (let i = 0; i < valueList.length; i++) {
          const value = valueList[i];
          const attributes_teemp = { ...prefix.attributes };
          attributes_teemp[attribute_name] = {
            value,
            attributeId: attribute_value,
            attribute_name,
          };

          const newPrefix = {
            ...prefix,
            itemId: skuList.length,
            [attribute_name]: value,
            attributes: attributes_teemp,
          };
          generateSKUs(attributes, index + 1, newPrefix, skuList);
        }
      };

      // Generate SKU data
      const updatedDataSource = [];
      generateSKUs(data, 0, {}, updatedDataSource);
      console.log('updatedDataSource: ', updatedDataSource);
      if (editData.length > 0) {
        setDataSource(editData);
      } else {
        setDataSource(updatedDataSource);
      }
    }
  }, [data]);

  const columns = [
    ...data.map((attribute) => ({
      title: attribute.attribute_name,
      dataIndex: attribute.attribute_name,
      key: attribute.attribute_name,
    })),
    // {
    //   title: 'SKU名称',
    //   dataIndex: 'skuName',
    //   key: 'skuName',
    //   render: (text, record, index) => (
    //     <Input
    //       value={text}
    //       style={{ width: 160 }}
    //       onChange={(e) => handleEntryDataChange(index, 'skuName', e.target.value)}
    //     />
    //   ),
    // },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'sales', e.target.value)}
        />
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'price', e.target.value)}
        />
      ),
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'stock', e.target.value)}
        />
      ),
    },
  ];

  const handleEntryDataChange = (index, dataIndex, value) => {
    const newData = [...dataSource];
    newData[index][dataIndex] = value;
    setDataSource(newData);
  };

  const handleEntryDataSave = () => {
    const datas = dataSource.map((item) => {
      const { attributes = [], ...rest } = item;
      return {
        ...rest,
        attributes: Object.values(attributes),
      };
    });

    onChange?.(datas);
  };

  console.log('dataSource: ', dataSource);
  return (
    <div>
      <Button type="primary" style={{ marginBlock: 16, width: 120 }} onClick={handleEntryDataSave}>
        保存规格列表
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        // rowKey="itemId"
        bordered
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default SKUList;
