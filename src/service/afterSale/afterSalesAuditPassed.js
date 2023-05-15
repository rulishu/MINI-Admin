import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/after/service/audit/record/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-mall/admin/after/service/audit/record/details?id=${id}`, {
    method: 'GET',
  });
};

// 退款详情
export const selectByRefund = async ({ id }) => {
  return request(`/jcgl-mall/admin/after/service/audit/record/refund/${id}`, {
    method: 'GET',
  });
};

// 退款

export const refund = async (body) => {
  return request(`/jcgl-mall/admin/after/service/audit/record/refundApply`, {
    method: 'POST',
    data: body,
  });
};
