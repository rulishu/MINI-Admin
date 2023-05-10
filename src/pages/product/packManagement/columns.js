import { Divider, Popconfirm } from 'antd';

export const columns = ({ handleEdit }) => [
  {
    title: '店长等级',
    dataIndex: 'level',
    hideInSearch: true,
    align: 'center',
    width: 30,
  },
  {
    title: '一级收益比例',
    dataIndex: 'name',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '二级收益比例',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '三级收益比例',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },

  {
    title: '操作',
    width: 30,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          修改
        </a>
        <Divider type="vertical" />
        {/* <Popconfirm
          title="权益规则删除"
          description="删除后无法恢复规则，确认要删除该权益规则吗"
          okText="确定"
          cancelText="取消"
        > */}
        <a type="link" size="small" onClick={() => handleEdit('del', record)}>
          删除
        </a>
        {/* </Popconfirm> */}
      </div>
    ),
  },
];

export const columnsGift = [
  {
    title: '商品名称',
    dataIndex: 'level',
    hideInSearch: true,
    align: 'center',
    width: 30,
  },
  {
    title: '组合明细',
    dataIndex: 'id',
    align: 'center',
    hideInSearch: true,
    width: 30,
  },
  {
    title: '组合数',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '可售库存',
    dataIndex: 'it',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '发货/入云仓',
    dataIndex: 'type',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 30,
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
    width: 60,
  },
  {
    title: '操作',
    width: 40,
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    render: () => (
      <div>
        <div>
          <a type="link" size="small">
            推广
          </a>
        </div>
        <div>
          <a type="link" size="small">
            设置为发货
          </a>
        </div>
        <div>
          <a type="link" size="small">
            修改
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="权益规则删除"
            description="删除后无法恢复规则，确认要删除该权益规则吗"
            okText="确定"
            cancelText="取消"
          >
            <a type="link" size="small">
              删除
            </a>
          </Popconfirm>
        </div>
      </div>
    ),
  },
];
