import { createContext, useReducer } from 'react';

export const initialState = {
  dataSource: [],
  visible: false,
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

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, reducer, Provider };
