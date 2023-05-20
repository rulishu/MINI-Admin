import request from '@antdp/request';

export const getTreeList = async () => {
  return request(`/jcgl-user/area/query/treeList`, {
    method: 'GET',
  });
};
