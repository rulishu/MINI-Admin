import AImage from '@/components/AImage';
import PriceRange from '@/components/PriceRange';
import { Divider } from 'antd';
import moment from 'moment';

export const columns = ({ handleEdit }) => [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 250,
    render: (_, record) => {
      return (
        <div style={{ height: 88, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <AImage width={80} height={84} src={record?.mainGraph} />
          {/* <Avatar shape="square" size="large" src={record?.mainGraph} /> */}
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left', height: 88 }}>
            <p
              style={{
                padding: 0,
                margin: 0,
                height: 66,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record?.itemName} {record?.model} {record?.specifications}
            </p>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: '售价',
    width: 150,
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣范围',
    dataIndex: 'sale',
    width: 150,
    key: 'sale',
    render: () => '0.1-10 折',
  },
  {
    title: '活动总库存',
    width: 150,
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: '操作',
    width: 200,
    align: 'left',
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('set', record)}> 设置规格优惠</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];

export const searchColumns = () => [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 250,
    render: (_, record) => {
      return (
        <div style={{ height: 88, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <AImage width={80} height={84} src={record?.mainGraph} />
          {/* <Avatar shape="square" size="large" src={record?.mainGraph} /> */}
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left', height: 88 }}>
            <p
              style={{
                padding: 0,
                margin: 0,
                height: 66,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record?.itemName} {record?.model} {record?.specifications}
            </p>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: '商品状态',
    dataIndex: 'onShelf',
    width: 80,
    render: (_, record) => {
      if (record?.groupType === 3) {
        return <span>仓库中</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 1) {
        return <span>待开售</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 2) {
        return <span>出售中</span>;
      }
    },
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
    valueType: 'digit',
    renderFormItem: () => <PriceRange />,
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeRange',
    hideInTable: true,
    width: 100,
    render: (_, record) =>
      (record.createTimeRange && moment(record.createTimeRange).format('YYYY-MM-DD HH:mm:ss')) ||
      '-',
  },
];
