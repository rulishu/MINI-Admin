import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/sell/select/page/admin/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const details = async (params) => {
  return request(`/jcgl-mall/admin/sell/details?id=${params}`, {
    method: 'GET',
    data: params,
  });
};

export const all = async (params) => {
  return request('/jcgl-mall/admin/sell/select/all', {
    method: 'GET',
    data: params,
  });
};

export const odd = async (params) => {
  return request('/jcgl-mall/admin/sell/update/odd', {
    method: 'PUT',
    data: params,
  });
};
