import { ActionFn } from './useGlobalHook';

export const setState: ActionFn = (store, state) => {
  store.setState(state);
};

export const setRef: ActionFn = (store, state) => {
  store.setRef(state);
};
