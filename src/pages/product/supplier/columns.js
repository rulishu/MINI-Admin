import UserContent from '@/components/UserContent';
import { Divider, Typography } from 'antd';
import moment from 'moment';
const { Text } = Typography;
export const columns = ({ handleEdit, productSelector }) => [
  {
    title: 'ID',
    dataIndex: 'supplierId',
    width: 40,
    ellipsis: true,
    hideInSearch: true,
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
    dataIndex: 'supplier',
    width: 450,
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => (
      <div style={{ textAlign: 'left' }}>
        <div>
          <Text
            style={{ fontSize: '16px', fontWeight: 'bold' }}
            ellipsis={{ tooltip: record?.supplierName }}
          >
            {record?.supplierName || '-'}
          </Text>
        </div>
        <div>
          <Text style={{ fontSize: '14px' }} ellipsis={{ tooltip: record?.regAddress }}>
            地址：{record?.regAddress || '-'}
          </Text>
        </div>
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
    width: 180,
    dataIndex: 'contact',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) => (
      <UserContent
        showHead={false}
        headUrl=""
        name={record.contactName}
        phone={record.contactPhone}
        width={180}
      />
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
    width: 220,
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
      <UserContent
        headUrl={record.productHeader}
        name={record.productSelector}
        phone={record.productSelectorContact}
        width={220}
      />
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
    ellipsis: true,
    hideInTable: true,
  },
  {
    title: '创建时间',
    width: 180,
    dataIndex: 'createTime',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.createTime && moment(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '更新时间',
    width: 180,
    dataIndex: 'updateTime',
    ellipsis: true,
    hideInSearch: true,
    render: (_, record) =>
      record.updateTime && moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss'),
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
