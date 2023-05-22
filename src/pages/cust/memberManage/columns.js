// eslint-disable-next-line no-unused-vars
export const columns = (handleEdit) => [
  {
    title: '会员编号',
    dataIndex: 'id',

    width: 90,
    hideInSearch: true,
  },
  {
    title: '会员名称',
    dataIndex: 'userName',

    width: 90,
  },
  {
    title: '手机号',
    dataIndex: 'phone',

    width: 90,
    hideInSearch: true,
  },
  {
    title: '会员类型',
    dataIndex: 'memberType',

    width: 120,
    hideInSearch: true,
  },
  {
    title: '到期时间',
    dataIndex: 'expirationTime',

    width: 120,
    hideInSearch: true,
  },
  {
    title: '开通时间',
    dataIndex: 'openTime',

    width: 120,
    hideInSearch: true,
  },
  // {
  //   title: '操作',
  //   width: 140,
  //   fixed: 'right',
  //
  //   hideInSearch: true,
  //   render: (record) => (
  //     <div>
  //       <a onClick={() => handleEdit('view', record)}>详情</a>
  //     </div>
  //   ),
  // },
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
