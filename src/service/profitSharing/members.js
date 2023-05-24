import request from '@/utils/request';

export const queryUserDsConfig = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/queryUserDsConfig`, {
    method: 'POST',
    data: body,
  });
};

export const edit = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/batchUpdateUserDsConfig`, {
    method: 'PUT',
    data: body,
  });
};
