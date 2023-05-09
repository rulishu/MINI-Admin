import { Button } from 'antd';

export const columns = [
  {
    title: '参数项',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '参数值',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '所属类目',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
  },
  {
    title: '商品发布页',
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
        <Button size="small" onClick={() => {}}>
          商品管理
        </Button>
        <Button size="small" onClick={() => {}}>
          修改
        </Button>
        <Button size="small" onClick={() => {}}>
          删除
        </Button>
      </div>
    ),
  },
];
