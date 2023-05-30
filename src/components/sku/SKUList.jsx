import { Button, Card, Col, Input, Row, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

const SKUList = ({ editData = [], data = [], onChange }) => {
  const [dataSource, setDataSource] = useState([]);
  const [bulk, setBulk] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      const filterData = data.filter((item) => item.valueList?.length);
      const generateSKUs = (attributes, index, prefix, skuList) => {
        if (index === attributes.length) {
          skuList.push({
            ...prefix,
            goodsCost: 0,
            price: 0,
            membershipPrice: 0,
            skuCode: 0,
            stock: 0,
          });
          return;
        }
        const attribute = attributes[index];
        const { attribute_name = '', attribute_value = '', valueList } = attribute;
        for (let i = 0; i < valueList?.length; i++) {
          const obj = valueList[i];
          const value = obj?.value;
          const attributes_teemp = { ...prefix.attributes };
          attributes_teemp[attribute_name] = {
            value,
            attributeId: attribute_value,
            attribute_name,
          };

          const newPrefix = {
            ...prefix,
            [attribute_name]: value,
            attributes: attributes_teemp,
            skuId: skuList.length,
            // imageUrl: obj?.imageUrl ? [obj?.imageUrl] : undefined,
          };
          generateSKUs(attributes, index + 1, newPrefix, skuList);
        }
      };

      // Generate SKU data
      const updatedDataSource = [];
      generateSKUs(filterData, 0, {}, updatedDataSource);
      if (editData.length > 0) {
        setDataSource(editData);
      } else {
        setDataSource(updatedDataSource);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const columns = [
    ...data.map((attribute) => ({
      title: attribute.attribute_name,
      dataIndex: attribute.attribute_name,
      // render: (text, record, index) => {
      //   return mergeCells(
      //     text,
      //     index,
      //     dataSource,
      //     (row) => record[attribute.attribute_name] === row[attribute.attribute_name],
      //   );
      // },
      onCell: (record, index) => {
        const text = record[attribute.attribute_name];
        return mergeCells(
          text,
          index,
          dataSource,
          (row) => record[attribute.attribute_name] === row[attribute.attribute_name],
        );
      },
    })),
    {
      title: '成本价',
      dataIndex: 'goodsCost',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'goodsCost', e.target.value)}
        />
      ),
    },
    {
      title: '销售价',
      dataIndex: 'price',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'price', e.target.value)}
        />
      ),
    },
    {
      title: '会员价',
      dataIndex: 'membershipPrice',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'membershipPrice', e.target.value)}
        />
      ),
    },
    {
      title: '销售库存',
      dataIndex: 'stock',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'stock', e.target.value)}
        />
      ),
    },
    {
      title: 'sku编码',
      dataIndex: 'skuCode',
      render: (text, record, index) => (
        <Input
          value={text}
          style={{ width: 160 }}
          onChange={(e) => handleEntryDataChange(index, 'skuCode', e.target.value)}
        />
      ),
    },
  ];

  const handleEntryDataChange = (index, dataIndex, value) => {
    const newData = [...dataSource];
    newData[index][dataIndex] = value;
    setDataSource(newData);
    // //
    // const datas = newData.map((item) => {
    //   const { attributes = [], ...rest } = item;
    //   return {
    //     ...rest,
    //     attributes: Object.values(attributes),
    //   };
    // });
    // onChange?.(datas);
  };

  const handleEntryDataSave = () => {
    const datas = dataSource.map((item) => {
      const { attributes = [], ...rest } = item;
      const obj = data?.[0];
      let imageUrl = undefined;
      if (obj && obj?.valueList) {
        obj?.valueList.forEach((ie) => {
          if (ie?.value === rest?.[obj?.attribute_name]) {
            imageUrl = ie?.imageUrl;
          }
        });
      }
      return {
        ...rest,
        imageUrl,
        attributes: Object.values(attributes),
      };
    });

    onChange?.(datas);
  };

  return (
    <Card>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        {dataSource && dataSource.length > 0 && (
          <Row justify="space-between" align="middle">
            <Col span={1.5}>批量设置</Col>
            <Col span={4}>
              <Tooltip trigger={['focus']} title="成本价" placement="topLeft">
                <Input
                  onChange={(e) => {
                    setBulk({ ...bulk, goodsCost: e.target.value });
                  }}
                  placeholder="成本价"
                />
              </Tooltip>
            </Col>
            <Col span={4}>
              <Tooltip trigger={['focus']} title="销售价" placement="topLeft">
                <Input
                  onChange={(e) => {
                    setBulk({ ...bulk, price: e.target.value });
                  }}
                  placeholder="销售价"
                />
              </Tooltip>
            </Col>
            <Col span={4}>
              <Tooltip trigger={['focus']} title="会员价" placement="topLeft">
                <Input
                  onChange={(e) => {
                    setBulk({ ...bulk, membershipPrice: e.target.value });
                  }}
                  placeholder="会员价"
                />
              </Tooltip>
            </Col>
            <Col span={4}>
              <Tooltip trigger={['focus']} title="销售库存" placement="topLeft">
                <Input
                  onChange={(e) => {
                    setBulk({ ...bulk, stock: e.target.value });
                  }}
                  placeholder="销售库存"
                />
              </Tooltip>
            </Col>
            <Col span={4}>
              <Tooltip trigger={['focus']} title="sku编码" placement="topLeft">
                <Input
                  onChange={(e) => {
                    setBulk({ ...bulk, skuCode: e.target.value });
                  }}
                  placeholder="sku编码"
                />
              </Tooltip>
            </Col>
            <Col span={1.5}>
              <Button
                onClick={() => {
                  setDataSource(dataSource.map((item) => ({ ...item, ...bulk })));
                }}
              >
                设置
              </Button>
            </Col>
          </Row>
        )}
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowKey="skuId"
          size="small"
          scroll={{ x: 990 }}
        />
        <Row justify="end">
          {dataSource && dataSource.length > 0 && (
            <Col>
              <Button type="primary" onClick={handleEntryDataSave}>
                保存规格
              </Button>
            </Col>
          )}
        </Row>
      </Space>
    </Card>
  );
};

export default SKUList;

export function mergeCells(value, index, dataList, predicate = () => true) {
  const obj = {};
  let i = index - 1;
  if (dataList[i] && predicate(dataList[i])) {
    obj.rowSpan = 0;
  } else {
    i = index + 1;
    while (dataList[i] && predicate(dataList[i])) i++;
    obj.rowSpan = i - index;
  }
  return obj;
}
