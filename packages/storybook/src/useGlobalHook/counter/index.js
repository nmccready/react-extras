import { useGlobalHook } from '@znemz/react-extras-hooks/src';
import * as actions from './actions';

const initialState = {
  counter: 0,
};

export const useCounter = useGlobalHook({ initialState, actions, inspect: true });

export default useCounter;
