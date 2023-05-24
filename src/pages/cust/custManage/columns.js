import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import moment from 'moment';
import { agentStatus, status, vipStatus } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: '用户昵称',
    dataIndex: 'consumerName',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '用户手机号',
    dataIndex: 'mobile',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 80,
    align: 'left',
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '用户信息',
    dataIndex: 'details',
    align: 'left',
    render: (text, record) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar size="small" src={record?.headUrl} icon={<UserOutlined />} />
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left' }}>
            <p style={{ padding: 0, margin: 0 }}>{record?.consumerName}</p>
            <p style={{ padding: 0, margin: 0 }}>{record?.mobile}</p>
          </div>
        </div>
      );
    },
    hideInSearch: true,
  },
  {
    title: '邀请人昵称',
    dataIndex: 'details3',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '邀请人手机号',
    dataIndex: 'details4',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    align: 'left',
    valueType: 'date',
    hideInTable: true,
  },
  {
    title: '经销等级',
    dataIndex: 'openTime2',
    align: 'left',
    valueType: 'select',
    valueEnum: status,
  },
  {
    title: '代理等级',
    dataIndex: 'openTime3',
    align: 'left',
    valueType: 'select',
    valueEnum: agentStatus,
  },
  {
    title: '会员等级',
    dataIndex: 'openTime4',
    align: 'left',
    valueType: 'select',
    valueEnum: vipStatus,
  },
  {
    title: '邀请人',
    dataIndex: 'details5',
    align: 'left',
    hideInSearch: true,
    render: () => {},
  },
  {
    title: '注册时间',
    dataIndex: 'createTimeDetails',
    align: 'left',
    valueType: 'date',
    hideInSearch: true,
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'left',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('view', record)}>详情</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];

export const basicItem = [
  {
    title: '会员名称',
    key: 'userName',
    dataIndex: 'userName',
    ellipsis: true,
  },
  {
    title: '手机号',
    key: 'phone',
    dataIndex: 'phone',
    ellipsis: true,
  },
  {
    title: '会员类型',
    key: 'memberType',
    dataIndex: 'memberType',
    ellipsis: true,
  },
  {
    title: '到期时间',
    key: 'expirationTime',
    dataIndex: 'expirationTime',
    ellipsis: true,
  },
  {
    title: '开通时间',
    key: 'openTime',
    dataIndex: 'openTime',
    ellipsis: true,
  },
];
