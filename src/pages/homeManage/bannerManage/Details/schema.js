export const basicSchema = ({ queryInfo }) => {
  return {
    type: 'object',
    column: 2,
    properties: {
      form1: {
        type: 'object',
        column: 2,
        widget: 'lineTitle',
        title: queryInfo.type === '1' ? '首页Banner' : '首页活动',
        properties: {
          name: {
            title: '活动名称',
            type: 'string',
            props: {
              maxLength: 20,
            },
            required: true,
          },
          TAG: {
            title: 'TAG',
            type: 'string',
            widget: 'select',
            props: {
              options: [],
            },
          },
          jumpPath: {
            title: 'URL',
            type: 'string',
          },
          createTime: {
            title: '上架时间',
            type: 'range',
            widget: 'dateRange',
            props: {
              showTime: true,
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
