import request from '@/utils/request';

export const selectPage = async (params) => {
  return request('/api/selectPage', {
    method: 'POST',
    data: params,
  });
};

export const selectById = '/api/selectById';

export const add = '/api/add';

export const edit = '/api/edit';
