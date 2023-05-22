import { Divider } from 'antd';

export const columns = [
  {
    title: '分组',
    dataIndex: 'num',

    ellipsis: true,
    width: 30,
    hideInTable: true,
    valueType: 'select',
    valueEnum: {
      0: { text: '全部分组' },
      1: { text: '酱香白酒' },
      2: { text: '粮油调味' },
      3: { text: '茶叶饮品' },
      4: { text: '南北干货' },
      5: { text: '严选好物' },
      6: { text: '精品定制' },
      7: { text: '云封坛系列' },
      8: { text: '经典系列' },
      9: { text: '精品系列' },
      10: { text: '爆品系列' },
      11: { text: '私藏系列' },
    },
  },
  {
    title: '图片',
    dataIndex: 'id',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '商品名称',
    dataIndex: 'level',

    ellipsis: true,
    width: 30,
  },
  {
    title: '价格',
    dataIndex: 'type',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '创建时间',
    dataIndex: 'time',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 50,
    fixed: 'right',

    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          删除
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          修改
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          推广
        </a>
      </div>
    ),
  },
];
