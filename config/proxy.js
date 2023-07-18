/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/jcgl-mall/': {
      target: 'http://192.168.188.189:8888',
      // target: 'http://192.168.188.84:8888/', //邹思远
      // target: 'http://192.168.10.178:8888/',// 黄来平
      // target: 'http://192.168.188.84:8888/', // 安江峰
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
    '/jcgl-user/': {
      target: 'http://192.168.188.189:8888',
      // target: 'http://192.168.188.84:8888',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'https://preview.pro.ant.design',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
