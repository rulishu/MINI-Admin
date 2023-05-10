export default {
  type: 'object',
  properties: {
    input: {
      title: '小店名称',
      type: 'string',
      required: true,
      props: {
        max: 50,
      },
    },
    input2: {
      title: '小店ID',
      type: 'string',
      required: true,
    },
    input3: {
      title: '小店Secret',
      type: 'string',
      required: true,
    },
    input4: {
      title: '原始ID',
      type: 'string',
      required: true,
    },
  },
};
