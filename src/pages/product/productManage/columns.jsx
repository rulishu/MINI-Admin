import AImage from '@/components/AImage';
import PriceRange from '@/components/PriceRange';
import { Divider } from 'antd';

export const columns = ({ handleEdit, options, categoryList, suppliersEnum }) => [
  {
    title: '商品名称',
    dataIndex: 'itemName',
    hideInTable: true,
    width: 200,
  },
  {
    title: '商品ID',
    dataIndex: 'id',
    hideInTable: true,
    width: 50,
  },
  {
    title: '商品',
    dataIndex: 'item',
    search: false,
    width: 250,
    render: (_, record) => {
      return (
        <div style={{ height: 88, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <AImage width={80} height={84} src={record?.mainGraph} />
          {/* <Avatar shape="square" size="large" src={record?.mainGraph} /> */}
          <div style={{ flex: 1, marginLeft: 5, textAlign: 'left', height: 88 }}>
            <p
              style={{
                padding: 0,
                margin: 0,
                height: 66,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {record?.itemName} {record?.model} {record?.specifications}
            </p>
            <p style={{ padding: 0, margin: 0 }}>ID：{record?.id}</p>
          </div>
        </div>
      );
    },
  },
  {
    title: '商品类目',
    key: 'categoryId',
    dataIndex: 'cascader',
    width: 100,
    hideInTable: true,
    fieldProps: {
      // expandTrigger: 'hover',
      options: options(),
      changeOnSelect: true,
      fieldNames: {
        children: 'children',
        label: 'label',
      },
    },
    valueType: 'cascader',
    render: (txt, record) => (
      <div style={{ textAlign: 'center' }}>
        {categoryList.find((item) => item?.id === record?.categoryId)?.categoryName}
      </div>
    ),
  },
  {
    title: '创建时间',
    dataIndex: 'createTimeRange',
    hideInTable: true,
    width: 100,
    valueType: 'dateRange',
  },
  {
    title: '开售时间',
    dataIndex: 'sellTimeRange',
    hideInTable: true,
    width: 100,
    valueType: 'dateRange',
  },
  {
    title: '价格',
    dataIndex: 'price',
    width: 80,
    valueType: 'digit',
    renderFormItem: () => <PriceRange />,
  },
  {
    title: '总库存',
    dataIndex: 'stock',
    search: false,
    width: 50,
  },
  {
    title: '总销量',
    dataIndex: 'volume',
    search: false,
    width: 80,
  },
  {
    title: '商品状态',
    dataIndex: 'onShelf',
    search: false,
    width: 80,
    render: (_, record) => {
      if (record?.groupType === 3) {
        return <span>仓库中</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 1) {
        return <span>待开售</span>;
      }
      if (record?.onShelf === 2 && record?.groupType === 2) {
        return <span>出售中</span>;
      }
    },
  },
  {
    title: '供应商',
    dataIndex: 'suppliersId',
    width: 80,
    valueType: 'select',
    valueEnum: suppliersEnum(),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    search: false,
    width: 80,
  },
  {
    title: '开售时间',
    dataIndex: 'openTime',
    search: false,
    width: 80,
    render: (_, record) => record?.onShelf !== 0 && record?.openTime,
  },
  {
    title: '操作',
    width: 110,
    fixed: 'right',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        {record?.groupType === 3 && (
          <a type="link" size="small" onClick={() => handleEdit('upload', record)}>
            上架
          </a>
        )}
        {record?.onShelf === 2 && (
          <a type="link" size="small" onClick={() => handleEdit('down', record)}>
            下架
          </a>
        )}
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
