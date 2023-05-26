export const basicItems = ({ type }) => {
  return [
    {
      title: '页面名称',
      key: 'title',
      editable: () => type === 'add',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '页面类型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '小程序',
        },
        2: {
          text: 'app',
        },
      },
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: {
          text: '启用',
          status: 'Success',
        },
        0: {
          text: '停用',
          status: 'Error',
        },
      },
    },
  ];
};

export const basicSchema = ({ hide }) => {
  return {
    type: 'object',
    column: 2,
    properties: {
      form1: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '轮播图配置',
        hidden: hide !== 1,
        properties: {
          bannerList: {
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
                    ],
                  },
                  defaultValue: 1,
                  required: true,
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
      form2: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: '活动图配置',
        hidden: hide !== 2,
        properties: {
          activityList: {
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
                    ],
                  },
                  defaultValue: 2,
                  required: true,
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
      // form3: {
      //   type: 'object',
      //   column: 2,
      //   widget: 'lineTitle',
      //   title: '分组配置',
      //   hidden: queryInfo.type !== 3,
      //   properties: {
      //     options: {
      //       type: 'array',
      //       widget: 'cardList',
      //       items: {
      //         type: 'object',
      //         properties: {
      //           tabName: {
      //             title: '分组名称',
      //             type: 'string',
      //             required: true,
      //           },
      //           type: {
      //             title: '文件类型',
      //             type: 'number',
      //             widget: 'select',
      //             disabled: true,
      //             props: {
      //               options: [
      //                 { label: '轮播图配置', value: 1 },
      //                 { label: '活动图配置', value: 2 },
      //                 { label: '分组配置', value: 3 },
      //               ],
      //             },
      //             defaultValue: 3,
      //             required: true,
      //           },
      //           action: {
      //             title: '分组接口',
      //             type: 'string',
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
    },
  };
};
