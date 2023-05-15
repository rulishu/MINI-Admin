import { Divider } from 'antd';

export const columns = ({ handleEdit, categoryList }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    search: false,
    render: (text, record, index) => index + 1,
  },
  {
    title: '类目名称',
    dataIndex: 'categoryName',
    align: 'center',
    valueType: 'select',
    fieldProps: {
      showSearch: true,
      labelInValue: true,
      options: categoryList.map((item) => ({ label: item?.categoryName, value: item?.id })),
      optionFilterProp: 'label',
      filterOption: (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
    },
  },
  {
    title: '上级类目',
    dataIndex: 'parentId',
    align: 'center',
    search: false,
    render: (text) => {
      return categoryList.find((item) => item.id === text)?.categoryName || '';
    },
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    search: false,
    valueType: 'option',
    key: 'option',
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('manage', record)}>
          商品管理
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          修改
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
