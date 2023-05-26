import request from '@/utils/request';

export const selectPage = async ({ pageSize, pageNum, ...body }) => {
  return request(
    `/jcgl-mall/admin/web/config/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const create = async (body) => {
  return request(`/jcgl-mall/admin/web/config/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-mall/admin/web/config/update`, {
    method: 'PUT',
    data: body,
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-mall/admin/web/config/delete?id=${id}`, {
    method: 'DELETE',
  });
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-mall/admin/web/config/details?id=${id}`, {
    method: 'GET',
  });
};
