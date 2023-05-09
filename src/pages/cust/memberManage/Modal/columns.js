import { Button } from 'antd';

export const columns = [
  {
    title: '导出时间',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    ellipsis: true,
    valueType: 'dateRange',
  },
  {
    title: '导出条件',
    dataIndex: 'name',
    align: 'center',
    width: 90,
    hideInSearch: true,
  },
  {
    title: '操作人',
    dataIndex: 'type',
    align: 'center',
    width: 120,
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
        <Button onClick={() => {}} size="small">
          详情
        </Button>
      </div>
    ),
  },
];
