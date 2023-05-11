import { Divider } from 'antd';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '权益规则名称',
    dataIndex: 'platformName',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '权益规则详情',
    dataIndex: 'content',
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
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />

        <a type="link" size="small" onClick={() => handle('del', record)}>
          删除
        </a>
        {/* <Divider type="vertical" />
        <a type="link" size="small">
          复制
        </a> */}
      </div>
    ),
  },
];

export const schema = (queryData) => {
  return [
    {
      label: '权益规则名称',
      name: 'platformName',
      type: 'input',
      rules: [{ required: true }],
      initialValue: queryData?.platformName,
    },
    {
      label: '权益规则详情',
      name: 'content',
      type: 'TextArea',
      rules: [{ required: true }],
      initialValue: queryData?.content,
    },
  ];
};
