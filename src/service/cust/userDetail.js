import request from '@/utils/request';

export const selectByFans = async ({ pageSize, pageNum, ...others }) => {
  return request(
    `/jcgl-user/admin/buyer/manage/selectFansPage?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: others,
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
