import { useState, useEffect } from 'react';
import $useGlobalHook from '@znemz/use-global-hook';
import { UseStoreFn, Actions } from './useGlobalHook';

import * as _actions from './actions';

const _useGlobalHook: UseStoreFn = $useGlobalHook;

export const useGlobalHook = <T>(initialState, actions: Actions<T, any> = _actions) =>
  _useGlobalHook<T, any>({ useState, useEffect }, initialState, actions);
