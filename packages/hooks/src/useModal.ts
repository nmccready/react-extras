import { useState } from 'react';

export const useModal = (initialState?: boolean) => {
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
