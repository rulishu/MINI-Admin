import request from '@antdp/request';

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

export const getTreeList = async () => {
  return request(`/jcgl-user/area/query/treeList`, {
    method: 'GET',
  });
};

export const getUserList = async (body) => {
  return request(`/jcgl-user/admin/user/select/page/list?pageNum=1&pageSize=20`, {
    method: 'POST',
    data: body,
  });
};
