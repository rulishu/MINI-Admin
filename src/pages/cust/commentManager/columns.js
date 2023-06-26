import AImage from '@/components/AImage';
import { Switch, Typography } from 'antd';
import moment from 'moment';
import { levelEnum } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    fieldProps: {
      placeholder: '请输入商品名称',
    },
    hideInTable: true,
  },
  {
    title: '商品ID',
    dataIndex: 'productId',
    fieldProps: {
      placeholder: '请输入商品ID',
    },
    hideInTable: true,
  },
  {
    title: '订单编号',
    dataIndex: 'orderId',
    fieldProps: {
      placeholder: '请输入订单编号',
    },
    hideInTable: true,
  },
  {
    title: '评价内容',
    dataIndex: 'comment',
    align: 'left',
    width: 200,
    hideInSearch: true,
  },
  {
    title: '评价等级',
    dataIndex: 'rating',
    align: 'left',
    width: 90,
    valueEnum: levelEnum,
  },
  {
    title: '订单编号',
    dataIndex: 'orderId',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '商品信息',
    dataIndex: 'item',
    align: 'left',
    width: 250,
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {' '}
            <AImage height={80} width={80} src={record.mainImage} />
          </div>
          <div style={{ marginLeft: 12, width: 250 }}>
            <Typography.Text
              ellipsis={{ tooltip: `${record.itemName || ''} ${record.sku || ''}` }}
              style={{ fontSize: '14px' }}
            >
              {record.itemName} {record.sku}
            </Typography.Text>
            <div style={{ fontSize: '14px', color: '#1677ff' }}>ID:{record.productId}</div>
          </div>
        </div>
      );
    },
  },
  {
    title: '用户信息',
    dataIndex: 'details',
    align: 'left',
    width: 250,
    render: (_, record) => {
      return (
        <div style={{ textAlign: 'left', marginLeft: 8, width: 220 }}>
          <div>
            <Typography.Text
              ellipsis={{ tooltip: record.userName }}
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              {record.consumerName}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text
              ellipsis={{ tooltip: `ID:${record.userId}` }}
              style={{ fontSize: '14px' }}
            >
              ID:{record.userId}
            </Typography.Text>
          </div>
        </div>
      );
    },
    hideInSearch: true,
  },
  {
    title: '评价时间',
    width: 180,
    dataIndex: 'createTime',
    valueType: 'dateRange',
    fieldProps: {},
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '显示状态',
    dataIndex: 'isShow',
    width: 120,
    hideInSearch: true,
    render: (_, record) => (
      <Switch onChange={() => handleEdit('editIsShow', record)} checked={record.isShow === 1} />
    ),
  },
];
