export const baseItems = () => [
  {
    label: '会员编号',
    name: 'name2',
    type: 'input',
  },
  {
    label: '会员等级',
    name: 'name3',
    type: 'select',
    options:[]
  },
  {
    label: '来源',
    name: 'name3',
    type: 'input',
  },
  {
    label: '标签',
    name: 'name4',
    type: 'input',
  },
  {
    label: '门店信息',
    name: 'name4',
    type: 'select',
    options:[]
  },
];


export const columns = [
  {
    title: 'ID',
    dataIndex: 'number',
    fixed: 'left',
    width: 90,
    align: 'center',
  },
  {
    title: '会员编号',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '头像',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '个人信息',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '会员等级',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '会员到期时间',
    dataIndex: 'name',
    align: 'center',
    width: 120,
  },
  {
    title: '加入时间(来源)',
    dataIndex: 'name',
    align: 'center',
    width: 120,
  },
  {
    title: '客户类型',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '所属门店',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '操作',
    width: 140,
    fixed: 'right',
    align: 'center',
    render: () => (
      <div>
        <span onClick={() => { }}>
          编辑
        </span>
      </div>
    )
  },
]