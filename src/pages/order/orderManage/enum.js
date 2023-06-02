export const orderStatusEnum = {
  [-1]: {
    text: '订单已取消',
    status: 'error',
  },
  [-2]: {
    text: '订单关闭',
    status: 'error',
  },
  0: {
    text: '待定价',
    status: 'default',
  },
  1: {
    text: '待付款',
    status: 'default',
  },
  2: {
    text: '备货中',
    status: 'warning',
  },
  3: {
    text: '待收货',
    status: 'processing',
  },
  4: {
    text: '已完成',
    status: 'success',
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

export const afterSaleStatusEnum = {
  0: {
    text: '未售后',
    status: 'default',
  },
  1: {
    text: '售后中',
    status: 'processing',
  },
  2: {
    text: '已完成',
    status: 'success',
  },
};

export const payEnum = {
  1: {
    text: '微信',
  },
  2: {
    text: '支付宝',
  },
  3: {
    text: '银行卡',
  },
};

export const shipmentsStatusEnum = {
  0: {
    text: '未发货',
    status: 'default',
  },
  1: {
    text: '部分发货',
    status: 'processing',
  },
  2: {
    text: '已发货',
    status: 'success',
  },
};
