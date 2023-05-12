import request from '@antdp/request';

export const selectSellPage = async ({ pageNum, pageSize, ...body }) => {
  //商品列表
  return request(
    `/jcgl-mall/admin/item/info/select/page/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const deleteProduct = async (body) => {
  //商品删除
  return request(`/jcgl-mall/admin/item/info/delete`, {
    method: 'DELETE',
    data: body,
  });
};

export const added = async (body) => {
  //商品上架
  return request(`/jcgl-mall/admin/item/info/added`, {
    method: 'POST',
    data: body,
  });
};

export const takeDown = async (body) => {
  //商品下架
  return request(`/jcgl-mall/admin/item/info/off/shelf`, {
    method: 'PUT',
    data: body,
  });
};
