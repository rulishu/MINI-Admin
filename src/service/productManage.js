import request from '@/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/item/info/audit/sell/page?pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'POST',
      data: body,
    },
  );
};
