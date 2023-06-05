import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(`/jcgl-user/admin/agent/area/select?pageSize=${pageSize}&pageNum=${pageNum}`, {
    method: 'POST',
    data: body,
  });
};

// 查询代理商
export const selectByAgentCompany = async () => {
  return request(`/jcgl-user/admin/agent/select/agent/available`, {
    method: 'POST',
  });
};

// 查询代理地盘
export const selectByAgentArea = async (body) => {
  return request(`/jcgl-user/admin/agent/select/area/agent`, {
    method: 'POST',
    data: body,
  });
};

export const create = async (body) => {
  return request(`/jcgl-user/admin/agent/area/create`, {
    method: 'POST',
    data: body,
  });
};

export const updateInfo = async (body) => {
  return request(`/jcgl-user/admin/agent/area/update`, {
    method: 'PUT',
    data: body,
  });
};

export const deleteItem = async ({ id }) => {
  return request(`/jcgl-user/admin/agent/area/remove?id=${id}`, {
    method: 'DELETE',
  });
};

// 上传视频
export const uploadVideos = async (body) => {
  return request(`/jcgl-user/admin/agent/uploadVideos`, {
    method: 'PUT',
    data: body,
  });
};
