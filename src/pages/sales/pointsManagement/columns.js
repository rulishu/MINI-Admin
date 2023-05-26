import { Divider } from 'antd';

export const columns = [
  {
    title: '会员编号',
    dataIndex: 'id',

    ellipsis: true,
    width: 30,
  },
  {
    title: '用户昵称',
    dataIndex: 'name',

    ellipsis: true,
    width: 30,
  },
  {
    title: '会员姓名',
    dataIndex: 'lastName',

    ellipsis: true,
    width: 30,
  },
  {
    title: '用户头像',
    dataIndex: 'level',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '会员生日',
    dataIndex: 'birthday',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '手机号码',
    dataIndex: 'phone',

    ellipsis: true,
    width: 30,
  },
  {
    title: '积分总额',
    dataIndex: 'allPrice',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '积分余额',
    dataIndex: 'balance',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '标签',
    dataIndex: 'label',

    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 50,
    fixed: 'right',

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
