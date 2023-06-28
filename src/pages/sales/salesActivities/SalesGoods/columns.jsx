import AImage from '@/components/AImage';
import PriceRange from '@/components/PriceRange';
import moment from 'moment';

export const columns = ({ handleEdit }) => [
  {
    title: '商品信息',
    dataIndex: 'item',
    width: 450,
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
    title: '操作',
    width: 150,
    align: 'left',
    render: (record) => <a onClick={() => handleEdit('delete', record)}>删除</a>,
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
