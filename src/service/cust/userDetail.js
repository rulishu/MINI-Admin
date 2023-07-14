import request from '@/utils/request';

export const selectById = async ({ pageSize, pageNum, params }) => {
  console.log('params: ', params);
  return request(
    `/jcgl-user/admin/buyer/manage/selectFansPage?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: params,
    },
  );
};

export const info = async ({ id }) => {
  return request(`/jcgl-user/admin/buyer/manage/buyer/info?id=${id}`, {
    method: 'GET',
  });
};

export const edit = async (params) => {
  return request(`/jcgl-user/admin/user/update/user`, {
    method: 'POST',
    data: params,
  });
};
