import { Button, Col, Input, InputNumber, Row, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

const SKUList = ({ oldData = [], topData = [], onChange }) => {
  const [dataSource, setDataSource] = useState([]);
  const [bulk, setBulk] = useState({});

  useEffect(() => {
    if (topData && topData.length > 0) {
      const filterData = topData.filter((item) => item.valueList?.length);
      const generateSKUs = (attributes, index, prefix, skuList) => {
        if (index === attributes.length) {
          skuList.push({
            ...prefix,
            goodsCost: '0',
            price: '0',
            referencePrice: '0',
            membershipPrice: '0',
            skuCode: '0',
            stock: '0',
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
            attrId: `${prefix.attrId ?? ''}${attribute_value}-${value}`,
            [attribute_name]: value,
            attributes: attributes_teemp,
            flag: true,
            // imageUrl: obj?.imageUrl ? [obj?.imageUrl] : undefined,
          };
          generateSKUs(attributes, index + 1, newPrefix, skuList);
        }
      };

      // Generate SKU topData
      const updatedDataSource = [];
      generateSKUs(filterData, 0, {}, updatedDataSource);

      // 如果规格值相同，将旧数据赋值
      if (oldData.length > 0) {
        let newDataSource = [].concat(updatedDataSource);
        updatedDataSource.forEach((item, index) => {
          //
          oldData.forEach((theAttrbuteData) => {
            let type = true;

            const { attributes, ...others } = theAttrbuteData;
            if (attributes?.length === Object.keys(item?.attributes)?.length) {
              attributes.forEach((i) => {
                //
                if (item?.attributes?.[i?.attribute_name]) {
                  if (
                    item?.attributes?.[i?.attribute_name]?.attribute_name === i?.attribute_name &&
                    item?.attributes?.[i?.attribute_name]?.value === i?.value
                  ) {
                    type = type && true;
                    //
                  } else {
                    type = false;
                  }
                }
              });
            } else {
              type = false;
            }
            if (type) {
              newDataSource[index] = { ...item, ...others, flag: false };
            }
          });
        });
        if (newDataSource.length > 0) {
          setDataSource(newDataSource);
          handleEntryDataSave(newDataSource);
        } else {
          setDataSource(updatedDataSource);
          handleEntryDataSave(updatedDataSource);
        }
      } else {
        setDataSource(updatedDataSource);
        handleEntryDataSave(updatedDataSource);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topData]);

  const columns = [
    ...topData.map((attribute) => ({
      title: attribute.attribute_name,
      dataIndex: attribute.attribute_name,
      width: 130,
      // render: (text, record, index) => {
      //   return mergeCells(
      //     text,
      //     index,
      //     dataSource,
      //     (row) => record[attribute.attribute_name] === row[attribute.attribute_name],
      //   );
      // },
      // onCell: (record, index) => {
      //   const text = record[attribute.attribute_name];
      //   return mergeCells(
      //     text,
      //     index,
      //     dataSource,
      //     (row) => record[attribute.attribute_name] === row[attribute.attribute_name],
      //   );
      // },
    })),
    {
      title: '成本价',
      dataIndex: 'goodsCost',
      width: 130,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          stringMode
          controls={false}
          precision={2}
          min={0}
          status={text ? '' : text === 0 ? '' : 'error'}
          value={text === 0 ? '0' : text}
          onChange={(value) => handleEntryDataChange(index, 'goodsCost', value)}
          onBlur={() => handleEntryDataSave()}
        />
      ),
    },
    {
      title: '销售价',
      dataIndex: 'price',
      width: 130,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          stringMode
          controls={false}
          precision={2}
          min={0}
          status={text ? '' : text === 0 ? '' : 'error'}
          value={text === 0 ? '0' : text}
          onChange={(value) => handleEntryDataChange(index, 'price', value)}
          onBlur={() => handleEntryDataSave()}
        />
      ),
    },
    {
      title: '会员价',
      dataIndex: 'membershipPrice',
      width: 130,
      render: (text) => (
        <InputNumber
          style={{ width: '100%' }}
          stringMode
          controls={false}
          precision={2}
          min={0}
          status={text ? '' : text === 0 ? '' : 'error'}
          disabled
          value={text === 0 ? '0' : text}
        />
      ),
    },
    {
      title: '参考价',
      dataIndex: 'referencePrice',
      width: 130,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          stringMode
          controls={false}
          precision={2}
          min={0}
          status={text ? '' : text === 0 ? '' : 'error'}
          value={text === 0 ? '0' : text}
          onChange={(value) => handleEntryDataChange(index, 'referencePrice', value)}
          onBlur={() => handleEntryDataSave()}
        />
      ),
    },
    {
      title: '销售库存',
      dataIndex: 'stock',
      width: 130,
      render: (text, record, index) => (
        <InputNumber
          style={{ width: '100%' }}
          stringMode
          controls={false}
          precision={0}
          min={0}
          status={text ? '' : text === 0 ? '' : 'error'}
          value={text === 0 ? '0' : text}
          onChange={(value) => handleEntryDataChange(index, 'stock', value)}
          onBlur={() => handleEntryDataSave()}
        />
      ),
    },
    {
      title: 'sku编码',
      dataIndex: 'skuCode',
      width: 130,
      render: (text, record, index) => (
        <Input
          status={text ? '' : text === 0 ? '' : 'error'}
          value={text === 0 ? '0' : text}
          style={{ width: '100%' }}
          onChange={(e) => handleEntryDataChange(index, 'skuCode', e.target.value)}
          onBlur={() => handleEntryDataSave()}
        />
      ),
    },
  ];

  const handleEntryDataChange = (index, dataIndex, value = '') => {
    const newData = [...dataSource];
    newData[index][dataIndex] = value;
    if (dataIndex === 'price') {
      newData[index]['membershipPrice'] = value;
    }
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

  const handleEntryDataSave = (da) => {
    let arr = da || dataSource;
    const datas = arr.map((item) => {
      const { attributes = [], ...rest } = item;
      const obj = topData?.[0];
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
              <InputNumber
                style={{ width: '100%' }}
                stringMode
                controls={false}
                precision={2}
                min={0}
                onChange={(value) => {
                  setBulk({ ...bulk, goodsCost: value });
                }}
                placeholder="成本价"
              />
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip trigger={['focus']} title="销售价" placement="topLeft">
              <InputNumber
                style={{ width: '100%' }}
                stringMode
                controls={false}
                precision={2}
                min={0}
                onChange={(value) => {
                  setBulk({ ...bulk, price: value, membershipPrice: value });
                }}
                placeholder="销售价"
              />
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip trigger={['focus']} title="参考价" placement="topLeft">
              <InputNumber
                style={{ width: '100%' }}
                stringMode
                controls={false}
                precision={2}
                min={0}
                onChange={(value) => {
                  setBulk({ ...bulk, referencePrice: value });
                }}
                placeholder="参考价"
              />
            </Tooltip>
          </Col>
          <Col span={4}>
            <Tooltip trigger={['focus']} title="销售库存" placement="topLeft">
              <InputNumber
                style={{ width: '100%' }}
                stringMode
                controls={false}
                precision={0}
                min={0}
                onChange={(value) => {
                  setBulk({ ...bulk, stock: value });
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
                let obj = {};
                Object.keys(bulk).forEach((item) => {
                  if (bulk?.[item]) {
                    obj[item] = bulk?.[item];
                  }
                });
                const newArry = dataSource.map((item) => ({ ...item, ...obj }));
                setDataSource(newArry);
                handleEntryDataSave(newArry);
                //
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
        rowKey="attrId"
        size="small"
        scroll={{ x: 990 }}
      />
      {/* <Row justify="end">
        {dataSource && dataSource.length > 0 && (
          <Col>
            <Button type="primary" onClick={handleEntryDataSave}>
              保存规格
            </Button>
          </Col>
        )}
      </Row> */}
    </Space>
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
