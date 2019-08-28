import { SortDirection, SortDirections } from '@znemz/react-extras-hooks-use-sort-by';
import cx from 'classnames';
import React from 'react';

export interface CaretProps {
  sortDirection: SortDirection;
}

const myCss = {
  '&.caret': {
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

  return (
    // @ts-ignore
    <i disabled={sortDirection === false} css={myCss} className={cx('caret', dir)} />
  );
};

export default Caret;
