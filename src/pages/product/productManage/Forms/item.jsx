export default (options) => ({
  type: 'object',
  widget: 'lineTitle',
  displayType: 'row',
  properties: {
    form1: {
      displayType: 'row',
      type: 'object',
      column: 1,
      title: '商品分类',
      widget: 'lineTitle',
      properties: {
        categoryId: {
          title: '商品类目',
          type: 'object',
          widget: 'cascader',
          required: true,
          props: {
            expandTrigger: 'hover',
            // displayRender: (labels) => labels[labels.length - 1],
            options: options(),
          },
        },
      },
    },
    form2: {
      type: 'object',
      column: 1,
      title: '基础信息',
      widget: 'lineTitle',
      properties: {
        itemName: {
          title: '商品标题',
          type: 'string',
          required: true,
          widget: 'input',
          placeholder: '最多输入30个汉字',
          props: {
            maxLength: 30,
            showCount: true,
          },
        },
        details: {
          type: 'string',
          title: '商品描述',
          widget: 'textArea',
          props: {
            row: 4,
          },
          required: false,
        },
        itemType: {
          type: 'number',
          title: '商品类型',
          required: true,
          widget: 'radio',
          props: {
            options: [
              { label: '标准商品', value: 1 },
              { label: '定制商品', value: 2 },
            ],
          },
        },
        supplierName1111: {
          title: '供应商',
          type: 'string',
          required: true,
          widget: 'select',
          props: {
            options: [
              { label: '早', value: 'a' },
              { label: '中', value: 'b' },
              { label: '晚', value: 'c' },
            ],
          },
        },
        goodsOrigin1111: {
          title: '商品原产地',
          type: 'string',
          widget: 'select',
          required: true,
          props: {
            options: [
              { label: '早', value: 'a' },
              { label: '中', value: 'b' },
              { label: '晚', value: 'c' },
            ],
          },
        },
      },
    },
    form3: {
      type: 'object',
      column: 1,
      title: '图文信息',
      widget: 'lineTitle',
      properties: {
        mainGraph: {
          title: '主图',
          widget: 'picupload',
          required: true,
          props: {
            listType: 'picture-card',
            maxCount: 20,
            warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1',
          },
        },
        video11111: {
          title: '视频',
          widget: 'picupload',
          required: true,
          props: {
            listType: 'picture-card',
            maxCount: 1,
            warn: '1.仅支持mp4格式上传，大小100M内，建议30秒内短视频最佳',
          },
        },
        picdetail11111: {
          title: '详情',
          widget: 'picupload',
          required: true,
          props: {
            listType: 'picture-card',
            maxCount: 20,
            warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
          },
        },
      },
    },
    form4: {
      type: 'object',
      column: 1,
      title: '销售信息',
      widget: 'lineTitle',
      properties: {
        specifications: {
          title: '商品规格',
          type: 'string',
          required: true,
          placeholder: '请输入规格',
          props: {
            maxLength: 50,
            showCount: true,
          },
        },
        stock: {
          title: '总库存',
          required: true,
          type: 'number',
          disabled: true,
          props: {
            min: 0,
          },
        },
        price1111: {
          title: '售卖价格',
          type: 'number',
          required: true,
          props: {
            min: 0,
          },
        },
        // thinkprice1111: {
        //   title: '参考价格',
        //   type: 'number',
        //   required: true,
        //   placeholder: '请输入参考价格',
        //   props: {
        //     min: 0,
        //   },
        // },
        model111111: {
          title: 'SPU编码',
          type: 'string',
          placeholder: '请输入SPU编码',
          props: {
            maxLength: 40,
            showCount: true,
          },
        },
      },
    },
    form5: {
      type: 'object',
      column: 1,
      title: '服务与其他',
      widget: 'lineTitle',
      properties: {
        templateId: {
          type: 'string',
          title: '运费模版',
          required: true,
          widget: 'select',
          props: {
            options: [{ label: '测试包邮', value: '21' }],
          },
        },
        groundType: {
          title: '上架时间',
          type: 'number',
          required: true,
          widget: 'radio',
          props: {
            options: [
              { label: '立即上架', value: 1 },
              { label: '定时上架', value: 2 },
              { label: '放入仓库', value: 3 },
            ],
          },
        },
        openTime: {
          title: '日期选择',
          type: 'string',
          widget: 'datePicker',
          props: {
            placeholder: '请选择上架时间',
            showTime: {
              format: 'HH:mm',
            },
          },
          hidden: '{{ formData.form5.groundType === 1 || formData.form5.groundType === 3 }}',
        },
      },
    },
  },
});
