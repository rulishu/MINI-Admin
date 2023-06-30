import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/coupon/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

// 新增
export async function createCoupon(params) {
  return request('/jcgl-mall/admin/coupon/create', {
    method: 'POST',
    data: params,
  });
}
export async function getDetails(params) {
  return request(`/jcgl-mall/admin/coupon/details?id=${params}`, {
    method: 'GET',
  });
}

export const updateCoupon = async (body) => {
  return request(`/jcgl-mall/admin/coupon/update`, {
    method: 'PUT',
    data: body,
  });
};
export const updateCouponStatus = async (body) => {
  return request(`/jcgl-mall/admin/coupon/invalid?type=${body?.type}&id=${body?.id}`, {
    method: 'PUT',
    // data: body,
    requestType: 'form',
  });
};
export const deleteCoupon = async ({ id }) => {
  return request(`/jcgl-mall/admin/coupon/delete?id=${id}`, {
    method: 'DELETE',
  });
};
