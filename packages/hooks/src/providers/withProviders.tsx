import React, { ComponentType, ReactElement, PropsWithChildren } from 'react';
import { compose } from 'recompose';
import { StateInspector } from 'reinspect';
import 'reinspect/types';

export const devProviders: ComponentType<any>[] = [StateInspector];

export const withProvider = <TInner extends ReactElement>(Provider: ComponentType<any>) => (
  BaseComponent: ComponentType<TInner>
) => {
  const WithProvider: ComponentType<any> = (
    props: PropsWithChildren<any>
  ): ReactElement | null => (
    <Provider>
      <BaseComponent {...props} />
    </Provider>
  );
  return WithProvider;
};

export const withProviders = <TInner, TOutter = any>(
  _providers: ComponentType<TOutter>[] = devProviders
) => (BaseComponent: ComponentType<TInner>) =>
  compose<TInner, TOutter>(..._providers.map(withProvider))(BaseComponent);

export default withProviders;
