import { EffectCallback, DependencyList, Dispatch, SetStateAction } from 'react';
import { Map } from '..';

export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void;
export type UseState = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
interface ReactLib {
  useEffect: UseEffect;
  useState: UseState;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn<T> = <T>(newState: T, isRef?: boolean) => void;
export declare const setState: <T>(newState: T, isRef?: boolean) => void;
export type SetRefFn<T> = <T>(newState: T) => void;
export declare const setRef: <T>(newState: T) => void;

export type UseCustomFn = (React: ReactLib) => void;
export declare const useCustom: UseCustomFn;

export type Action<T> = (store: Store<T>, ..._: any) => any | void;
export type Actions<T> = Map<Action<T>>;
export type OuterAction<T> = (..._: any) => any | void;

export type AssociateActionsFn<T> = <T>(store: Store<T>, actions: Actions<T>) => Actions<T>;
export declare const associateActions: <T>(store: Store<T>, actions: Actions<T>) => Actions<T>;

export type InitializerFn<T> = <T>(_: Store<T>) => void;

export type UseStoreFn = <T>(
  React: ReactLib,
  initialState: T,
  actions: Actions<T>,
  initializer?: InitializerFn<T>
) => () => [T, Map<OuterAction<T>>];

export declare const useStore: UseStoreFn;

export interface Store<T> {
  setState: SetStateFn<T>;
  setRef: SetRefFn<T>;
  actions: Actions<T>;
  state: T;
}

export default useStore;
