import request from '@/utils/request';

export const selectPage = async ({ pageNum, pageSize, ...body }) => {
  return request(
    `/jcgl-mall/admin/activity/select/page/list?pageSize=${pageSize}&pageNum=${pageNum}`,
    {
      method: 'POST',
      data: body,
    },
  );
};

export const updateStatus = async (body) => {
  return request(`/jcgl-mall/admin/activity/update/up/status`, {
    method: 'PUT',
    data: body,
  });
};
