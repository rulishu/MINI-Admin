export default (options) => ({
  type: 'object',
  widget: 'lineTitle',
  displayType: 'column',
  properties: {
    form1: {
      type: 'object',
      column: 1,
      properties: {
        itemType: {
          title: '商品来源',
          type: 'number',
          required: true,
          widget: 'select',
          props: {
            options: [
              { label: '自有商品', value: 0 },
              { label: '保税区商品', value: 1 },
            ],
          },
          placeholder: '请选择商品类型',
        },
        itemName: {
          title: '商品名称',
          type: 'string',
          required: true,
          widget: 'input',
          placeholder: '请输入商品名称',
          props: {
            maxLength: 30,
            showCount: true,
          },
        },
        model: {
          title: '商品型号',
          type: 'string',
          required: true,
          placeholder: '请输入商品型号',
          props: {
            maxLength: 40,
            showCount: true,
          },
        },
        specifications: {
          title: '规格',
          type: 'string',
          required: true,
          placeholder: '请输入规格',
          props: {
            maxLength: 50,
            showCount: true,
          },
        },
        parentId: {
          title: '商品类目',
          type: 'object',
          widget: 'cascader',
          required: true,
          props: {
            expandTrigger: 'hover',
            options: options(),
            changeOnSelect: true,
          },
        },

        remark: {
          type: 'string',
          title: '备注',
          widget: 'textArea',
          props: {
            row: 4,
          },
        },
        // brandId: {
        //   type: 'string',
        //   title: '商品品牌',
        //   required: true,
        //   widget: 'select',
        //   props: {
        //     options: [{ label: 'DRKANTER', value: '58' }],
        //   },
        // },
        categoryId: {
          type: 'string',
          title: '商品类目',
          required: true,
          widget: 'select',
          disabled: true,
          props: {
            options: [
              { label: '标品商品', value: '2' },
              { label: '封坛商品', value: '3' },
            ],
          },
        },
        details: {
          type: 'string',
          title: '商品介绍',
          widget: 'textArea',
          props: {
            row: 4,
          },
          required: true,
        },
        stock: {
          title: '库存',
          required: true,
          type: 'number',
          props: {
            min: 0,
          },
        },
        price: {
          title: '商品价格',
          type: 'number',
          required: true,
          props: {
            min: 0,
          },
        },
        taxRate: {
          title: '税率',
          type: 'number',
          required: true,
          widget: 'input',
          placeholder: '请输入税率',
          props: {
            addonAfter: '%',
          },
        },
        // templateId: {
        //   type: 'string',
        //   title: '运费模版',
        //   required: true,
        //   widget: 'select',
        //   props: {
        //     options: [{ label: '测试', value: '21' }],
        //   },
        // },
      },
    },
  },
});
