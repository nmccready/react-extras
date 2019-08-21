import { useState, useEffect } from 'react';
import $useGlobalHook, { Initializer } from '@znemz/use-global-hook';

import { InnerBaseActions } from '@znemz/use-global-hook/lib/actions';

export interface OurUseStoreProps<T, InnerA, OuterA, WorkR = undefined> {
  initialState?: T;
  actions?: InnerA | InnerBaseActions<T>;
  initializer?: Initializer<T, OuterA>;
  hookWork?: () => WorkR;
}

export const useGlobalHook = <T, InnerA, OuterA, WorkR = undefined>({
  initialState,
  actions,
  initializer,
  hookWork,
}: OurUseStoreProps<T, InnerA, OuterA, WorkR>) =>
  $useGlobalHook({
    React: { useState, useEffect },
    initialState,
    actions,
    initializer,
    hookWork,
  });
