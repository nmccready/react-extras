import React, { ComponentType, ReactElement, PropsWithChildren } from 'react';
import { compose } from 'recompose';
import { StateInspector } from 'reinspect';

export const devProviders: ComponentType<any>[] = [StateInspector];

export const withProvider = <
  TInner extends ReactElement,
  ProvPops extends Record<string, any> = {}
>(
  Provider: ComponentType<any>,
  providerProps: ProvPops = {} as ProvPops
) => (BaseComponent: ComponentType<TInner>) => {
  const WithProvider: ComponentType<any> = (
    props: PropsWithChildren<any>
  ): ReactElement | null => (
    <Provider {...providerProps}>
      <BaseComponent {...props} />
    </Provider>
  );
  return WithProvider;
};

export const withProviders = <
  TInner,
  TOutter = any,
  ProvPops extends Record<string, any> = {}
>(
  _providers: ComponentType<TOutter>[] = devProviders,
  providerProps: ProvPops = {} as ProvPops
) => (BaseComponent: ComponentType<TInner>) =>
  compose<TInner, TOutter>(..._providers.map((p) => withProvider(p, providerProps)))(
    BaseComponent
  );

export default withProviders;
