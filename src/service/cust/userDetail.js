import request from '@/utils/request';

export const selectById = async ({ id }) => {
  return request(`/jcgl-user//admin/buyer/manage/buyer/info?id=${id}`, {
    method: 'GET',
  });
};
