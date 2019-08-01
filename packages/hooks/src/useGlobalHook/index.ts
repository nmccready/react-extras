import { useEffect } from 'react';
import $useGlobalHook from '@znemz/use-global-hook';
import { UseStoreFn, Actions } from './useGlobalHook';

import * as _actions from './actions';

const _useGlobalHook = $useGlobalHook as UseStoreFn;

export const useGlobalHook = (initialState, actions: Actions = _actions) =>
  _useGlobalHook({ useEffect }, initialState, actions);