import { Button, Space } from 'antd';

export const columns = [
  {
    title: '商品名称',
    dataIndex: 'level',
    width: 30,
  },
  {
    title: '销售价(元/件)',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '成本价(元/件)',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '库存(件)',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },

  {
    title: '销量(件)',
    dataIndex: 'num',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,

    width: 30,
  },
  {
    title: '排序',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '商品分组',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '销量商',
    dataIndex: 'num',
    align: 'center',
    ellipsis: true,
    width: 30,
    hideInTable: true,
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <Space size="middle">
          <Button type="link">编辑</Button>
          <Button type="link">查看</Button>
          <Button type="link">复制</Button>
        </Space>
      </div>
    ),
  },
];
