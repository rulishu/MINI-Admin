import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/order/info/select/page/order/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const details = async (params) => {
  return request(`/jcgl-mall/admin/sell/details?id=${params}`, {
    method: 'GET',
    data: params,
  });
};

export const all = async (params) => {
  return request('/jcgl-mall/admin/sell/select/all', {
    method: 'GET',
    data: params,
  });
};

export const odd = async (params) => {
  return request('/jcgl-mall/admin/sell/update/odd', {
    method: 'PUT',
    data: params,
  });
};

// 获取供应商
export const getSuppliersList = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-user/admin/user/suppliers/select/page/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

// 获取用户啊列表
export const getUserList = async (body) => {
  return request(`/jcgl-user/admin/user/select/list`, {
    method: 'POST',
    data: body,
  });
};
