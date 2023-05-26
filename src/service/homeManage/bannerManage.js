import request from '@/utils/request';

export const selectPage = async (body) => {
  return request(`/jcgl-mall/admin/banner/select/all`, {
    method: 'POST',
    data: body,
  });
};

export const create = async (body) => {
  return request(`/jcgl-mall/admin/banner/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-mall/admin/banner/update`, {
    method: 'PUT',
    data: body,
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-mall/admin/banner/delete?id=${id}`, {
    method: 'DELETE',
  });
};
