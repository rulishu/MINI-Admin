import request from '@/utils/request';

export const queryOne = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/queryOne`, {
    method: 'POST',
    data: body,
  });
};

export const edit = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/update`, {
    method: 'PUT',
    data: body,
  });
};
