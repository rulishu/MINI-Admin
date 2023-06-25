export const basicSchema = ({ options }) => {
  return {
    type: 'object',
    column: 2,
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
        widget: 'comupload',
        props: {
          accept: '.jpg,.png,.jpeg',
        },
        required: true,
        rules: [{ required: true, message: '请上传图片' }],
      },
    },
  };
};
