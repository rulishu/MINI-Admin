import { Divider } from 'antd';

export const columns = ({ handleEdit, productSelector }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 80,
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '供应商名称',
    width: 120,
    dataIndex: 'supplierName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '联系人',
    width: 120,
    dataIndex: 'contactName',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '联系方式',
    width: 120,
    dataIndex: 'contactPhone',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '地址',
    width: 120,
    dataIndex: 'address',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '选品人',
    width: 120,
    dataIndex: 'productSelectorId',
    align: 'center',
    ellipsis: true,
    valueType: 'select',
    hideInTable: true,
    fieldProps: {
      showSearch: true,
      filterOption: false,
      onFocus: productSelector.onFocus,
      onSearch: productSelector.onSearch,
      options: productSelector.options,
    },
  },
  {
    title: '选品人',
    width: 120,
    dataIndex: 'productSelector',
    align: 'center',
    ellipsis: true,
  },
  {
    title: '选品人联系方式',
    width: 120,
    dataIndex: 'productSelectorContact',
    align: 'center',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',
    align: 'center',
    width: 120,
    fixed: 'right',
    hideInSearch: true,
    render: (record) => (
      <div>
        <a onClick={() => handleEdit('edit', record)}>编辑</a>
        <Divider type="vertical" />
        <a onClick={() => handleEdit('delete', record)}>删除</a>
      </div>
    ),
  },
];
