import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
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
    title: '代理商名称',
    dataIndex: 'companyName',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '代理商',
    dataIndex: 'companyName1',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '代理账号',
    dataIndex: 'consumerName',
    align: 'left',
    hideInSearch: true,
    render: (_, record) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {record?.headUrl ? (
          <Avatar src={record?.headUrl} size="small" />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
        )}
        <div style={{ textAlign: 'left', marginLeft: 8 }}>
          <div>{record?.consumerName}</div>
          <div>{record?.consumerPhone}</div>
        </div>
      </div>
    ),
  },
  {
    title: '备注',
    dataIndex: 'remark',
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
