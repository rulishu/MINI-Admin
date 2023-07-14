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
          {record.level && <Text>{levelStatus[Number(record.level)].text}</Text>}
          <EditOutlined style={{ marginLeft: 8 }} onClick={() => handleEdit('level', record)} />
        </span>
      );
    },
  },
  {
    title: '邀请人',
    key: 'invitationName',
    editable: () => false,
    dataIndex: 'invitationName',
  },
  {
    title: '归属代理',
    key: 'shopName',
    editable: () => false,
    dataIndex: 'shopName',
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
    key: 'invitationConsumerId',
    editable: () => true,
    dataIndex: 'invitationConsumerId',
    ellipsis: true,
  },
  {
    title: '代理编号',
    key: 'agentNumber',
    editable: () => true,
    dataIndex: 'agentNumber',
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
    key: '无',
    editable: () => true,
    dataIndex: '无',
    ellipsis: true,
    render: () => '无',
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
    key: 'areaName',
    editable: () => true,
    dataIndex: 'areaName',
    ellipsis: true,
  },
];

export const columns = [
  {
    title: '用户编号',
    dataIndex: 'userId',
    width: 120,
  },
  {
    title: '用户信息',
    dataIndex: 'consumerName',
    width: 200,
    render: (text, record) => {
      return (
        <UserContent
          width={180}
          headUrl={record?.headUrl}
          name={record?.consumerName || 'Mr.佚名'}
          phone={record?.consumerPhone || ''}
        />
      );
    },
  },
  {
    title: '角色信息',
    dataIndex: 'level',
    width: 200,
    render: (_, record) => {
      console.log('record: ', record);
      // 会员信息 === 会员等级
      return (
        <Fragment>
          <div>经销等级：{record?.level ? levelStatus[String(record?.level)].text : ''}</div>
          <div>
            代理等级：{record?.agentLevel ? agentLevelStatus[String(record?.agentLevel)].text : ''}
          </div>
          <div>会员信息：无</div>
        </Fragment>
      );
    },
  },
  {
    title: '邀请人',
    dataIndex: 'invitationName',
    width: 200,
    render: (text, record) => {
      return (
        <UserContent
          width={180}
          headUrl={record?.invitationHeadUrl}
          name={record?.invitationName || ''}
          phone={record?.invitationPhone || ''}
        />
      );
    },
  },
  {
    title: '邀请层级',
    dataIndex: 'fansLevel',
    width: 120,
    render: (txt) => (txt ? `${txt}级` : ''),
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '累积营业额',
    dataIndex: 'allPrice',
    width: 150,
    render: (txt) => `￥${txt || 0}`,
  },
  {
    title: '上月营业额',
    dataIndex: 'preMonthPrice',
    width: 150,
    render: (txt) => `￥${txt || 0}`,
  },
  {
    title: '本月营业额',
    dataIndex: 'monthPrice',
    width: 150,
    render: (txt) => `￥${txt || 0}`,
  },
  {
    title: '本月个人消费',
    dataIndex: 'personalPrice',
    width: 150,
    render: (txt) => `￥${txt || 0}`,
  },
];
