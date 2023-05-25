import UserContent from '@/components/UserContent';
import { Divider } from 'antd';
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
    width: 180,
    align: 'left',
    render: (text, record) => {
      return (
        <UserContent headUrl={record.headUrl} name={record.consumerName} phone={record.mobile} />
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
    width: 180,
    align: 'left',
    hideInSearch: true,
    render: () => {},
  },
  {
    title: '注册时间',
    dataIndex: 'createTimeDetails',
    align: 'left',
    width: 180,
    valueType: 'date',
    hideInSearch: true,
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    align: 'left',
    width: 90,
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
