export const basicSchema = ({ queryInfo, options }) => {
  return {
    type: 'object',
    column: 2,
    properties: {
      form1: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: queryInfo.type === 1 ? '首页Banner' : '首页活动',
        properties: {
          name: {
            title: '活动名称',
            type: 'string',
            props: {
              maxLength: 20,
            },
            required: true,
          },
          category: {
            title: '类型',
            type: 'number',
            widget: 'select',
            disabled: true,
            props: {
              options: [
                { label: '小程序', value: 1 },
                { label: 'app', value: 2 },
              ],
            },
            required: true,
            defaultValue: 1,
          },
          sort: {
            title: '排序',
            type: 'number',
            required: true,
            props: {
              min: 0,
              step: 1,
            },
          },
          linkMenuTag: {
            title: 'TAG',
            type: 'string',
            widget: 'select',
            props: {
              options: options,
            },
          },
          jumpPath: {
            title: 'URL',
            type: 'string',
          },
          showStartTime: {
            title: '上架时间',
            type: 'range',
            widget: 'dateRange',
            props: {
              showTime: true,
              format: 'YYYY-MM-DD HH:mm:ss',
            },
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
  };
};
