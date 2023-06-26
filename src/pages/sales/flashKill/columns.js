import { Divider, Switch, Typography } from 'antd';
import { hideEnum, statusEnum } from './enum';

// eslint-disable-next-line no-unused-vars
export const columns = ({ handleEdit }) => [
  {
    title: '活动名称',
    dataIndex: 'name',
    hideInTable: true,
  },
  {
    title: '活动信息',
    dataIndex: 'id',
    width: 120,
    hideInSearch: true,
    render: () => (
      <div>
        <Typography.Text ellipsis={{ tooltip: '限时秒杀' }} style={{ width: 110 }}>
          限时秒杀
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
    title: '活动状态',
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
    title: '显示状态',
    dataIndex: 'hiedeStatus',
    width: 90,
    valueEnum: hideEnum,
    hideInTable: true,
  },
  {
    title: '订单数量/金额',
    dataIndex: 'phone',
    width: 150,
    hideInSearch: true,
    render: () => '100 / 1000',
  },
  {
    title: '下单人数',
    dataIndex: 'memberType',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '活动时间',
    dataIndex: 'expirationTime',
    width: 200,
    hideInSearch: true,
    render: () => '2023.6.4 18:00:00  -  2023.6.6 00:00:00',
  },
  {
    title: '显示状态',
    dataIndex: 'openTime',
    width: 120,
    hideInSearch: true,
    render: () => <Switch defaultChecked />,
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
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
