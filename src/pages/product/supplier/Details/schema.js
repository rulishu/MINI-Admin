export const schema = ({ productSelector, province }) => {
  return {
    type: 'object',
    properties: {
      form1: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '基本信息',
        properties: {
          supplierName: {
            title: '供应商名称',
            type: 'string',
            required: true,
          },
          contactName: {
            title: '联系人',
            type: 'string',
            required: true,
          },
          contactPhone: {
            title: '联系方式',
            type: 'string',
            required: true,
          },
          province: {
            title: '省市区',
            type: 'array',
            required: true,
            widget: 'cascader',
            props: {
              options: province.options,
              allowClear: true,
            },
          },
          address: {
            title: '地址',
            type: 'string',
            required: true,
          },
        },
      },
      form2: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '推荐人信息',
        properties: {
          productSelector: {
            title: '推荐人',
            type: 'object',
            widget: 'select',
            required: true,
            props: {
              labelInValue: true,
              optionFilterProp: 'children',
              filterOption: false,
              showSearch: true,
              onFocus: productSelector.onFocus,
              onSearch: productSelector.onSearch,
              options: productSelector.options,
            },
          },
        },
      },
    },
  };
};
