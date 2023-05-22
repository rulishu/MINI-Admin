import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd';
import moment from 'moment';
export const columns = ({ handleEdit, productSelector }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'left',
    width: 80,
    ellipsis: true,
    hideInSearch: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '供应商名称',
    width: 120,
    dataIndex: 'supplierName',
    align: 'left',
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '供应商信息',
    width: 120,
    dataIndex: 'supplier',
    align: 'left',
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
    align: 'left',
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '联系人',
    width: 120,
    dataIndex: 'contact',
    align: 'left',
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
  //   align: 'left',
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  // {
  //   title: '地址',
  //   width: 120,
  //   dataIndex: 'address',
  //   align: 'left',
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  {
    title: '推荐人',
    width: 120,
    dataIndex: 'productId',
    align: 'left',
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
  //   align: 'left',
  //   ellipsis: true,
  //   hideInSearch: true,
  // },
  {
    title: '推荐人手机号',
    width: 120,
    dataIndex: 'productSelectorContact',
    align: 'left',
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '创建时间',
    width: 120,
    dataIndex: 'createTime',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '更新时间',
    width: 120,
    dataIndex: 'updateTime',
    align: 'left',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.updateTime && moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    align: 'left',
    // width: 120,
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
