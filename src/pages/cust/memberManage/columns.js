import { Button,Divider } from 'antd'

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 120,
    align: 'center',
  },
  {
    title: '会员编号',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'name2',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '个人信息',
    dataIndex: 'name2',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '会员等级',
    dataIndex: 'address',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '会员到期时间',
    dataIndex: 'time',
    align: 'center',
    width: 150,
    ellipsis: true,
  },
  {
    title: '加入时间(来源)',
    dataIndex: 'name2',
    align: 'center',
    width: 150,
    ellipsis: true,
  },
  {
    title: '客户类型',
    dataIndex: 'name3',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '所属门店',
    dataIndex: 'name4',
    align: 'center',
    width: 120,
    ellipsis: true,
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    render: () => (
      <div>
        <Button type="link" size="small">详情</Button>
        <Divider type="vertical" />
        <Button type="link" size="small">加标签</Button>
      </div>
    )
  },
]