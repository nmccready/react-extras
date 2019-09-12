import { useState, useEffect } from 'react';
import * as reinspect from 'reinspect';
import genId from 'shortid';

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
  storeId?: string;
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
  storeId = genId(),
}: OurUseStoreProps<T, InnerA, OuterA>) => {
  if (inspect) {
    React.useState = reinspect.useState.bind(undefined, initialState, storeId);
  }
  return $useGlobalHook<T, InnerA, OuterA, WorkR>({
    React,
    initialState,
    actions,
    initializer,
  });
};
