import request from '@/utils/request';

export const selectPage = async (params) => {
  return request('/api/selectPointsPage', {
    method: 'POST',
    data: params,
  });
};
