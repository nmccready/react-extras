import { EffectCallback, DependencyList, Dispatch, SetStateAction } from 'react';
import { Map } from '..';

export type UseEffect = (effect: EffectCallback, deps?: DependencyList) => void;
export type UseState = <S>(initialState: S | (() => S)) => [S, Dispatch<SetStateAction<S>>];
interface ReactLib {
  useEffect: UseEffect;
  useState: UseState;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn<T> = (newState: T, isRef?: boolean) => void;
export declare const setState: <T>(newState: T, isRef?: boolean) => void;
export type SetRefFn<T> = (newState: T) => void;
export declare const setRef: <T>(newState: T) => void;

export type UseCustomFn = (React: ReactLib) => void;
export declare const useCustom: UseCustomFn;

export type Action<T, R> = (store: Store<T, R>, ..._: any) => R | void;
// for defining functions for inference
export type ActionFn = <T, R>(store: Store<T, R>, ..._: any) => R | void;
export type Actions<T, R> = Map<Action<T, R>>;
export type OuterAction<T, R> = (..._: any) => R | void;

export type AssociateActionsFn = <T, R>(
  store: Store<T, R>,
  actions: Actions<T, R>
) => Actions<T, R>;
export declare const associateActions: AssociateActionsFn;

export type Initializer<T, R> = (_: Store<T, R>) => void;

export type UseStoreFn = <T, R>(
  React: ReactLib,
  initialState: T,
  actions: Actions<T, R>,
  initializer?: Initializer<T, R>
) => () => [T, Map<OuterAction<T, R>>];

export declare const useStore: <T, R>(
  React: ReactLib,
  initialState: T,
  actions: Actions<T, R>,
  initializer?: Initializer<T, R>
) => () => [T, Map<OuterAction<T, R>>];

export interface Store<T, R> {
  setState: SetStateFn<T>;
  setRef: SetRefFn<T>;
  actions: Actions<T, R>;
  state: T;
}

export default useStore;
