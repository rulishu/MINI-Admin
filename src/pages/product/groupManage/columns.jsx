import { Divider } from 'antd';

export const columns = ({ handleEdit, categoryList }) => [
  {
    title: '类目ID',
    dataIndex: 'id',
    align: 'center',
    render: (text, record, index) => index + 1,
  },
  {
    title: '一级类目',
    dataIndex: '1111111',
    align: 'center',
    search: false,
    render: (text) => {
      return categoryList.find((item) => item.id === text)?.categoryName || '';
    },
  },
  {
    title: '二级类目',
    dataIndex: '1111111',
    align: 'center',
    search: false,
    render: (text) => {
      return categoryList.find((item) => item.id === text)?.categoryName || '';
    },
  },
  {
    title: '三级类目',
    dataIndex: '1111111',
    align: 'center',
    search: false,
    render: (text) => {
      return categoryList.find((item) => item.id === text)?.categoryName || '';
    },
  },
  {
    title: '类目名称',
    dataIndex: 'categoryName',
    align: 'center',
    valueType: 'select',
    hideInTable: true,
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
    title: '类目级别',
    dataIndex: 'parentId',
    align: 'center',
    valueType: 'select',
    fieldProps: {
      options: [
        { label: '一级类目', value: '一级类目' },
        { label: '二级类目', value: '二级类目' },
        { label: '三级类目', value: '三级类目' },
      ],
    },
    // render: (text) => {
    //   return categoryList.find((item) => item.id === text)?.categoryName || '';
    // },
  },
  {
    title: '是否叶子类目',
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
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('addChildren', record)}>
          添加子类目
        </a>
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
