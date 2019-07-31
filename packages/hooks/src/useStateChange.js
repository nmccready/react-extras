import { useState } from 'react';

export const useStateChangeFact = (comparator) => (initialState, onChange) => {
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
