import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/member/info/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
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
