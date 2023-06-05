import PriceRange from '@/components/PriceRange';
import { Divider, Image } from 'antd';

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
    width: 200,
    render: (_, record) => {
      return (
        <div style={{ height: 88, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image
            width={80}
            height={84}
            src={record?.mainGraph}
            fallback="data:image/png;base64,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"
          />
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
      expandTrigger: 'hover',
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
    width: 80,
    valueType: 'dateRange',
  },
  {
    title: '开售时间',
    dataIndex: 'sellTimeRange',
    hideInTable: true,
    width: 80,
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
  },
  {
    title: '操作',
    width: 95,
    fixed: 'right',
    hideInSearch: true,
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        {record?.groupType === 3 && (
          <a type="link" size="small" onClick={() => handleEdit('upload', [record?.id])}>
            上架
          </a>
        )}
        {record?.onShelf === 2 && (
          <a type="link" size="small" onClick={() => handleEdit('down', [record?.id])}>
            下架
          </a>
        )}
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', [record?.id])}>
          删除
        </a>
      </div>
    ),
  },
];
