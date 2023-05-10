import { Divider } from 'antd';

export const columns = [
  {
    title: '海报名称',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    width: 30,
  },
  {
    title: '创建时间',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    width: 30,
    valueType: 'dateRange',
  },
  {
    title: '最近一次上(下)线时间',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '已使用次数',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '缩略图',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '排序',
    dataIndex: 'day',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '操作',
    width: 60,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          下架
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          设置
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          设为店铺海报
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          设为等级审核海报
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          删除
        </a>
      </div>
    ),
  },
];
