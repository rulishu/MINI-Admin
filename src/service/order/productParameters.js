import request from '@/utils/request';

export const selectPage = async (params) => {
  return request('/api/productParameters/selectPage', {
    method: 'POST',
    data: params,
  });
};
