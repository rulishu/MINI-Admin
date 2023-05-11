import { Divider } from 'antd';

export const columns = [
  // {
  //   title: () => <Checkbox></Checkbox>,
  //   dataIndex: 'checkout',
  //   hideInSearch: true,
  //   render: () => <Checkbox></Checkbox>,
  // },
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '会员编号',
    dataIndex: 'userId',
    align: 'center',
    width: 90,
  },
  {
    title: '头像',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '个人信息',
    dataIndex: 'userName',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '会员等级',
    dataIndex: 'type',
    align: 'center',
    width: 120,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '粉丝' },
      2: { text: '奋斗者' },
    },
  },
  {
    title: '会员到期时间',
    dataIndex: 'expirationTime',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '来源',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '粉丝' },
      2: { text: '奋斗者' },
    },
  },
  {
    title: '客户类型',
    dataIndex: 'memberType',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '所属门店',
    dataIndex: 'companyName',
    align: 'center',
    width: 90,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '粉丝' },
      2: { text: '奋斗者' },
    },
  },
  {
    title: '操作',
    width: 140,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a
          type="link"
          size="small"
          // onClick={() => handleEdit('edit', record)}
        >
          详情
        </a>
        <Divider type="vertical" />
        <a
          type="link"
          size="small"
          // onClick={() => handleEdit('edit', record)}
        >
          加标签
        </a>
      </div>
    ),
  },
];
