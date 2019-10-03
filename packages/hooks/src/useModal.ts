import { useState, Dispatch, SetStateAction } from 'react';
import { VoidFunc } from './internals';

export const useModal = (
  initialState?: boolean
): [boolean, Dispatch<SetStateAction<boolean>>, VoidFunc, VoidFunc] => {
  const [show, setShow] = useState(initialState);

  const close = () => {
    setShow(false);
  };
  const open = () => {
    setShow(true);
  };

  return [show, setShow, open, close];
};

export default useModal;
