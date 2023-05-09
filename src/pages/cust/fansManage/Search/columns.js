export const columns = [
  // {
  //   title: () => <Checkbox></Checkbox>,
  //   dataIndex: 'checkout',
  //   hideInSearch: true,
  //   render: () => <Checkbox></Checkbox>,
  // },
  {
    title: 'ID',
    dataIndex: 'number',
    width: 120,
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '会员编号',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '头像',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '个人信息',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '门店名称',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '关注时间',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '最后浏览时间',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '昵称',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '性别',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '男' },
      2: { text: '女' },
    },
  },
  {
    title: '用户身份',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInTable: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
      1: { text: '经销商' },
    },
  },
  {
    title: '购物偏好',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInTable: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
    },
  },
  {
    title: '拉新能力',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部' },
    },
  },
  {
    title: '标签',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    hideInSearch: true,
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
          加标签
        </a>
      </div>
    ),
  },
];
