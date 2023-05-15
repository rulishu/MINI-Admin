import { Divider } from 'antd';

export const columns = (handle) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
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

export const schema = ({ queryData }) => {
  return {
    type: 'object',
    displayType: 'row',
    labelWidth: '100%',
    properties: {
      platformName: {
        title: '权益规则名称',
        type: 'string',
        widget: 'input',
        placeholder: '请输入权益规则名称',
        required: true,
        defaultValue: queryData.platformName,
      },
      content: {
        title: '权益规则详情',
        type: 'string',
        widget: 'textArea',
        placeholder: '请输入权益规则详情',
        required: true,
        defaultValue: queryData.content,
      },
    },
  };
};
