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

// 新增商品
export const addItem = async (body) => {
  return request(`/jcgl-mall/admin/create/item`, {
    method: 'POST',
    data: body,
  });
};

// 编辑商品
export const updateItem = async (body) => {
  return request(`/jcgl-mall/admin/item/info/update`, {
    method: 'PUT',
    data: body,
  });
};

// 详情
export const details = async ({ id }) => {
  return request(`/jcgl-mall/admin/approval/item/details?id=${id}`, {
    method: 'GET',
  });
};

// 查询商品下的SKU列表
export const selectSKU = async (body) => {
  return request(`/jcgl-mall/admin/item/info/select/item/sku`, {
    method: 'POST',
    data: body,
  });
};

export const createSKU = async (body) => {
  return request(`/jcgl-mall/admin/item/info/create/item/sku`, {
    method: 'POST',
    data: body,
  });
};

export const updateSKU = async (body) => {
  return request(`/jcgl-mall/admin/item/info/update/item/sku`, {
    method: 'POST',
    data: body,
  });
};
