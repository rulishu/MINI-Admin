import { request } from '@umijs/max';
import { message } from 'antd';

export const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const checkedCode = (status) => {
  if (status === 400) {
    message.error(codeMessage[400]);
  } else if (status === 401) {
    message.error(codeMessage[401]);
  } else if (status === 403) {
    message.error(codeMessage[403]);
  } else if (status === 404) {
    message.error(codeMessage[404]);
  } else if (status === 406) {
    message.error(codeMessage[406]);
  } else if (status === 410) {
    message.error(codeMessage[410]);
  } else if (status === 422) {
    message.error(codeMessage[422]);
  } else if (status === 500) {
    message.error(codeMessage[500]);
  } else if (status === 502) {
    message.error(codeMessage[502]);
  } else if (status === 503) {
    message.error(codeMessage[503]);
  } else if (status === 504) {
    message.error(codeMessage[504]);
  }
};

// 运行时配置
export default (url, options) =>
  request(url, {
    skipErrorHandler: true,
    getResponse: false,
    requestInterceptors: [
      (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
          //如果有token 就走token逻辑
          config.headers = {
            Authorization: `Bearer ${token}`,
            ...config.headers,
          };
        }
        return config;
      },
    ],
    responseInterceptors: [
      async (response) => {
        console.log('response', response);
        if (response && response?.status) {
          checkedCode(response.status);
        }
        return response;
      },
    ],
    ...options,
  });
