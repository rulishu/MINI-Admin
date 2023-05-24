import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  //商品列表
  return request(
    `/jcgl-user/admin/user/suppliers/select/page/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const selectById = async ({ id }) => {
  return request(`/jcgl-user/admin/user/suppliers/details?id=${id}`, {
    method: 'GET',
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-user/admin/user/suppliers/delete?id=${id}`, {
    method: 'GET',
  });
};

export const create = async (body) => {
  return request(`/jcgl-user/admin/user/suppliers/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-user/admin/user/suppliers/update`, {
    method: 'POST',
    data: body,
  });
};

export const getProductSelector = async (body) => {
  return request(`/jcgl-user/admin/user/suppliers/update`, {
    method: 'POST',
    data: body,
  });
};

export const getUserList = async () => {
  return request(`/jcgl-user/admin/user/suppliers/product/all`, {
    method: 'POST',
  });
};

export const getAllSuppliers = async () => {
  return request(`/jcgl-user/admin/user/suppliers/select/all`, {
    method: 'POST',
  });
};

export const getProductUserList = async (body) => {
  return request(`/jcgl-user/admin/user/select/list`, {
    method: 'POST',
    data: body,
  });
};
