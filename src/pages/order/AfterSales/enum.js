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
    text: '个人',
  },
  2: {
    text: '企业',
  },
};

// 发货状态
export const shipmentEnums = {
  0: '未发货',
  1: '部分发货',
  2: '已发货',
};

export const afterStatusEnums = {
  [-1]: '待审核',
  0: '未售后',
  1: '审核通过',
  2: '审核拒绝',
  3: '退款中',
  4: '已完成',
  5: '已关闭',
};

export const afterServiceTypeEnums = {
  1: '退款',
  2: '退货退款',
};

export const orderStatusEnums = {
  1: '发货',
  2: '未发货',
};
