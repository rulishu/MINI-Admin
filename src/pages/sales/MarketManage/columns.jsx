import { Divider } from 'antd';

export const columns = ({ handleEdit, categoryList }) => [
  {
    title: '类目ID',
    dataIndex: 'id',
    search: false,
  },
  {
    title: '一级类目',
    dataIndex: 'parentArray',
    search: false,
    render: (txt, record) => {
      if (record?.level === 1) {
        return categoryList.find((item) => item?.id === record?.id)?.categoryName;
      } else {
        const arr = txt.split(',');
        return categoryList.find((item) => item?.id === arr?.[0])?.categoryName;
      }
    },
  },
  {
    title: '二级类目',
    dataIndex: 'parentArray',
    search: false,
    render: (txt, record) => {
      if (record?.level < 2) {
        return '-';
      }
      if (record?.level === 2) {
        return categoryList.find((item) => item?.id === record?.id)?.categoryName;
      }
      if (record?.level > 2) {
        const arr = txt.split(',');
        return categoryList.find((item) => item?.id === arr?.[1])?.categoryName;
      }
    },
  },
  {
    title: '三级类目',
    dataIndex: 'parentArray',
    search: false,
    render: (txt, record) => {
      if (record?.level < 3) {
        return '-';
      } else {
        return categoryList.find((item) => item?.id === record?.id)?.categoryName;
      }
    },
  },
  {
    title: '类目名称',
    dataIndex: 'categoryName',
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
    title: '类目等级',
    dataIndex: 'level',
    valueType: 'select',
    fieldProps: {
      options: [
        { label: '一级类目', value: 1 },
        { label: '二级类目', value: 2 },
        { label: '三级类目', value: 3 },
      ],
    },
    // render: (text) => {
    //   return categoryList.find((item) => item.id === text)?.categoryName || '';
    // },
  },
  {
    title: '是否叶子类目',
    dataIndex: 'leafOrder',
    search: false,
    valueType: 'select',
    fieldProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 2 },
      ],
    },
  },
  {
    title: '商品数量',
    dataIndex: 'count',
    search: false,
  },
  {
    title: '操作',
    fixed: 'right',

    search: false,
    valueType: 'option',
    key: 'option',
    render: (_, record) => (
      <div>
        <a type="link" size="small" onClick={() => handleEdit('edit', record)}>
          编辑
        </a>
        {record?.leafOrder === 2 && record?.level < 3 && (
          <>
            <Divider type="vertical" />
            <a type="link" size="small" onClick={() => handleEdit('addChildren', record)}>
              添加子类目
            </a>
          </>
        )}
        <Divider type="vertical" />
        <a type="link" size="small" onClick={() => handleEdit('delete', record)}>
          删除
        </a>
      </div>
    ),
  },
];
