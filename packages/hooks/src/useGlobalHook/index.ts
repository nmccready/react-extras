import { useState, useEffect } from 'react';
import $useGlobalHook, { Initializer } from '@znemz/use-global-hook';

import { InnerBaseActions, OuterBaseActions } from '@znemz/use-global-hook/lib/actions';

export interface OurUseStoreProps<
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>
> {
  initialState?: T;
  actions?: InnerA | InnerBaseActions<T>;
  initializer?: Initializer<T, OuterA>;
}

export const useGlobalHook = <
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>,
  WorkR = undefined
>({
  initialState,
  actions,
  initializer,
}: OurUseStoreProps<T, InnerA, OuterA>) =>
  $useGlobalHook<T, InnerA, OuterA, WorkR>({
    React: { useState, useEffect },
    initialState,
    actions,
    initializer,
  });
