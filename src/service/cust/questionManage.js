import request from '@/utils/request';
export const selectPage = async (params) => {
  return request('/api/cust/questionManage', {
    method: 'POST',
    data: params,
  });
};
export const deleteQ = async (params) => {
  return request('/api/cust/delete', {
    method: 'POST',
    data: params,
  });
};
