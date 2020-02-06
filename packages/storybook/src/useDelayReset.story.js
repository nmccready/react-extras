import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import { useDelayReset } from '@znemz/react-extras-hooks/src';

const UseDelayResetComp = () => {
  const [state, setState] = useDelayReset(false, { resetState: false });
  return (
    <>
      <Button
        onClick={() => {
          setState(true);
        }}
      >
        Set State To Be Reset..
      </Button>
      <span>state {String(state)}</span>
    </>
  );
};

storiesOf('hooks', module).add('useDelayRest', () => <UseDelayResetComp />);
