import UserContent from '@/components/UserContent';
import { Divider } from 'antd';
import moment from 'moment';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'left',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '经销商名称',
    dataIndex: 'companyName',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '经销商',
    dataIndex: 'companyDetails',
    align: 'left',
    hideInSearch: true,
    render: (_, record) => {
      return (
        <div>
          <div>{record.companyName}</div>
          <div>{record.shopName}</div>
        </div>
      );
    },
  },
  {
    title: '代理账号',
    dataIndex: 'consumerName',
    align: 'left',
    hideInSearch: true,
    render: (_, record) => (
      <UserContent
        headUrl={record.headUrl}
        name={record.consumerName}
        phone={record.consumerPhone}
      />
    ),
  },
  {
    title: '备注',
    dataIndex: 'desc',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.updateTime && moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
  },
  {
    title: '操作',
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
