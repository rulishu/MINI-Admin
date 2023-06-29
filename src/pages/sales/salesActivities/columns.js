import { Divider, Typography } from 'antd';
import { statusEnum, typeEnum } from './enum';

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
    render: (_, record) => (
      <>
        <div style={{ width: '100%' }}>{record?.name}</div>
        <div style={{ color: '#ccc', width: '100%' }}>ID：{record?.id}</div>
      </>
    ),
  },
  {
    title: '优惠内容',
    dataIndex: 'type',
    width: 120,
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <Typography.Text style={{ width: 110 }}>
          {record?.type === 2 && `满${record?.minimumConsumption}减${record?.price}`}
          {record?.type === 3 && `满${record?.minimumConsumption}打${record?.price}折`}
        </Typography.Text>
        <Typography.Text style={{ color: '#ccc', width: 110 }}>
          {typeEnum?.[record?.availableProductTypes]?.text}
        </Typography.Text>
      </div>
    ),
  },
  {
    title: '领取/发放',
    dataIndex: 'count',
    width: 150,
    hideInSearch: true,
    render: (_, record) => `${record?.useCount}/${record?.count}`,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    valueEnum: statusEnum,
  },
  {
    title: '使用数量',
    dataIndex: 'useCount',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '使用率',
    dataIndex: '333333333',
    width: 120,
    hideInSearch: true,
    render: () => '77.5%',
  },
  {
    title: '领取/使用时间',
    dataIndex: 'time',
    width: 250,
    hideInSearch: true,
    render: (_, record) => (
      <>
        <div>
          领{record?.collectBeginDate}-{record?.collectEndDate}
        </div>
        <div>
          用{record?.useBeginDate}-{record?.useEndTime}
        </div>
      </>
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
