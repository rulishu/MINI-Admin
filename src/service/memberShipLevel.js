import request from '@antdp/request';

// 查询
export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/member/type/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const add = '/jcgl-mall/admin/member/type/create';

export const edit = async (params) => {
  return request('/jcgl-mall/admin/member/type/update', {
    method: 'PUT',
    data: params,
  });
};
export const del = async (params) => {
  return request(`/jcgl-mall/admin/member/type/delete?id=${params}`, {
    method: 'Delete',
    data: params,
  });
};
