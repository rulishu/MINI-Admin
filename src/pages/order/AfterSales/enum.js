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
  1: '仅退款',
  2: '退货退款',
};

export const orderStatusEnums = {
  0: '待定价',
  1: '待付款',
  2: '待发货', // 未发货 = 待发货
  3: '已发货', // 已发货 = 待收货
  4: '已完成',
  [-2]: '已取消',
  6: '已退款',
  7: '待评价',
};

export const afterSaleEnums = {
  1: '未发货仅退款',
  2: '已发货退货退款',
  3: '已发货仅退款',
};

export const detailStatusEnums = {
  [-1]: '待审核',
  1: '退款中',
  2: '待买家退货',
  3: '待平台收货',
  4: '已拒绝售后',
  5: '收货后平台拒绝',
  6: '已取消',
  7: '已退款',
};
