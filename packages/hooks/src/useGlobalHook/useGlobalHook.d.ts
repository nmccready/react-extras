import { EffectCallback, DependencyList, Dispatch, SetStateAction } from 'react';

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

export type AssociateActionsFn = <T, A>(store: Store<T, A>, actions: A) => A;
export declare const associateActions: AssociateActionsFn;

export type Initializer<T, A> = (_: Store<T, A>) => void;

export type UseStoreFn = <T, InnerA, OuterA>(
  React: ReactLib,
  initialState: T,
  actions: InnerA,
  initializer?: Initializer<T, InnerA>
) => () => [T, OuterA];

export declare const useStore: <T, InnerA, OuterA>(
  React: ReactLib,
  initialState: T,
  actions: InnerA,
  initializer?: Initializer<T, InnerA>
) => () => [T, OuterA];

export interface Store<T, A> {
  setState: SetStateFn<T>;
  setRef: SetRefFn<T>;
  actions: A;
  state: T;
}

export default useStore;
