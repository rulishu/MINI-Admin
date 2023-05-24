import request from '@/utils/request';

export const queryUserDsConfig = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/queryOne`, {
    method: 'POST',
    data: body,
  });
};

export const edit = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/updateHead`, {
    method: 'PUT',
    data: body,
  });
};
