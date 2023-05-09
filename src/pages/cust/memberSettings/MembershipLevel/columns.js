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
    width: 30,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small" onClick={() => onEdit()}>
          编辑
        </a>
      </div>
    ),
  },
];
