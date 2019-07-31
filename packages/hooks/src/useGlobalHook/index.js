import React from 'react';
import _useGlobalHook from '@znemz/use-global-hook';

import * as _actions from './actions';

export const useGlobalHook = (initialState, actions = _actions) =>
  _useGlobalHook(React, initialState, actions);
