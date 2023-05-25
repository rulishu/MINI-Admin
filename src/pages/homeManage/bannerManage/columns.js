import { Divider, Image } from 'antd';
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
    title: '图片',
    dataIndex: 'path',
    width: 90,
    align: 'left',
    hideInSearch: true,
    render: (_, record) => <Image width={80} height={80} src={record?.path} />,
  },
  {
    title: '排序',
    width: 90,
    dataIndex: 'sort',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    width: 120,
    dataIndex: 'createTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '更新时间',
    width: 120,
    dataIndex: 'updateTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.updateTime && moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
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
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
