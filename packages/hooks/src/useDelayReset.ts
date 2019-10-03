import { useState, Dispatch, SetStateAction } from 'react';

export interface UseDelayResetOps {
  resetState?: any;
  delay?: number;
}

export const useDelayReset = <T>(
  defaultState,
  { resetState, delay = 750 }: UseDelayResetOps = {}
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(defaultState);
  if (defaultState) {
    setTimeout(() => {
      setState(resetState);
    }, delay);
  }
  return [state, setState];
};
