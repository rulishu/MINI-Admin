import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/activity/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const updateStatus = async (body) => {
  return request(`/jcgl-mall/admin/activity/update/up/status`, {
    method: 'PUT',
    data: body,
  });
};

export const create = async (body) => {
  return request(`/jcgl-mall/admin/activity/create`, {
    method: 'POST',
    data: body,
  });
};

export const details = async ({ id }) => {
  return request(`/jcgl-mall/admin/activity/details?id=${id}`, {
    method: 'GET',
  });
};

export const deleteItems = async ({ id }) => {
  return request(`/jcgl-mall/admin/activity/delete?id=${id}`, {
    method: 'DELETE',
  });
};
