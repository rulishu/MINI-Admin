import { Divider } from 'antd';
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
      <>
        <div>
          {record?.type === 2 && `满${record?.minimumConsumption}减${record?.price}`}
          {record?.type === 3 && `满${record?.minimumConsumption}打${record?.price}折`}
        </div>
        <div style={{ color: '#ccc', width: 110 }}>
          {typeEnum?.[record?.availableProductTypes]?.text}
        </div>
      </>
    ),
  },
  {
    title: '领取/发放',
    dataIndex: 'count',
    width: 150,
    hideInSearch: true,
    render: (_, record) => `${record?.receiveCount || 0}/${record?.count || 0}`,
  },
  {
    title: '状态',
    dataIndex: 'couponStatus',
    width: 90,
    valueEnum: statusEnum,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
    hideInTable: true,
    valueType: 'dateRange',
  },
  {
    title: '使用数量',
    dataIndex: 'useCount',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '使用率',
    dataIndex: 'receiveCount',
    width: 120,
    hideInSearch: true,
    render: (_, record) =>
      record?.count && `${((record?.receiveCount || 0) / record?.count).toFixed(1)}%`,
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
    render: (_, record) => (
      <div>
        {record?.couponStatus === '0' && (
          <>
            <a onClick={() => handleEdit('edit', record)}>编辑</a>
            <Divider type="vertical" />
          </>
        )}
        {(record?.couponStatus === '0' || record?.couponStatus === '1') && (
          <a onClick={() => handleEdit('lose', record)}>失效</a>
        )}
        {(record?.couponStatus === '2' || record?.couponStatus === '3') && (
          <a onClick={() => handleEdit('delete', record)}>删除</a>
        )}
        {/* <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <a onClick={() => handleEdit('lose', record)}>失效</a>
        <a onClick={() => handleEdit('delete', record)}>删除</a> */}
      </div>
    ),
  },
];
