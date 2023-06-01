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
  return request(`/jcgl-mall/admin/marketing/category/delete`, {
    method: 'DELETE',
    data: params,
    // requestType: 'json',
  });
}

export async function moveMarket(params) {
  return request('/jcgl-mall/admin/marketing/category/moveCategory', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}

// 更新类目

export async function updateMarket(params) {
  return request('/jcgl-mall/admin/marketing/category/update', {
    method: 'PUT',
    data: params,
    // requestType: 'json',
  });
}

// 查强绑商品
export async function selectMarket(params) {
  const { current, pageSize, ...others } = params;
  return request(
    `/jcgl-mall/admin/marketing/category/selectList?pageSize=${pageSize}&pageNum=${current}`,
    {
      method: 'POST',
      data: others,
      requestType: 'json',
    },
  );
}

// 强绑
export async function addGoods(params) {
  return request('/jcgl-mall/admin/marketing/relation/create', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}

export async function deleteGoods(params) {
  return request('/jcgl-mall/admin/marketing/relation/delete', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}

export async function updateGoodsSort(params) {
  return request('/jcgl-mall/admin/marketing/relation/update', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}
