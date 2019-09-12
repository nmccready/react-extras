import React from 'react';
import { StateInspector } from 'reinspect';
import { storiesOf } from '@storybook/react';
import { CounterProvider } from './counter/Provider';

/*
Note: This currently does not hook into Redux Dev tools
due to `reducerId` not being defined when reinspect.useState is injected
to use-global-hook
*/
storiesOf('global hooks', module).add('counter', () => (
  <StateInspector name="Counter Example">
    <div>
      With reducerId not being defined when reinspect.useState is injected to use-global-hook;
      will instead proxy to React.useState
    </div>
    <CounterProvider />
  </StateInspector>
));
