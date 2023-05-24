import request from '@/utils/request';

export const selectPage = async (params) => {
  return request('/api/exchangeDetails/selectPage', {
    method: 'POST',
    data: params,
  });
};
