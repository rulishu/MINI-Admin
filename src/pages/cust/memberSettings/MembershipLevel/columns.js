import { Divider } from 'antd';

export const columns = (handle) => [
  {
    title: '等级',
    dataIndex: 'createBy',
    hideInSearch: true,
    align: 'center',
    width: 30,
  },
  {
    title: '称谓',
    dataIndex: 'type',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '背景',
    dataIndex: 'bj',
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
    dataIndex: 'createTime',
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
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handle('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handle('del', record)}>
          删除
        </a>
      </div>
    ),
  },
];

export const schema = ({ queryData }) => {
  return {
    type: 'object',
    displayType: 'row',
    column: 2,
    properties: {
      type: {
        title: '称谓',
        type: 'string',
        widget: 'input',
        placeholder: '请输入称谓',
        required: true,
        defaultValue: queryData.type,
      },
      content: {
        title: '等级权重',
        type: 'string',
        widget: 'select',
        placeholder: '请输入等级权重',
        required: true,
        defaultValue: queryData.content,
        props: {
          options: [
            { label: '1', value: 'a' },
            { label: '2', value: 'b' },
            { label: '3', value: 'c' },
            { label: '4', value: 'd' },
            { label: '5', value: 'e' },
            { label: '6', value: 'f' },
          ],
        },
      },
      input1: {
        title: '等级外观',
        type: 'string',
        widget: 'input',
        placeholder: '请输入等级外观',
        required: true,
        defaultValue: queryData.input1,
      },
      input2: {
        title: '等级描述',
        type: 'string',
        widget: 'input',
        placeholder: '请输入等级外观',
        required: true,
        defaultValue: queryData.input2,
      },
      input3: {
        title: '升级条件',
        type: 'string',
        widget: 'input',
        placeholder: '请输入升级条件',
        required: true,
        defaultValue: queryData.input3,
      },
      input4: {
        title: '权益设置',
        type: 'string',
        widget: 'input',
        placeholder: '请输入权益设置',
        defaultValue: queryData.input4,
      },
      input5: {
        title: '升级权益',
        type: 'string',
        widget: 'input',
        placeholder: '请输入升级权益',
        defaultValue: queryData.input5,
      },
      input6: {
        title: '会员有效期',
        type: 'string',
        widget: 'input',
        placeholder: '请输入会员有效期:',
        defaultValue: queryData.input6,
      },
    },
  };
};
