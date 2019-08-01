import { Action } from './useGlobalHook';

export const setState: Action = (store, state) => {
  store.setState(state);
};

export const setRef: Action = (store, state) => {
  store.setRef(state);
};
