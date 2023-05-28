import { Divider } from 'antd';
import moment from 'moment';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 40,
    align: 'left',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '活动名称',
    dataIndex: 'title',
    width: 90,
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '图片',
    dataIndex: 'image',
    width: 120,
    align: 'left',
    hideInSearch: true,
  },
  {
    title: 'Tag/url',
    dataIndex: 'jumpPath',
    width: 120,
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'status',
    ellipsis: true,
    width: 90,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '已上架',
        status: 'Success',
      },
      0: {
        text: '已下架',
        status: 'Error',
      },
    },
  },
  {
    title: '活动时间',
    width: 120,
    dataIndex: 'createTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '操作',
    width: 90,
    align: 'left',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>下架</a>
      </div>
    ),
  },
];
