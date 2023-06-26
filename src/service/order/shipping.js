import request from '@/utils/request';
export const selectPage = async (params) => {
  return request('/api/cust/questionManage', {
    method: 'POST',
    data: params,
  });
};
export const deleteQ = async (params) => {
  return request('/api/cust/delete', {
    method: 'POST',
    data: params,
  });
};
// 获取发货商品列表
export const getPushItems = async ({ orderId }) => {
  return request(`/jcgl-mall/admin/order/logistics/select/items?id=${orderId}`, {
    method: 'GET',
  });
};

//
export const selectPageList = async (params) => {
  const { page, pageSize, ...others } = params;
  return request(
    `/jcgl-mall/admin/freight/template/select/page/list?pageSize=${pageSize}&pageNum=${page}`,
    {
      method: 'POST',
      data: others,
    },
  );
};
// 新增
export async function addTemplate(params) {
  return request('/jcgl-mall/admin/freight/template/create', {
    method: 'POST',
    data: params,
  });
}
export async function getDetails(params) {
  return request(`/jcgl-mall/admin/freight/template/details?id=${params}`, {
    method: 'GET',
  });
}
export async function updateTemplate(params) {
  return request(`/jcgl-mall/admin/freight/template/update`, {
    method: 'PUT',
    data: params,
    // requestType: 'json',
  });
}
export const deleteItem = async ({ id }) => {
  return request(`/jcgl-mall/admin/freight/template/delete?id=${id}`, {
    method: 'DELETE',
  });
};
