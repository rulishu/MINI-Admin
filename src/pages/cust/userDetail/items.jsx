import UserContent from '@/components/UserContent';
import { EditOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Fragment } from 'react';
import { agentLevelStatus, levelStatus } from './enum';

const { Text } = Typography;
export const basicItem = ({ handleEdit }) => [
  {
    title: '用户昵称',
    key: 'consumerName',
    editable: () => false,
    dataIndex: 'consumerName',
    ellipsis: true,
  },
  {
    title: '经销等级',
    key: 'level',
    editable: () => false,
    dataIndex: 'level',
    render: (_, record) => {
      return (
        <span style={{ width: 180, display: 'flex' }}>
          {record.level && (
            <Text ellipsis={{ tooltip: '奋斗者' }}>{levelStatus[Number(record.level)].text}</Text>
          )}
          <EditOutlined style={{ marginLeft: 8 }} onClick={() => handleEdit('sell')} />
        </span>
      );
    },
  },
  {
    title: '邀请人',
    key: 'userName',
    editable: () => false,
    dataIndex: 'userName',
    render: () => {
      return (
        <span style={{ width: 180, display: 'flex' }}>
          <Text ellipsis={{ tooltip: '李高峰' }}>李高峰</Text>
          <EditOutlined style={{ marginLeft: 8 }} onClick={() => handleEdit('user')} />
        </span>
      );
    },
  },
  {
    title: '归属代理',
    key: 'deliveryTime',
    editable: () => false,
    dataIndex: 'deliveryTime',
    ellipsis: true,
  },
  {
    title: '用户编号',
    key: 'consumerId',
    editable: () => false,
    dataIndex: 'consumerId',
    ellipsis: true,
  },
  {
    title: '代理等级',
    key: 'agentLevel',
    editable: () => true,
    dataIndex: 'agentLevel',
    valueEnum: agentLevelStatus,
  },
  {
    title: '邀请人编号',
    key: 'backgroundMessage2',
    editable: () => true,
    dataIndex: 'backgroundMessage2',
    ellipsis: true,
  },
  {
    title: '代理编号',
    key: 'backgroundMessage3',
    editable: () => true,
    dataIndex: 'backgroundMessage3',
    ellipsis: true,
  },
  {
    title: '用户手机',
    key: 'consumerPhone',
    editable: () => true,
    dataIndex: 'consumerPhone',
    ellipsis: true,
  },
  {
    title: '会员等级',
    key: 'backgroundMessage5',
    editable: () => true,
    dataIndex: 'backgroundMessage5',
    ellipsis: true,
  },
  {
    title: '注册时间',
    key: 'createTime',
    editable: () => true,
    dataIndex: 'createTime',
    ellipsis: true,
  },
  {
    title: '代理地盘',
    key: 'backgroundMessage7',
    editable: () => true,
    dataIndex: 'backgroundMessage7',
    ellipsis: true,
  },
];

export const columns = [
  {
    title: '用户编号',
    dataIndex: 'id',
    width: 120,
  },
  {
    title: '用户信息',
    dataIndex: 'details',
    width: 200,
    render: (text, record) => {
      return (
        <UserContent
          width={180}
          headUrl={record.headUrl}
          name={record.consumerName || 'Miracle-'}
          phone={record.mobile || '17857001531'}
        />
      );
    },
  },
  {
    title: '角色信息',
    dataIndex: 'id2',
    width: 200,
    render: () => {
      return (
        <Fragment>
          <div>经销等级：奋斗者</div>
          <div>代理等级：--</div>
          <div>会员信息：--</div>
        </Fragment>
      );
    },
  },
  {
    title: '邀请人',
    dataIndex: 'inviter',
    width: 200,
    render: (text, record) => {
      return (
        <UserContent
          width={180}
          headUrl={record.headUrl}
          name={record.consumerName || '昵称'}
          phone={record.mobile || '17766666666'}
        />
      );
    },
  },
  {
    title: '邀请层级',
    dataIndex: 'level',
    width: 120,
    render: () => '1级',
  },
  {
    title: '注册时间',
    dataIndex: 'level1',
    width: 150,
    render: () => '2020/05/20   17:32:40',
  },
  {
    title: '累积营业额',
    dataIndex: 'level2',
    width: 150,
    render: () => '￥999.90',
  },
  {
    title: '上月营业额',
    dataIndex: 'level3',
    width: 150,
    render: () => '￥999.90',
  },
  {
    title: '本月营业额',
    dataIndex: 'level4',
    width: 150,
    render: () => '￥999.90',
  },
  {
    title: '本月个人消费',
    dataIndex: 'level5',
    width: 150,
    render: () => '￥999.90',
  },
];
