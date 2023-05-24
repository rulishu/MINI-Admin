import request from '@/utils/request';

export async function queryDealerDsConfig(body) {
  return request(`/jcgl-mall/admin/ds/config/queryDealerDsConfig`, {
    method: 'POST',
    data: body,
  });
}

export async function updateDealerDsConfig(body) {
  return request(`/jcgl-mall/admin/ds/config/batchUpdateDealerDsConfig`, {
    method: 'PUT',
    data: body,
  });
}
