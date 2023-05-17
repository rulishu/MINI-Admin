export const schema = ({ type, visible, province }) => {
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
            rules: [{ pattern: '^1[0-9]{10}$', message: '请输入正确手机号' }],
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
          productId: {
            title: '推荐人',
            type: 'string',
            widget: 'selectUser',
            required: true,
            props: {
              type,
              visible,
            },
          },
        },
      },
    },
  };
};
