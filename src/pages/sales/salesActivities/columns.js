import { Divider, Typography } from 'antd';
import { statusEnum } from './enum';

// eslint-disable-next-line no-unused-vars
export const columns = ({ handleEdit }) => [
  {
    title: '优惠券名称',
    dataIndex: 'name',
    hideInTable: true,
  },
  {
    title: '优惠券信息',
    dataIndex: 'id',
    width: 120,
    hideInSearch: true,
    render: () => (
      <div>
        <Typography.Text ellipsis={{ tooltip: '限时秒杀' }} style={{ width: 110 }}>
          618活动券
        </Typography.Text>
        <Typography.Text
          ellipsis={{ tooltip: 'ID：897987876' }}
          style={{ color: '#ccc', width: 110 }}
        >
          ID：897987876
        </Typography.Text>
      </div>
    ),
  },
  {
    title: '优惠内容',
    dataIndex: 'id',
    width: 120,
    hideInSearch: true,
    render: () => (
      <div>
        <Typography.Text ellipsis={{ tooltip: '限时秒杀' }} style={{ width: 110 }}>
          满500减20
        </Typography.Text>
        <Typography.Text
          ellipsis={{ tooltip: 'ID：897987876' }}
          style={{ color: '#ccc', width: 110 }}
        >
          全场商品可用
        </Typography.Text>
      </div>
    ),
  },
  {
    title: '订单数量/金额',
    dataIndex: 'phone',
    width: 150,
    hideInSearch: true,
    render: () => '129/100000',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    valueEnum: statusEnum,
  },
  {
    title: '创建时间',
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
    hideInTable: true,
  },
  {
    title: '订单数量/金额',
    dataIndex: 'phone2',
    width: 150,
    hideInSearch: true,
    render: () => '100',
  },
  {
    title: '使用率',
    dataIndex: 'phone3',
    width: 120,
    hideInSearch: true,
    render: () => '77.5%',
  },
  {
    title: '领取/使用时间',
    dataIndex: 'expirationTime',
    width: 250,
    hideInSearch: true,
    render: () => (
      <div>
        <div>领 2023.6.4 18:00:00 - 2023.6.6 00:00:00</div>
        <div>用 2023.6.4 18:00:00 - 2023.6.6 00:00:00</div>
      </div>
    ),
  },
  {
    title: '操作',
    width: 140,
    fixed: 'right',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('lose', record)}>失效</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
