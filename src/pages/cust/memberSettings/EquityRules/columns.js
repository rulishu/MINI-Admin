import { Button, Popconfirm, Space } from 'antd';

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
        <Space size="middle">
          <Button type="link" onClick={() => onEdit()}>
            编辑
          </Button>
          <Popconfirm
            title="权益规则删除"
            description="删除后无法恢复规则，确认要删除该权益规则吗"
            okText="确定"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
          <Button type="link">复制</Button>
        </Space>
      </div>
    ),
  },
];
