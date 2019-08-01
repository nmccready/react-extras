import { EffectCallback, DependencyList } from 'react';
import { Map } from '..';

type UseEffectType = (effect: EffectCallback, deps?: DependencyList) => void;

interface ReactLib {
  useEffect: UseEffectType;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn = <T extends any>(newState: T, isRef?: boolean) => void;
export declare const setState: SetStateFn;
export type SetRefFn = <T extends any>(newState: T) => void;
export declare const setRef: SetRefFn;

export type UseCustomFn = (React: ReactLib) => void;
export declare const useCustom: UseCustomFn;

export type Action = <T extends any>(store: Store<T>, ..._: any) => any | void;
export type Actions = Map<Action>;

export type AssociateActionsFn = <T extends any>(store: Store<T>, actions: Actions) => Actions;
export declare const associateActions: AssociateActionsFn;

export type InitializerFn = <T extends any>(_: Store<T>) => void;

export type UseStoreFn = <T extends any>(
  React: ReactLib,
  initialState: T,
  actions: Actions,
  initializer?: InitializerFn
) => UseCustomFn;

export declare const useStore: UseStoreFn;

export interface Store<T> {
  setState: SetStateFn;
  setRef: SetRefFn;
  actions: Actions;
  state: T;
}

export default useStore;
