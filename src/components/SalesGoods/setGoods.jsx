import AModal from '@/components/AModal';
import { ProCard } from '@ant-design/pro-components';
import { useSetState } from 'ahooks';
import { App, Button, InputNumber, Space, Table } from 'antd';
import { useContext, useEffect } from 'react';
import { Context } from './hooks/context';

export default () => {
  const {
    state: { dataSource: data, setVisible, setRecord = {} },
    dispatch,
    onChange,
  } = useContext(Context);

  const { message } = App.useApp();

  const [state, setState] = useSetState({
    dataSource: [],
    batchValue: null, // 批量设置活动价格
    batchStock: null, // 批量设置库存
  });

  useEffect(() => {
    if (setVisible) {
      const { sku = [] } = setRecord;
      const datas = sku.map((item) => {
        return {
          ...item,
          activityPrice: item?.activityPrice || 0,
          activityStock: item?.activityStock || 0,
        };
      });
      setState({ dataSource: datas });
      // run({ id: setRecord.id });
    }
  }, [setVisible]);

  const { dataSource, batchValue, batchStock } = state;

  const setMaxStock = dataSource.reduce((acc, curr) => {
    if (curr.stock > acc) {
      return curr.stock;
    }
    return acc;
  }, -Infinity);

  const handleNumberChange = (id, code, value) => {
    const newDefaultValue = dataSource.map((item) => {
      if (item.skuId === id) {
        return { ...item, [code]: value };
      } else {
        return item;
      }
    });
    setState({ dataSource: newDefaultValue });
  };

  const getActivityPrice = (price) => {
    if (batchValue === 0) {
      return price;
    }
    if (batchValue) {
      return Number((price * batchValue * 0.1).toFixed(2));
    }
    return null;
  };

  const handleSet = () => {
    const maxStock = dataSource.find((item) => item.stock < batchStock);
    if (maxStock) {
      message.warning(`${maxStock.attributes}规格库存数量为${maxStock.stock}，请重新设置`);
      return;
    }
    const newData = dataSource.map((item) => {
      return {
        ...item,
        activityPrice: getActivityPrice(item.price),
        activityStock: batchStock,
      };
    });
    setState({ dataSource: newData });
  };

  const close = () => {
    setState({
      batchValue: null,
      batchStock: null,
      dataSource: [],
      setMaxStock: 0,
    });
    dispatch({ setVisible: false, setRecord: {} });
  };

  const save = () => {
    // 获取折扣范围最小值
    const min = dataSource.reduce((acc, curr) => {
      if (curr.activityPrice < acc) {
        return curr.activityPrice / curr.price;
      }
      return acc;
    }, Infinity);

    // 获取折扣范围最大值
    const max = dataSource.reduce((acc, curr) => {
      if (curr.activityPrice > acc) {
        return curr.activityPrice / curr.price;
      }
      return acc;
    }, -Infinity);
    // 计算总库存
    let stockTotal = 0;
    dataSource.forEach((item) => {
      if (item.activityStock || item.activityStock === 0) {
        stockTotal += item.activityStock;
      }
    });
    const row = data.find((rows) => rows.id === setRecord.id);
    row.sku = [...dataSource];
    row.stockTotal = stockTotal;
    row.discountRange = (min * 10).toFixed(1) + '-' + (max * 10).toFixed(1);
    onChange?.(data);
    dispatch({ dataSource: data });
    close();
  };

  const orderTableProps = {
    bordered: true,
    dataSource: dataSource,
    columns: [
      {
        title: '规格信息',
        dataIndex: 'attributes',
        width: 200,
      },
      {
        title: '售价',
        dataIndex: 'price',
        width: 120,
        render: (_, record) => <div>￥{record.price}</div>,
      },
      {
        title: '活动价',
        dataIndex: 'activityPrice',
        width: 120,
        render: (_, record) => {
          return (
            <InputNumber
              value={record.activityPrice}
              defaultValue={record.activityPrice}
              step={0.01}
              min={0}
              max={record.price}
              onChange={(value) => handleNumberChange(record.skuId, 'activityPrice', value)}
            />
          );
        },
      },
      {
        title: '商品库存',
        dataIndex: 'stock',
        width: 120,
      },
      {
        title: '秒杀库存',
        dataIndex: 'activityStock',
        width: 120,
        render: (_, record) => {
          return (
            <InputNumber
              value={record.activityStock}
              defaultValue={record.activityStock}
              step={1}
              min={0}
              max={record.stock}
              onChange={(value) => handleNumberChange(record.skuId, 'activityStock', value)}
            />
          );
        },
      },
    ],
    rowKey: 'skuId',
  };

  return (
    <AModal
      open={setVisible}
      width={1000}
      onCancel={close}
      footer={
        <div
          style={{
            paddingBottom: 24,
            paddingRight: 24,
          }}
        >
          <Button key="save" type="primary" onClick={save}>
            保存
          </Button>
          <Button key="cancel" onClick={close}>
            取消
          </Button>
        </div>
      }
    >
      <ProCard title="设置规格优惠" headerBordered bodyStyle={{ paddingBottom: 0 }}>
        <div style={{ marginBottom: 16, padding: 16, background: '#f5f5f5' }}>
          <Space>
            <b>批量设置</b>
            <InputNumber
              placeholder="折扣"
              value={batchValue}
              step={0.1}
              min={0}
              max={10.0}
              onChange={(value) => setState({ batchValue: value })}
            />
            <InputNumber
              placeholder="秒杀库存"
              value={batchStock}
              step={1}
              min={0}
              max={setMaxStock}
              onChange={(value) => setState({ batchStock: value })}
            />
            <Button type="primary" onClick={handleSet}>
              设置
            </Button>
          </Space>
        </div>
        <Table {...orderTableProps} />
      </ProCard>
    </AModal>
  );
};
