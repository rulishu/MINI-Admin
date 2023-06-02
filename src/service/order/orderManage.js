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

export const getLogisticsCompany = async (params) => {
  return request('/jcgl-mall/admin/sell/select/all', {
    method: 'GET',
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

// 获取发货商品列表
export const getPushItems = async ({ orderId }) => {
  return request(`/jcgl-mall/admin/order/logistics/select/items?id=${orderId}`, {
    method: 'GET',
  });
};

// 发货
export const pushItems = async (body) => {
  return request(`/jcgl-mall/admin/order/logistics/create`, {
    method: 'POST',
    data: body,
  });
};

// 详情-获取包裹信息
export const getInfoPushList = async ({ id }) => {
  return request(`/jcgl-mall/admin/order/logistics/select/list?id=${id}`, {
    method: 'GET',
  });
};
