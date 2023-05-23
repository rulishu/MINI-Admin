// eslint-disable-next-line no-unused-vars
export const schema = ({ queryInfo, province }) => {
  return {
    type: 'object',
    properties: {
      form1: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '基础信息',
        properties: {
          supplierName: {
            title: '供应商名称',
            type: 'string',
            required: true,
            placeholder: '请输入供应商名称',
          },
          creditCode: {
            title: '统一社会信用代码',
            type: 'string',
            placeholder: '请输入供应商统一社会信用代码',
          },
          regCapital: {
            title: '注册资本',
            type: 'string',
            placeholder: '请输入注册资本',
          },
          regTime: {
            title: '注册时间',
            type: 'string',
            widget: 'datePicker',
            placeholder: '请选择营业执照注册时间',
          },
          regAddress: {
            title: '注册地址',
            type: 'string',
            placeholder: '请输入注册地址',
          },
          // province: {
          //   title: '省市区',
          //   type: 'array',
          //   required: true,
          //   widget: 'cascader',
          //   props: {
          //     options: province.options,
          //     allowClear: true,
          //   },
          // },
          // address: {
          //   title: '详细地址',
          //   type: 'string',
          //   required: true,
          // },
          contactName: {
            title: '联系人姓名',
            type: 'string',
            required: true,
            placeholder: '请输入联系人姓名',
          },
          contactPhone: {
            title: '联系方式',
            type: 'string',
            required: true,
            rules: [{ pattern: '^1[0-9]{10}$', message: '请输入正确手机号' }],
            placeholder: '请输入联系方式',
          },
        },
      },
      form2: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '法定代表人信息',
        properties: {
          legalFrontUrl: {
            title: '身份证图片正面',
            type: 'array',
            widget: 'upload',
            required: true,
            props: {
              listType: 'picture-card',
              warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
              accept: '.jpg,.png,.jpeg',
            },
          },
          legalBackUrl: {
            title: '身份证图片反面',
            type: 'array',
            widget: 'upload',
            required: true,
            props: {
              listType: 'picture-card',
              warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
              accept: '.jpg,.png,.jpeg',
            },
          },
        },
      },
      form3: {
        type: 'object',
        column: 1,
        widget: 'lineTitle',
        title: '营业资质信息',
        properties: {
          contractUrl: {
            title: '供应商合同',
            type: 'array',
            widget: 'upload',
            required: true,
            props: {
              listType: 'picture-card',
              maxCount: 20,
              warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
              accept: '.jpg,.png,.jpeg',
            },
          },
          licenseUrl: {
            title: '营业执照',
            type: 'array',
            widget: 'upload',
            required: true,
            props: {
              listType: 'picture-card',
              warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
              accept: '.jpg,.png,.jpeg',
            },
          },
          otherUrl: {
            title: '其它经营许可证',
            type: 'array',
            widget: 'upload',
            props: {
              listType: 'picture-card',
              maxCount: 20,
              warn: '图片支持PNG、JPG、JPEG格式，大小不超过5MB',
              accept: '.jpg,.png,.jpeg',
            },
          },
        },
      },
      form4: {
        type: 'object',
        column: 1,
        widget: 'lineTitle',
        title: '推荐人',
        properties: {
          productId: {
            title: '推荐人账号',
            type: 'object',
            widget: 'selectUser',
            required: true,
          },
        },
      },
    },
  };
};
