import { SortDirection } from '@znemz/react-extras-hooks-use-sort-by';
import cx from 'classnames';
import '@emotion/core';
import React from 'react';
import { SortDirections } from '../../hooks-use-sort-by/lib';

export interface CaretProps {
  sortDirection: SortDirection;
}

const myCss = {
  '&i.caret': {
    border: 'solid white',
    borderWidth: '0 3px 3px 0',
    display: 'inline-block',
    padding: 3,
    '&.up': {
      transform: 'rotate(-135deg)',
    },
    '&.down': {
      transform: 'rotate(45deg)',
    },
  },
};

const Caret = ({ sortDirection }: CaretProps) => {
  const dir = SortDirections.ASC === sortDirection || sortDirection === false ? 'up' : 'down';
  // @ts-ignore
  return <i disabled={sortDirection === false} css={myCss} className={cx('caret', dir)} />;
};

export default Caret;
