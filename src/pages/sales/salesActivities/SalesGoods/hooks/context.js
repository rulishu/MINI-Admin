import { createContext, useReducer } from 'react';

export const initialState = ({ value }) => {
  return {
    dataSource: value,
    visible: false,
    // 设置规格优惠
    setVisible: false,
    setRecord: {},
  };
};

const Context = createContext({
  state: initialState,
  dispatch: () => null,
});

const reducer = (state, action) => {
  return {
    ...state,
    ...action,
  };
};

const Provider = ({ defaultProps, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState({ value: defaultProps.value }));
  return (
    <Context.Provider value={{ ...defaultProps, state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider, reducer };
