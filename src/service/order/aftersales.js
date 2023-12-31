import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/after/service/record/select/new/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

// export const details = async (params) => {
//   return request(`/jcgl-mall/admin/sell/details?id=${params}`, {
//     method: 'GET',
//     data: params,
//   });
// };

// export const all = async (params) => {
//   return request('/jcgl-mall/admin/sell/select/all', {
//     method: 'GET',
//     data: params,
//   });
// };

export const updateOrderGoodsStatus = async (params) => {
  return request('/jcgl-mall/admin/after/service/record/update', {
    method: 'PUT',
    data: params,
  });
};

export const refundApply = async (body) => {
  return request(`/jcgl-mall/admin/after/service/record/refund`, {
    method: 'PUT',
    data: body,
  });
};

// 获取
export const getAfterSaleAcount = async () => {
  return request('/jcgl-mall/admin/after/service/record/select/after/sale/acount', {
    method: 'GET',
  });
};

// // 发货
// export const pushItems = async (body) => {
//   return request(`/jcgl-mall/admin/order/logistics/create`, {
//     method: 'POST',
//     data: body,
//   });
// };

// // 详情-获取包裹信息
// export const getInfoPushList = async ({ id }) => {
//   return request(`/jcgl-mall/admin/order/logistics/select/list?id=${id}`, {
//     method: 'GET',
//   });
// };
