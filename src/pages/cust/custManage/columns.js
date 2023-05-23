import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '用户昵称',
    dataIndex: 'details1',
    align: 'left',
    hideInTable: true,
  },
  {
    title: '用户手机号',
    dataIndex: 'details2',
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
        <div style={{ height: 80, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Avatar shape="square" size={80} src={record?.headUrl} icon={<UserOutlined />} />
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
    title: '经销等级',
    dataIndex: 'liveName',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '代理等级',
    dataIndex: 'proxylevel',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '会员等级',
    dataIndex: 'memberType',
    align: 'left',
    hideInSearch: true,
  },
  {
    title: '邀请人',
    dataIndex: 'expirationTime',
    align: 'left',
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
  },
  {
    title: '经销等级',
    dataIndex: 'openTime2',
    align: 'left',
    valueType: 'select',
    fieldProps: {
      options: [],
    },
    hideInTable: true,
  },
  {
    title: '代理等级',
    dataIndex: 'openTime3',
    align: 'left',
    valueType: 'select',
    fieldProps: {
      options: [],
    },
    hideInTable: true,
  },
  {
    title: '会员等级',
    dataIndex: 'openTime4',
    align: 'left',
    valueType: 'select',
    fieldProps: {
      options: [],
    },
    hideInTable: true,
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
