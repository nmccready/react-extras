import { Store } from './useGlobalHook';

export const setState = <T>(store: Store<T, void, T>, newState: T) => {
  store.setState(newState);
};

export const setRef = <T>(store: Store<T, void, T>, newState: T) => {
  store.setRef(newState);
};
