export const schema = {
  type: 'object',
  properties: {
    form1: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '基本信息',
      properties: {
        reason: {
          title: '供应商名称',
          type: 'string',
          required: true,
        },
        name: {
          title: '联系人',
          type: 'string',
          required: true,
        },
        phone: {
          title: '联系方式',
          type: 'string',
          required: true,
        },
        address: {
          title: '地址',
          type: 'string',
          required: true,
        },
        price: {
          title: '注册资本',
          type: 'number',
          props: {
            min: 0,
          },
          required: true,
        },
      },
    },
    form2: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '资料信息',
      properties: {
        contract: {
          title: '供应商合同',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        businessLicense: {
          title: '营业执照',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        id: {
          title: '法人身份证',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        identityCard: {
          title: '法人身份证',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        foodProductioLicense: {
          title: '食品生产许可证',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        foodBusinessLicense: {
          title: '食品经营许可证',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        certificates: {
          title: '行业颁发证书',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        testReport: {
          title: '检测报告',
          type: 'array',
          widget: 'upload',
          required: true,
        },
        promotionMaterials: {
          title: '品宣资料',
          type: 'array',
          widget: 'upload',
          required: true,
        },
      },
    },
  },
};
