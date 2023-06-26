import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/product/evaluation/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const update = async (body) => {
  return request(
    `/jcgl-mall/admin/product/evaluation/update/show
      `,
    {
      method: 'POST',
      data: body,
    },
  );
};
