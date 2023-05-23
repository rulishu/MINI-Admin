import request from '@antdp/request';

export const selectPage = async (data) => {
  return request(`/jcgl-user/admin/buyer/manage/select/page/list`, {
    method: 'POST',
    data: data,
  });
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-mall/admin/member/type/details?id=${id}`, {
    method: 'GET',
  });
};
