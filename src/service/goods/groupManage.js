import request from '@antdp/request';

/**
 * 查询
 */
export async function getAllCategory() {
  return request(`/jcgl-mall/admin/item/category/select/all`, {
    method: 'GET',
    // params: { ...params },
    // requestType: 'json',
  });
}

export async function getCategory(params) {
  const { page, pageSize, ...others } = params;
  return request(
    `/jcgl-mall/admin/item/category/select/page/list?pageSize=${pageSize}&pageNum=${page}`,
    {
      method: 'POST',
      data: others,
      requestType: 'json',
    },
  );
}

// 新增
export async function addCategory(params) {
  return request('/jcgl-mall/admin/item/category/create/terrace', {
    method: 'POST',
    data: params,
    // requestType: 'json',
  });
}

export async function updateCategory(params) {
  return request(`/jcgl-mall/admin/item/category/update`, {
    method: 'PUT',
    data: params,
    // requestType: 'json',
  });
}

export async function deleteCategory(params) {
  return request(`/jcgl-mall/admin/item/category/deleteBatch?id=${params?.id}`, {
    method: 'DELETE',
    // data: params,
    // requestType: 'json',
  });
}

export async function getCategoryTree() {
  return request(`/jcgl-mall/admin/create/item/category/select/tree`, {
    method: 'POST',
    data: {},
    requestType: 'json',
  });
}
