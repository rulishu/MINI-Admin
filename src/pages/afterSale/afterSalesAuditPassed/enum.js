export const refundStatusEnum = {
  0: {
    text: '退款失败',
    status: 'Error',
  },
  1: {
    text: '退款中',
    status: 'Processing',
  },
  2: {
    text: '退款成功',
    status: 'Success',
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

export const auditStatusEnum = {
  0: {
    text: '待审核',
    status: 'Default',
  },
  1: {
    text: '审核通过',
    status: 'Success',
  },
  2: {
    text: '审核拒绝',
    status: 'Error',
  },
};
