import { Button } from 'antd';

export const columns = [
  {
    title: 'ID',
    dataIndex: 'number',
    fixed: 'left',
    width: 90,
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '会员编号',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
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
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '门店名称',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '关注时间',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '最后浏览时间',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '性别',
    dataIndex: 'name',
    align: 'center',
    width: 90,
  },
  {
    title: '标签',
    dataIndex: 'name',
    align: 'center',
    width: 90,
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
        <Button
          size="small"
          // onClick={() => { }}
        >
          加标签
        </Button>
      </div>
    ),
  },
];
