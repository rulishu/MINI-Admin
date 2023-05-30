import request from '@/utils/request';

export const getTreeList = async () => {
  return request(`/jcgl-user/area/query/treeList`, {
    method: 'GET',
  });
};

export const getEnums = async (body) => {
  return request(`/jcgl-user/admin/user/dict/select/all`, {
    method: 'POST',
    data: body,
  });
};
