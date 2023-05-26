import UserContent from '@/components/UserContent';
import { Divider } from 'antd';
import moment from 'moment';
import { levelEnum } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'left',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '代理名称',
    dataIndex: 'companyName',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '代理地盘',
    dataIndex: 'areaName',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '代理等级',
    dataIndex: 'level',
    align: 'left',
    valueType: 'select',
    valueEnum: levelEnum,
  },
  {
    title: '代理商',
    dataIndex: 'companyName',
    align: 'left',
    hideInSearch: true,
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
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'left',
    hideInSearch: true,
    render: (_, record) =>
      (record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')) || '-',
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
