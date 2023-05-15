import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/sell/select/page/admin/error?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};
