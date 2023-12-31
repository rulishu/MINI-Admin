import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(`/jcgl-user/admin/agent/select?pageSize=${pageSize}&pageNum=${pageNum}`, {
    method: 'POST',
    data: body,
  });
};

export const create = async (body) => {
  return request(`/jcgl-user/admin/agent/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-user/admin/agent/update`, {
    method: 'PUT',
    data: body,
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-user/admin/agent/remove?id=${id}`, {
    method: 'DELETE',
  });
};

export const getUserList = async (body) => {
  return request(`/jcgl-user/admin/user/select/list`, {
    method: 'POST',
    data: body,
  });
};
