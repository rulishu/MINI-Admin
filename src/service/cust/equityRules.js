import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/app/member/power/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};
export const add = '/jcgl-mall/admin/member/power/create';

// export const edit = '/jcgl-mall/admin/member/power/update';
// export const del = '/jcgl-mall/admin/member/power/delete';

export const edit = async (params) => {
  return request('/jcgl-mall/admin/member/power/update', {
    method: 'PUT',
    data: params,
  });
};
export const del = async (params) => {
  return request(`/jcgl-mall/admin/member/power/delete?id=${params}`, {
    method: 'Delete',
    data: params,
  });
};
