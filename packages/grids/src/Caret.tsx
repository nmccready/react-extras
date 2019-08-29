import { SortDirection, SortDirections } from '@znemz/react-extras-hooks-use-sort-by';
import cx from 'classnames';
import React from 'react';

export interface CaretProps {
  sortDirection: SortDirection;
}

const size = 5;

const myCss = {
  '&.caret': {
    marginLeft: 5,
    '&.up': {
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderBottom: `${size}px solid black`,
      transform: 'translateY(-40%)',
    },
    '&.down': {
      borderLeft: `${size}px solid transparent`,
      borderRight: `${size}px solid transparent`,
      borderTop: `${size}px solid black`,
      transform: 'translateY(40%)',
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
