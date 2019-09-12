import { useState, useEffect } from 'react';
import * as reinspect from 'reinspect';
import $useGlobalHook, { Initializer, ReactLib } from '@znemz/use-global-hook';

import { InnerBaseActions, OuterBaseActions } from '@znemz/use-global-hook/lib/actions';

export interface OurUseStoreProps<
  T,
  InnerA = InnerBaseActions<T>,
  OuterA = OuterBaseActions<T>
> {
  React?: ReactLib;
  initialState?: T;
  actions?: InnerA | InnerBaseActions<T>;
  initializer?: Initializer<T, OuterA>;
  inspect?: boolean;
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
  React = { useState, useEffect },
  inspect = false,
}: OurUseStoreProps<T, InnerA, OuterA>) => {
  if (inspect) {
    /*
      Note: This currently does not hook into Redux Dev tools
      due to `reducerId` not being defined when reinspect.useState is injected
      to use-global-hook

      reducerId either needs to be optional, or we need to memoize or hook into useContext?
    */
    // @ts-ignore
    React.useState = reinspect.useState;
  }
  return $useGlobalHook<T, InnerA, OuterA, WorkR>({
    React,
    initialState,
    actions,
    initializer,
  });
};
