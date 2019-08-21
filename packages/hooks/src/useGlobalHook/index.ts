import { useState, useEffect } from 'react';
import $useGlobalHook from '@znemz/use-global-hook';
import { UseStoreFn, Initializer } from './useGlobalHook';

import * as base from './actions';

const _useGlobalHook: UseStoreFn = $useGlobalHook;

export const useGlobalHook = <
  T,
  InnerA = base.InnerBaseActions<T>,
  OuterA = base.OuterBaseActions<T>
>(
  initialState,
  actions: InnerA = (base as unknown) as InnerA,
  initializer?: Initializer<T, InnerA>
) =>
  _useGlobalHook<T, InnerA, OuterA>(
    { useState, useEffect },
    initialState,
    actions,
    initializer
  );
