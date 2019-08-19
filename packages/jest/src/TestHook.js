import React from 'react';
import { create } from 'react-test-renderer';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

export const testHook = (callback) => {
  create(<TestHook callback={callback} />);
};

export default testHook;
