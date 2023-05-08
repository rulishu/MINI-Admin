
export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
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