import request from '@/utils/request';

export const queryUserDsConfig = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/queryAgentDsConfig`, {
    method: 'POST',
    data: body,
  });
};

export const edit = async (body) => {
  return request(`/jcgl-mall/admin/ds/config/batchUpdateAgentDsConfig`, {
    method: 'PUT',
    data: body,
  });
};
