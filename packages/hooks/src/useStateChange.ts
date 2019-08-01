import { useState, Dispatch, SetStateAction } from 'react';

export type OnChangeFn = (_: any) => void;
export type Comparator = (a: any, b: any) => boolean;

export const useStateChangeFact = (comparator?: Comparator) => <S extends any>(
  initialState,
  onChange: OnChangeFn
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
