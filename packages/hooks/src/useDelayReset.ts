import { useState, Dispatch, SetStateAction } from 'react';

export interface UseDelayResetOps {
  resetState?: any;
  delay?: number;
}

export const useDelayReset = <T>(
  defaultState,
  { resetState, delay = 750 }: UseDelayResetOps = {}
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, _setState] = useState<T>(defaultState);

  const setState = (newState: T) => {
    if (newState !== resetState) return;
    _setState(newState);
    setTimeout(() => {
      _setState(resetState);
    }, delay);
  };

  return [state, setState];
};
