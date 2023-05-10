import { Divider } from 'antd';

export const columns = () => [
  {
    title: '小店名称',
    dataIndex: 'id',
    width: 120,
    align: 'center',
  },
  {
    title: '主播会员编号',
    dataIndex: 'id2',
    hideInTable: true,
  },
  {
    title: '主播会员昵称',
    dataIndex: 'id3',
    hideInTable: true,
  },
  {
    title: '视频号小店信息',
    dataIndex: 'type',
    align: 'center',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '主播信息',
    dataIndex: 'name',
    align: 'center',
    width: 120,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    width: 180,
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <a type="link" size="small">
          删除
        </a>
        <Divider type="vertical" />
        <a type="link" size="small">
          编辑
        </a>
      </div>
    ),
  },
];
