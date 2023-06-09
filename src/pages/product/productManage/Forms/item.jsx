import dayjs from 'dayjs';

export default (
  options,
  suppliersList,
  templateIdList,
  cityTreeList,
  allstocks,
  minSale,
  categoryList = [],
) => ({
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
          rules: [
            {
              validator: (_, value) => {
                if (
                  categoryList.find((item) => item?.id === value?.[value.length - 1])?.leafOrder !==
                  1
                ) {
                  // 或者是返回一个对象，用于动态设置 message 内容
                  return {
                    status: false,
                    message: '请选择叶子类目',
                  };
                } else {
                  return true;
                }
              },
            },
          ],
        },
      },
    },
    form2: {
      type: 'object',
      column: 1,
      title: '基础信息',
      widget: 'lineTitle',
      // hidden: step === 1,
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
          default: 1,
          props: {
            options: [
              { label: '标准商品', value: 1 },
              { label: '定制商品', value: 2 },
            ],
          },
        },
        suppliersId: {
          title: '供应商',
          type: 'number',
          required: true,
          widget: 'select',
          props: {
            showSearch: true,
            optionFilterProp: 'label',
            filterOption: (input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
            labelInValue: true,
            options: suppliersList.map((item) => ({
              label: `${item?.supplierName}(推荐人：${item?.productSelector})`,
              value: item?.supplierId,
            })),
          },
        },
        provenance: {
          title: '商品原产地',
          type: 'object',
          widget: 'cascader',
          tooltip: '原产地作为商品溯源的标签，请精确到三级地址',
          required: true,
          props: {
            expandTrigger: 'hover',
            options: cityTreeList(),
          },
        },
      },
    },
    form3: {
      type: 'object',
      column: 1,
      title: '图文信息',
      widget: 'lineTitle',
      // hidden: step === 1,
      properties: {
        mainGraphs: {
          title: '主图',
          widget: 'picupload',
          required: true,
          props: {
            listType: 'picture-card',
            maxCount: 20,
            warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB，宽高比例为1:1',
            limitSize: 5,
            multiple: true,
            accept: '.png, .jpg, .jpeg',
          },
        },
        itemVideo: {
          title: '视频',
          widget: 'picupload',
          props: {
            listType: 'picture-card',
            maxCount: 1,
            warn: '1.仅支持mp4格式上传，大小100M内，建议30秒内短视频最佳',
            limitSize: 100,
            accept: '.mp4',
          },
        },
        itemImageVoList: {
          title: '详情图',
          widget: 'picupload',
          required: true,
          props: {
            listType: 'picture-card',
            maxCount: 20,
            warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
            limitSize: 5,
            multiple: true,
            accept: '.png, .jpg, .jpeg',
          },
        },
      },
    },
    form4: {
      type: 'object',
      column: 1,
      title: '销售信息',
      widget: 'lineTitle',
      // hidden: step === 1,
      properties: {
        itemSkuVos: {
          title: '商品规格',
          type: 'object',
          required: true,
          widget: 'skubutton',
          placeholder: '请输入规格',
          // props: {
          //   maxLength: 50,
          //   showCount: true,
          // },
        },
        stock: {
          title: '总库存',
          required: true,
          type: 'number',
          // widget: 'Number',
          disabled: true,
          default: allstocks,
          props: {
            min: 0,
          },
        },
        costPrice: {
          title: '售卖价格',
          type: 'number',
          // widget: 'Number',
          required: true,
          disabled: true,
          default: minSale,
          tooltip: '该价格等于sku最低价，作为前端显示的基准价，暂不支持修改',
          props: {
            min: 0,
          },
        },
        // price: {
        //   title: '参考价格',
        //   type: 'string',
        //   // widget: 'Number',
        //   tooltip: '参考价大于等于售卖价，最多保留2位小数',
        //   placeholder: '请输入参考价格',
        //   required: true,
        //   props: {
        //     // min: 0,
        //   },
        // },
        spuCode: {
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
      // hidden: step === 1,
      properties: {
        templateId: {
          type: 'number',
          title: '运费模版',
          required: true,
          widget: 'select',
          props: {
            labelInValue: true,
            options: templateIdList.map((item) => ({ label: item?.name, value: item?.id })),
          },
        },
        groundType: {
          title: '上架时间',
          type: 'number',
          required: true,
          widget: 'radio',
          default: 1,
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
          widget: 'antddate',
          default: dayjs(),
          props: {
            placeholder: '请选择上架时间',
            showTime: {
              format: 'HH:mm',
            },
            // format: 'YYYY-MM-DD HH:mm',
          },
          hidden: '{{ formData.form5.groundType === 1 || formData.form5.groundType === 3 }}',
        },
      },
    },
  },
});
