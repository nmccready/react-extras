import React, { PropsWithChildren } from 'react';
import cx from 'classnames';
import '@emotion/core';
import { get, noop, merge } from 'lodash';
import { SortDirection, SortDirections } from '@znemz/react-extras-hooks-use-sort-by';
import { useToggle } from '@znemz/react-extras-hooks';

import { ColumnsMap } from '.';
import Caret from './Caret';

export interface OnSortProps {
  direction: SortDirection;
  index: number;
  columnName: string;
}

export interface HeaderItemProps {
  text: string;
  index: number;
  sortDirs?: Record<string, SortDirection>;
  onSort?: (_: OnSortProps) => void;
  less?: Record<string, any>;
  name?: string;
}

export type HeaderItem = ({
  text,
  index,
  sortDirs,
  onSort,
  less,
  name,
}: React.PropsWithChildren<HeaderItemProps>) => JSX.Element;

export const DefaultHeaderItem: HeaderItem = ({
  text,
  index,
  sortDirs,
  onSort = noop,
  less,
  name,
}: PropsWithChildren<HeaderItemProps>) => {
  let sortDir;
  let toggleSortDir;
  let headerText: string | JSX.Element = text;

  const columnProp = name || text;
  const inSortDir = get(sortDirs, [columnProp]);

  if (inSortDir != null) {
    const sortHook = useToggle(
      inSortDir,
      {
        one: inSortDir,
        two: inSortDir === SortDirections.ASC ? SortDirections.DSC : SortDirections.ASC,
      },
      name || text
    );
    sortDir = sortHook[0];
    toggleSortDir = sortHook[1];

    headerText = (
      <div
        onClick={() => {
          const newSortDir = toggleSortDir();
          onSort({ direction: newSortDir, index, columnName: name || text });
        }}
      >
        <Caret sortDirection={sortDir} />
        {text}
        <div className="dummy-for-space"></div>
      </div>
    );
  }

  return (
    <div
      css={merge(
        {
          '& > div': {
            cursor: 'pointer',
            width: '100%', // more for pointer
            textAlign: 'center',
            display: 'inline-flex',
            justifyContent: 'space-between',
          },
        },
        less
      )}
      className={cx(
        'HeaderItem',
        `Column${index + 1}`,
        index % 2 ? 'HeaderItemOdd' : 'HeaderItemEven'
      )}
    >
      {headerText}
    </div>
  );
};

export interface HeaderProps {
  style?: Record<string, any>;
  columnsMap: ColumnsMap;
  sortDirs?: Record<string, SortDirection>;
  onSort?: (_: OnSortProps) => void;
  HeaderItem?: HeaderItem;
}

export type Header = ({
  columnsMap,
  sortDirs,
  onSort,
  HeaderItem,
}: React.PropsWithChildren<HeaderProps>) => JSX.Element;

const DefaultHeader: Header = ({
  columnsMap,
  sortDirs,
  onSort,
  HeaderItem = DefaultHeaderItem,
}: PropsWithChildren<HeaderProps>) => (
  // while this makes it easier for keeping the HeaderItems spread across evenly
  // we lose the hover events as css parent selectors are not supported.
  // <div className="Header" css={{ display: 'flex', justifyContent: 'center' }}>,
  <>
    {columnsMap.map((c, index) => {
      const text = get(c, ['label'], c);
      return (
        <HeaderItem
          key={`header-${index}`}
          text={text}
          name={get(c, ['name'])}
          index={index}
          sortDirs={sortDirs}
          onSort={onSort}
        />
      );
    })}
  </>
  // </div>
);

export default DefaultHeader;
