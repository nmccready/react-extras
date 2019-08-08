import { useState, Dispatch, SetStateAction } from 'react';

export type OnChangeFn<T> = (_: T) => void;
export type Comparator = (a: any, b: any) => boolean;

export const useStateChangeFact = <S>(comparator?: Comparator) => <S>(
  initialState: S,
  onChange?: OnChangeFn<S>
): [S, Dispatch<SetStateAction<S>>] => {
  const [state, setState] = useState(initialState);

  const setStateChange = (newState) => {
    if (newState === state) return;
    if (comparator && comparator(state, newState)) return;
    setState(newState);
    if (onChange) onChange(newState);
  };
  return [state, setStateChange];
};

export const useStateChange = useStateChangeFact();

export default useStateChange;
