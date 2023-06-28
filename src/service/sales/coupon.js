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
