import request from '@/utils/request';

export const selectPage = async (params) => {
  return request('/api/selectEqutiyPage', {
    method: 'POST',
    data: params,
  });
};
