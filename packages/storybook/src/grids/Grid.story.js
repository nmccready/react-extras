import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@znemz/addon-knobs';
import { noop } from 'lodash';

// eslint-disable-next-line max-len
import { UsersGrid, genRegCss, COLUMNS_MAP } from './UsersGrid';

const genUsers = (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    users.push({
      username: `${i}_user`,
      email: `email${i}@gmail.com`,
      firstName: `First${i}`,
      lastName: `Last${i}`,
    });
  }
  return users;
};

const controlUsers = [
  {
    username: `abe`,
    email: `sillyAbe@gmail.com`,
    firstName: `Abraham`,
    lastName: `Lincoln`,
  },
  {
    username: `cbilly`,
    email: `zbillz@gmail.com`,
    firstName: `William`,
    lastName: `Kid`,
  },
  {
    username: `georgee`,
    email: `washYoBack@gmail.com`,
    firstName: `George`,
    lastName: `Washington`,
  },
  {
    username: `rogain`,
    email: `jrogan@gmail.com`,
    firstName: `Joe`,
    lastName: `Rogan`,
  },
];

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .add('Sortable', () => {
    return (
      <div css={genRegCss(COLUMNS_MAP.length)}>
        <UsersGrid data={genUsers(10).concat(controlUsers)} onRowAction={noop} />
      </div>
    );
  });
