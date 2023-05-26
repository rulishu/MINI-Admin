export const orderStatusEnum = {
  [-1]: {
    text: '订单已取消',
  },
  [-2]: {
    text: '订单关闭',
  },
  0: {
    text: '待定价',
  },
  1: {
    text: '待付款',
  },
  2: {
    text: '备货中',
  },
  3: {
    text: '待收货',
  },
  4: {
    text: '已完成',
  },
};

export const isOpenInvoiceEnum = {
  0: {
    text: '未开票',
    status: 'Default',
  },
  1: {
    text: '待开票',
    status: 'Processing',
  },
  2: {
    text: '已开票',
    status: 'Success',
  },
};
