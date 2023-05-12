export default {
  type: 'object',
  widget: 'lineTitle',
  displayType: 'column',
  properties: {
    // obj: {
    //   type: 'object',
    //   title: '基本信息',
    //   widget: 'lineTitle',
    //   column: 3,
    //   properties: {
    //     input1: {
    //       title: '商品名称',
    //       type: 'string',
    //       required: true,
    //       widget: 'input',
    //       placeholder: '请输入100个字以内的商品名',
    //     },
    //     select1: {
    //       title: '商品类目',
    //       type: 'string',
    //       widget: 'select',
    //       placeholder: '请选择',
    //       props: {
    //         options: [
    //           { label: '早', value: 'a' },
    //           { label: '中', value: 'b' },
    //           { label: '晚', value: 'c' },
    //         ],
    //       },
    //     },
    //     input2: {
    //       title: '分享描述',
    //       type: 'number',
    //       widget: 'input',
    //       placeholder: '请输入最多36个字',
    //       tooltip: '用于商品分享时商品名称下方插入的描述信息',
    //     },
    //   },
    // },
    // obj1: {
    //   type: 'object',
    //   title: '价格和库存',
    //   widget: 'lineTitle',
    //   properties: {
    //     productSpecifications: {
    //       title: '商品规格',
    //       type: 'array',
    //       widget: 'cardList',
    //       displayType: 'row',
    //       props: {
    //         hideAdd: false,
    //         hideMove: true,
    //         hideDelete: false,
    //         hideCopy: true
    //       },
    //       items: {
    //         type: 'object',
    //         properties: {
    //           skuName: {
    //             required:true,
    //             width: "50%",
    //             title: '规格名',
    //             type: 'string',
    //             placeholder: '请输入规格名',
    //           },
    //           // photo: {
    //           //   width: "50%",
    //           //   title: '规格图片',
    //           //   type: 'string',
    //           // },
    //           attributes: {
    //             width:"100%",
    //             title: '规格值',
    //             type: 'array',
    //             widget: 'simpleList',
    //             props: {
    //               hideAdd: false,
    //               hideMove: true,
    //               hideDelete: false,
    //               hideCopy: true
    //             },
    //             items: {
    //               type: 'object',
    //               properties: {
    //                 attributeName: {
    //                   type: 'string',
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     details: {
    //       title: '对象数组',
    //       description: '对象数组嵌套功能',
    //       type: 'array',
    //       widget: 'tableList',
    //       props:{
    //         hideAdd: true,
    //         hideMove: true,
    //         hideDelete: true,
    //         hideCopy: true
    //       },
    //       items: {
    //         type: 'object',
    //         properties: {
    //           name: {
    //             title: '规格名',
    //             type: 'string',
    //               disabled:true
    //           },
    //           value: {
    //             title: '规格值',
    //             type: 'string',
    //             required: true,
    //             disabled:true
    //           },
    //           price: {
    //             title: '价格',
    //             type: 'string',
    //             required: true,
    //           },
    //           number: {
    //             title: '库存',
    //             type: 'string',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // obj2: {
    //   type: 'object',
    //   title: '商品参数',
    //   widget: 'lineTitle',
    //   column: 3,
    //   properties: {
    //     input3: {
    //       title: '净含量',
    //       type: 'string',
    //       widget: 'input',
    //       required: true,
    //       placeholder: '请输入',
    //     },
    //     input4: {
    //       title: '酒精度',
    //       type: 'string',
    //       widget: 'input',
    //       required: true,
    //       placeholder: '请输入',
    //     },
    //     input5: {
    //       title: '香型',
    //       type: 'string',
    //       widget: 'input',
    //       required: true,
    //       placeholder: '请输入',
    //     },
    //     input6: {
    //       title: '原料',
    //       type: 'string',
    //       widget: 'input',
    //       required: true,
    //       placeholder: '请输入',
    //     },
    //     input7: {
    //       title: '执行标准',
    //       type: 'string',
    //       widget: 'input',
    //       required: true,
    //       placeholder: '请输入',
    //     },
    //   },
    // },
    // obj3: {
    //   type: 'object',
    //   title: '物流信息',
    //   column: 3,
    //   widget: 'lineTitle',
    //   properties: {
    //     radio1: {
    //       title: '配送方式',
    //       type: 'string',
    //       widget: 'radio',
    //       required: true,
    //       props: {
    //         options: [{ label: '统一邮寄', value: 'a' }],
    //       },
    //     },
    //     radio2: {
    //       title: '快递运费',
    //       type: 'string',
    //       widget: 'radio',
    //       required: true,
    //       tooltip: '设置运费到付后，需要买家在收到商品后自行支付运费，运费最终以物流公司计算为准。',
    //       props: {
    //         options: [
    //           { label: '快递发货', value: 'a' },
    //           { label: '运费到付', value: 'b' },
    //         ],
    //       },
    //     },
    //   },
    // },
    // obj4: {
    //   type: 'object',
    //   title: '其他权益',
    //   widget: 'lineTitle',
    //   column: 3,
    //   properties: {
    //     checkboxes1: {
    //       title: '选择相关权益',
    //       type: 'array',
    //       widget: 'checkboxes',
    //       props: {
    //         options: [
    //           { label: '实施云监控', value: 'a' },
    //           { label: '老坛窖藏', value: 'b' },
    //         ],
    //       },
    //     },
    //   },
    // },
    // obj5: {
    //   type: 'object',
    //   title: '简介',
    //   widget: 'lineTitle',
    //   column: 1,
    //   properties: {
    //     textarea1: {
    //       title: '简介内容',
    //       type: 'string',
    //       widget: 'textArea',
    //       required: true,
    //     },
    //   },
    // },
  },
};
