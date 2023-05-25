export const basicSchema = {
  type: 'object',
  column: 2,
  properties: {
    form: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '基础信息',
      properties: {
        name: {
          title: '页面名称',
          type: 'string',
          required: true,
        },
        category: {
          title: '类别',
          type: 'number',
          widget: 'select',
          props: {
            options: [
              { label: '小程序', value: '1' },
              { label: 'app', value: '2' },
            ],
          },
          required: true,
          defaultValue: '1',
        },
      },
    },
  },
};

export const bannerSchema = {
  type: 'object',
  column: 2,
  properties: {
    form: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '轮播图配置',
      properties: {
        options: {
          type: 'array',
          widget: 'cardList',
          items: {
            type: 'object',
            properties: {
              jumpPath: {
                title: '链接地址',
                type: 'string',
                required: true,
              },
              type: {
                title: '文件类型',
                type: 'number',
                widget: 'select',
                disabled: true,
                props: {
                  options: [
                    { label: '轮播图配置', value: '1' },
                    { label: '活动图配置', value: '2' },
                    { label: '分组配置', value: '3' },
                  ],
                },
                required: true,
                defaultValue: '1',
              },
              path: {
                span: 24,
                title: '图片',
                type: 'array',
                widget: 'upload',
                props: {
                  accept: '.jpg,.png,.jpeg',
                },
                required: true,
              },
            },
          },
        },
      },
    },
  },
};

export const activiteSchema = {
  type: 'object',
  column: 2,
  properties: {
    form: {
      type: 'object',
      column: 2,
      properties: {
        options: {
          type: 'array',
          widget: 'cardList',
          items: {
            type: 'object',
            properties: {
              jumpPath: {
                title: '链接地址',
                type: 'string',
                required: true,
              },
              type: {
                title: '文件类型',
                type: 'number',
                widget: 'select',
                disabled: true,
                props: {
                  options: [
                    { label: '轮播图配置', value: 1 },
                    { label: '活动图配置', value: 2 },
                    { label: '分组配置', value: 2 },
                  ],
                },
                required: true,
                defaultValue: 2,
              },
              path: {
                span: 24,
                title: '图片',
                type: 'array',
                widget: 'upload',
                props: {
                  accept: '.jpg,.png,.jpeg',
                },
                required: true,
              },
            },
          },
        },
      },
    },
  },
};

export const tabsSchema = {
  type: 'object',
  column: 2,
  properties: {
    form: {
      type: 'object',
      column: 2,
      widget: 'lineTitle',
      title: '分组配置',
      properties: {
        options: {
          type: 'array',
          widget: 'cardList',
          items: {
            type: 'object',
            properties: {
              type: {
                title: '文件类型',
                type: 'number',
                widget: 'select',
                disabled: true,
                props: {
                  options: [
                    { label: '轮播图配置', value: 1 },
                    { label: '活动配置', value: 2 },
                    { label: '分组配置', value: 2 },
                  ],
                },
                required: true,
                defaultValue: 3,
              },
              tabName: {
                title: '分组名称',
                type: 'string',
                required: true,
              },
              action: {
                title: '分组接口',
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
