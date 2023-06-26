import AModal from '@/components/AModal';
import { selectSKU } from '@/service/goods/productManage';
import { ProCard } from '@ant-design/pro-components';
import { useRequest, useSetState } from 'ahooks';
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
    batchValue: null,
    batchStock: null,
  });

  const { run, loading } = useRequest(selectSKU, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        const { list = [] } = setRecord;
        setState({
          dataSource: (result || []).map((item) => {
            const matchedItem = list.find((listItem) => listItem.skuId === item.skuId);
            return {
              ...item,
              activityPrice: matchedItem?.activityPrice || 0,
              flashStock: matchedItem?.flashStock || 0,
              attributeName: (item.attributes || []).map(
                (attr) => attr.value + '' + attr.attributeName,
              ),
            };
          }),
        });
      }
    },
  });

  useEffect(() => {
    if (setVisible) {
      run({ id: setRecord.id });
    }
  }, [setVisible]);

  const { dataSource, batchValue, batchStock } = state;

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
      message.warning(
        `${(maxStock.attributeName || []).join(';')}规格库存数量为${maxStock.stock}，请重新设置`,
      );
      return;
    }
    const newData = dataSource.map((item) => {
      return {
        ...item,
        activityPrice: getActivityPrice(item.price),
        flashStock: batchStock,
      };
    });
    setState({ dataSource: newData });
  };

  const close = () => {
    setState({
      batchValue: null,
      batchStock: null,
      dataSource: [],
    });
    dispatch({ setVisible: false, setRecord: {} });
  };

  const save = () => {
    const row = data.find((rows) => rows.id === setRecord.id);
    row.list = [...dataSource];
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
        dataIndex: 'attributeName',
        width: 200,
        render: (_, record) => {
          return <div style={{ width: 200 }}>{(record.attributeName || []).join('*')}</div>;
        },
      },
      {
        title: '售价',
        dataIndex: 'price',
        width: 120,
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
        dataIndex: 'flashStock',
        width: 120,
        render: (_, record) => {
          return (
            <InputNumber
              value={record.flashStock}
              defaultValue={record.flashStock}
              step={1}
              min={0}
              max={record.stock}
              onChange={(value) => handleNumberChange(record.skuId, 'flashStock', value)}
            />
          );
        },
      },
    ],
    rowKey: 'skuId',
    loading: loading,
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
              max={10}
              onChange={(value) => setState({ batchValue: value })}
            />
            <InputNumber
              placeholder="秒杀库存"
              value={batchStock}
              step={1}
              min={0}
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
