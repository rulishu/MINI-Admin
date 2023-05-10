import { Divider } from 'antd';

export const columns = [
  {
    title: '会员编号',
    dataIndex: 'id',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '用户昵称',
    dataIndex: 'name',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '会员姓名',
    dataIndex: 'lastName',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '用户头像',
    dataIndex: 'level',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '会员生日',
    dataIndex: 'birthday',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '积分总额',
    dataIndex: 'allPrice',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '积分余额',
    dataIndex: 'balance',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '标签',
    dataIndex: 'label',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 50,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          修改
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          记录
        </a>
      </div>
    ),
  },
];
