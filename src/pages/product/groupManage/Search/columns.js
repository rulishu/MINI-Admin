import { Button, Divider } from 'antd';

export const columns = [
  {
    title: '分组名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '在售商品数/商品数',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <Button size="small" onClick={() => { }} >
          商品管理
        </Button>
        <Button size="small" onClick={() => { }}>
          修改
        </Button>
        <Button size="small" onClick={() => { }}>
          删除
        </Button>
      </div>
    ),
  },
];
