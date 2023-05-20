import config from '@antdp/config';
import proxy from './proxy';
import router from './router.json';
export default config(router, {
  proxy,
  npmClient: 'npm',
  define: {
    // 是否显示 左侧菜单
    // ANTD_MENU_IS_SHOW: false,
    // 是否显示 head头部
    // ANTD_HEAD_IS_SHOW: false,
    // 是否展示tab栏
    ANTD_IS_TABS: true,
    // 是否展示面包屑
    ANTD_IS_BREADCRUMB: false,
    // ANTD_MENU_TOP_LEFT: true,
    ANTD_TITLE_TOP: true,
    /** 是否展示搜索菜单  */
    ANTD_MENU_SEARCH_IS_SHOW: true,
  },
  dva: {},
  model: {},
  request: {},
  reactQuery: {
    // 是否开启 react query 官方 devtool 工具
    devtool: false,
    queryClient: true,
  },
});
