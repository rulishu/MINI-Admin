import request from '@antdp/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/order/info/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const details = async (params) => {
  return request(`/jcgl-mall/admin/order/info/details?id=${params}`, {
    method: 'GET',
    data: params,
  });
};
