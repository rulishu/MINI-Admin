import { request } from '@umijs/max'


export const selectPage = async (params) => {
  return request('/api/selectPage', {
    method: 'POST',
    data: params,
  });
};