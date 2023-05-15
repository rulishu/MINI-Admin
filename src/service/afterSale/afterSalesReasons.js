import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/after/service/reason/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-mall/admin/after/service/reason/details?id=${id}`, {
    method: 'GET',
  });
};

export const create = async (body) => {
  return request(`/jcgl-mall/admin/after/service/reason/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-mall/admin/after/service/reason/update`, {
    method: 'PUT',
    data: body,
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-mall//admin/after/service/reason/delete?id=${id}`, {
    method: 'DELETE',
  });
};
