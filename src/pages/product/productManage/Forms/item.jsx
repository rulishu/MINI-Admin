export default {
  type: 'object',
  displayType: 'row',
  widget: 'lineTitle',
  properties: {
    obj: {
      type: 'object',
      title: '基本信息',
      widget: 'lineTitle',
      properties: {
        input1: {
          title: '商品名称',
          type: 'string',
          required: true,
          widget: 'input',
          placeholder: '请输入100个字以内的商品名',
        },

        select1: {
          title: '商品类目',
          type: 'string',
          widget: 'select',
          placeholder: '请选择',
          props: {
            options: [
              { label: '早', value: 'a' },
              { label: '中', value: 'b' },
              { label: '晚', value: 'c' },
            ],
          },
        },
        input2: {
          title: '分享描述',
          type: 'number',
          widget: 'input',
          placeholder: '请输入最多36个字',
          tooltip: '用于商品分享时商品名称下方插入的描述信息',
        },
      },
    },
    obj1: {
      type: 'object',
      title: '价格和库存',
      widget: 'lineTitle',
      properties: {
        list: {
          title: '商品规格',
          type: 'array',
          widget: 'simpleList',
          display: 'inline',
          props: {
            hideAdd: true,
            hideMove: true,
            hideDelete: true,
          },
          items: {
            type: 'object',
            properties: {
              input1: {
                title: '规格名',
                type: 'string',
                placeholder: '请输入最多10个字',
              },
              input2: {
                title: '规格值',
                type: 'string',
                placeholder: '请输入最多10个字',
              },
              input3: {
                title: '',
                type: 'string',
                widget: 'checkboxes',
                props: {
                  options: [{ label: '享受VIP折扣', value: 'a' }],
                },
              },
            },
          },
        },
        list2: {
          title: '规格明细:',
          type: 'array',
          widget: 'tableList',
          display: 'inline',
          props: {
            hideAdd: true,
            hideMove: true,
          },
          items: {
            type: 'object',
            properties: {
              input1: {
                title: '输入规格名',
                type: 'string',
                required: true,
              },
              input2: {
                title: '销售价(元)',
                type: 'string',
              },
              input3: {
                title: '成本价(元)',
                type: 'string',
              },
              select1: {
                title: '库存',
                type: 'string',
                widget: 'radio',
                required: true,
                props: {
                  options: [
                    { label: '有限库存', value: 'a' },
                    { label: '无限库存', value: 'b' },
                  ],
                },
              },
            },
          },
        },
      },
    },
    obj2: {
      type: 'object',
      title: '商品参数',
      widget: 'lineTitle',
      properties: {
        input3: {
          title: '净含量',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入',
        },
        input4: {
          title: '酒精度',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入',
        },
        input5: {
          title: '香型',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入',
        },
        input6: {
          title: '原料',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入',
        },
        input7: {
          title: '执行标准',
          type: 'string',
          widget: 'input',
          required: true,
          placeholder: '请输入',
        },
      },
    },
    obj3: {
      type: 'object',
      title: '物流信息',
      widget: 'lineTitle',
      properties: {
        radio1: {
          title: '配送方式',
          type: 'string',
          widget: 'radio',
          required: true,
          props: {
            options: [{ label: '统一邮寄', value: 'a' }],
          },
        },
        radio2: {
          title: '快递运费',
          type: 'string',
          widget: 'radio',
          required: true,
          tooltip: '设置运费到付后，需要买家在收到商品后自行支付运费，运费最终以物流公司计算为准。',
          props: {
            options: [
              { label: '快递发货', value: 'a' },
              { label: '运费到付', value: 'b' },
            ],
          },
        },
      },
    },
    obj4: {
      type: 'object',
      title: '其他权益',
      widget: 'lineTitle',
      properties: {
        checkboxes1: {
          title: '选择相关权益',
          type: 'array',
          widget: 'checkboxes',
          props: {
            options: [
              { label: '实施云监控', value: 'a' },
              { label: '老坛窖藏', value: 'b' },
            ],
          },
        },
      },
    },
    obj5: {
      type: 'object',
      title: '简介',
      widget: 'lineTitle',
      properties: {
        textarea1: {
          title: '简介内容',
          type: 'string',
          widget: 'textArea',
          required: true,
        },
      },
    },
  },
};
