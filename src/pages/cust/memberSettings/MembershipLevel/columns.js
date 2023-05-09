import { Button, Popconfirm, Space } from 'antd';

export const columns = (onEdit) => [
  {
    title: '等级',
    dataIndex: 'level',
    hideInTable: true,
    width: 30,
  },
  {
    title: '称谓',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '背景',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '升级条件',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '拥有权益',
    dataIndex: 'num',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '有效期',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '创建期',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 80,
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
