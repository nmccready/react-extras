import { useState } from 'react';

const debug = require('../../../debug').spawn('react:hooks:useToggle');

export interface UseToggleStates {
  one: any;
  two: any;
}

export const useToggle = (
  initialState: any = false,
  states: UseToggleStates = { one: false, two: true },
  logStr: string = ''
) => {
  const [value, setValue] = useState(initialState);

  const toggle = () => {
    const newVal = value === states.one ? states.two : states.one;
    return newVal;
  };

  debug(() => `${logStr}:${value}`);
  return [value, toggle, setValue];
};

export default useToggle;
