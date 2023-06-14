import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-user/admin/buyer/manage/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-mall/admin/member/type/details?id=${id}`, {
    method: 'GET',
  });
};
