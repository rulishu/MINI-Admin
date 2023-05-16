import { Avatar, Space } from 'antd';

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
    form3: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '推荐人信息',
      properties: {
        reference: {
          title: '推荐人',
          type: 'string',
          widget: 'select',
          required: true,
          props: {
            options: [
              {
                label: (
                  <Space>
                    <Avatar
                      src={'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'}
                      size="small"
                    />
                    张三 13761578901
                  </Space>
                ),
                value: '1',
              },
            ],
          },
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
          props: {
            listType: 'picture-card',
          },
        },
        businessLicense: {
          title: '营业执照',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        identityCard: {
          title: '法人身份证正面',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        identityCard2: {
          title: '法人身份证反面',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        foodProductioLicense: {
          title: '食品生产许可证',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        foodBusinessLicense: {
          title: '食品经营许可证',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        certificates: {
          title: '行业颁发证书',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        testReport: {
          title: '检测报告',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
        promotionMaterials: {
          title: '品宣资料',
          type: 'array',
          widget: 'upload',
          required: true,
          props: {
            listType: 'picture-card',
          },
        },
      },
    },
  },
};
