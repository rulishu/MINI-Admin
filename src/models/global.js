const getToken = () => sessionStorage.getItem('token');
export default {
  namespace: 'global',
  state: {
    token: getToken(),
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  effects: {},
};
