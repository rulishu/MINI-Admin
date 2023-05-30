import request from '@/utils/request';

// 营销类目树
export async function getMarketTree() {
  return request(`/jcgl-mall/admin/marketing/category/selectTree`, {
    method: 'POST',
    data: {},
    requestType: 'json',
  });
}

// /**
//  * 查询
//  */
// export async function getAllCategory() {
//   return request(`/jcgl-mall/admin/item/category/select/all`, {
//     method: 'GET',
//     // params: { ...params },
//     // requestType: 'json',
//   });
// }

// export async function getCategory(params) {
//   const { page, pageSize, ...others } = params;
//   return request(
//     `/jcgl-mall/admin/item/category/select/page/list?pageSize=${pageSize}&pageNum=${page}`,
//     {
//       method: 'POST',
//       data: others,
//       requestType: 'json',
//     },
//   );
// }

// 新增
export async function addMarket(params) {
  return request('/jcgl-mall/admin/marketing/category/create', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}

// export async function updateCategory(params) {
//   return request(`/jcgl-mall/admin/item/category/update`, {
//     method: 'PUT',
//     data: params,
//     // requestType: 'json',
//   });
// }

export async function deleteMarket(params) {
  return request(`/jcgl-mall/admin/marketing/category/delete?id=${params?.id}`, {
    method: 'DELETE',
    // data: params,
    // requestType: 'json',
  });
}
