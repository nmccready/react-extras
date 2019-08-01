import { EffectCallback, DependencyList } from 'react';
import { Map } from '..';

type UseEffectType = (effect: EffectCallback, deps?: DependencyList) => void;

interface ReactLib {
  useEffect: UseEffectType;
}

/* since use-global-hook is not ts yet, might move this to it's index.d.ts file */
export type SetStateFn = (newState: any, isRef?: boolean) => void;
export declare const setState: SetStateFn;
export type SetRefFn = (newState: any) => void;
export declare const setRef: SetRefFn;

export type UseCustomFn = (React: ReactLib) => void;
export declare const useCustom: UseCustomFn;

export type Action = (store: Store, ..._: any) => any | void;
export type Actions = Map<Action>;

export type AssociateActionsFn = (store: Store, actions: Actions) => Actions;
export declare const associateActions: AssociateActionsFn;

export type InitializerFn = (_: Store) => void;

export type UseStoreFn = (
  React: ReactLib,
  initialState: any,
  actions: Actions,
  initializer?: InitializerFn
) => UseCustomFn;

export declare const useStore: UseStoreFn;

export interface Store {
  setState: SetStateFn;
  setRef: SetRefFn;
  actions: Actions;
}

export default useStore;
