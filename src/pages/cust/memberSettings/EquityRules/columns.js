import { Divider, Popconfirm } from 'antd';

export const columns = (onEdit) => [
  {
    title: '权益规则名称',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '权益规则详情',
    dataIndex: 'number',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 100,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small" onClick={() => onEdit()}>
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="权益规则删除"
          description="删除后无法恢复规则，确认要删除该权益规则吗"
          okText="确定"
          cancelText="取消"
        >
          <a type="link" size="small">
            删除
          </a>
        </Popconfirm>
        <Divider type="vertical" />
        <a type="link" size="small">
          复制
        </a>
      </div>
    ),
  },
];

export const columnsFn = [
  {
    title: '商品图片',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '商品ID',
    dataIndex: 'num',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '商品价格(元)',
    dataIndex: 'number',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
];
