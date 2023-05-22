import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
export const columns = ({ handleEdit, productSelector }) => [
  {
    title: 'ID',
    dataIndex: 'id',

    width: 80,
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '供应商名称',
    width: 120,
    dataIndex: 'supplierName',

    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '供应商信息',
    width: 120,
    dataIndex: 'supplier',

    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => (
      <div style={{ textAlign: 'left' }}>
        <div>{record?.supplierName}</div>
        <div>地址：{record?.address}</div>
      </div>
    ),
  },
  {
    title: '联系人名称',
    width: 120,
    dataIndex: 'contactName',

    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '联系人',
    width: 120,
    dataIndex: 'contact',

    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => (
      <div style={{ textAlign: 'left' }}>
        <div>{record?.contactName}</div>
        <div>联系方式：{record?.contactPhone}</div>
      </div>
    ),
  },
  // {
  //   title: '联系方式',
  //   width: 120,
  //   dataIndex: 'contactPhone',
  //
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '地址',
  //   width: 120,
  //   dataIndex: 'address',
  //
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  {
    title: '推荐人',
    width: 120,
    dataIndex: 'productId',

    ellipsis: true,
    valueType: 'select',
    hideInSearch: true,
    fieldProps: {
      allowClear: true,
      showSearch: true,
      filterOption: (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
      options: productSelector.options,
    },
    render: (_, record) => (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {record?.productHeader ? (
          <Avatar src={record?.productHeader} />
        ) : (
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
        )}
        <div style={{ textAlign: 'left', marginLeft: 8 }}>
          <div>{record?.productSelector}</div>
          <div>{record?.productSelectorContact}</div>
        </div>
      </div>
    ),
  },
  // {
  //   title: '选品人',
  //   width: 120,
  //   dataIndex: 'productSelector',
  //
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  {
    title: '推荐人手机号',
    width: 120,
    dataIndex: 'productSelectorContact',

    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '创建时间',
    width: 120,
    dataIndex: 'createTime',

    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '更新时间',
    width: 120,
    dataIndex: 'updateTime',

    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '操作',

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
