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

//
export const selectPageList = async (params) => {
  const { page, pageSize, ...others } = params;
  return request(
    `/jcgl-mall/admin/freight/template/select/select/list?pageSize=${pageSize}&pageNum=${page}`,
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
    // requestType: 'json',
  });
}

export async function updateTemplate(params) {
  return request(`/jcgl-mall/admin/freight/template/update`, {
    method: 'PUT',
    data: params,
    // requestType: 'json',
  });
}
