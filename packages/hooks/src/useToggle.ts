import { useState, Dispatch, SetStateAction } from 'react';
import { VoidFunc } from './internals';

const debug = require('../debug').spawn('react:hooks:useToggle');

export interface UseToggleStates {
  one: any;
  two: any;
}

export const useToggle = <T>(
  initialState: T | boolean = false,
  states: UseToggleStates = { one: false, two: true },
  logStr: string = ''
): [T | boolean, VoidFunc, Dispatch<SetStateAction<boolean | T>>] => {
  const [value, setValue] = useState(initialState);

  const toggle = () => {
    const newVal = value === states.one ? states.two : states.one;
    return newVal;
  };

  debug(() => `${logStr}:${value}`);
  return [value, toggle, setValue];
};

export default useToggle;
