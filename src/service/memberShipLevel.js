import request from '@antdp/request';

// 查询
export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/member/type/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const add = '/jcgl-mall/admin/member/type/create';
