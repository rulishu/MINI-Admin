import UserContent from '@/components/UserContent';
import { Divider } from 'antd';
import moment from 'moment';
import { agentLevelStatus, levelStatus, vipStatus } from './enum';

export const columns = ({ handleEdit }) => [
  {
    title: '用户昵称',
    dataIndex: 'consumerName',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '用户手机号',
    dataIndex: 'consumerPhone',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 80,
    align: 'left',
  },
  {
    title: '用户信息',
    dataIndex: 'details',
    align: 'left',
    width: 250,
    render: (text, record) => {
      return (
        <UserContent
          width={220}
          headUrl={record.headUrl}
          name={record.consumerName}
          phone={record.mobile}
        />
      );
    },
    hideInSearch: true,
  },
  // {
  //   title: '邀请人昵称',
  //   dataIndex: 'details3',
  //   align: 'left',
  //   hideInTable: true,
  // },
  // {
  //   title: '邀请人手机号',
  //   dataIndex: 'details4',
  //   align: 'left',
  //   hideInTable: true,
  // },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    valueType: 'dateRange',
    fieldProps: {
      showTime: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
    hideInTable: true,
  },
  {
    title: '经销等级',
    dataIndex: 'level',
    align: 'left',
    valueType: 'select',
    valueEnum: levelStatus,
    render: (_, record) => (record.level && levelStatus[record.level].text) || '无',
  },
  {
    title: '代理等级',
    dataIndex: 'agentLevel',
    align: 'agentLevel',
    valueType: 'select',
    valueEnum: agentLevelStatus,
    render: (_, record) => (record.agentLevel && agentLevelStatus[record.agentLevel].text) || '无',
  },
  {
    title: '会员等级',
    dataIndex: 'levelStatus',
    align: 'levelStatus',
    valueType: 'select',
    valueEnum: vipStatus,
    render: (_, record) => (record.levelStatus && levelStatus[record.levelStatus].text) || '无',
  },
  {
    title: '邀请人',
    dataIndex: 'inviter',
    width: 180,
    align: 'left',
    hideInSearch: true,
    render: (text, record) => {
      return (
        (record.inviter && (
          <UserContent headUrl={record.headUrl} name={record.consumerName} phone={record.mobile} />
        )) ||
        '无'
      );
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
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
