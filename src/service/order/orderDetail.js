import request from '@/utils/request';

// 详情-获取包裹信息
export const getInfoPushList = async ({ id }) => {
  return request(`/jcgl-mall/admin/order/logistics/select/list?id=${id}`, {
    method: 'GET',
  });
};

// 详情
export const selectById = async (body) => {
  return request(`/jcgl-mall/admin/order/info/selectPrimaryKey`, {
    method: 'POST',
    data: body,
  });
};

// 详情编辑
export const update = async (body) => {
  return request(`/jcgl-mall/admin/order/info/update`, {
    method: 'PUT',
    data: body,
  });
};
