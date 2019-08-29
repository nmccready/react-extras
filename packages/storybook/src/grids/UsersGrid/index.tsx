import React, { memo } from 'react';
import {
  SortableGrid,
  ColumnsMap,
  Data,
  RowRenderProps,
  stringRowRenderer,
} from '@znemz/react-extras-grids/src';
import { SortDirection, SortDirections } from '@znemz/react-extras-hooks-use-sort-by';
import { get, map } from 'lodash';

import { COLUMN_WIDTH, HEADER_CUSHION, genRegCss } from './index.css';

export { genRegCss };

export const COLUMNS_MAP: ColumnsMap = ['username', 'email', 'firstName', 'lastName'];

export const COLUMN_PROPS = COLUMNS_MAP.map((c) => ({ id: get(c, 'name', c) }));

export const DEFAULT_SORT_DIRS: Record<string, SortDirection> = {};

COLUMN_PROPS.forEach((v) => {
  DEFAULT_SORT_DIRS[v.id] = SortDirections.OFF;
});

const DEFAULT_SORT_BYS = map(DEFAULT_SORT_DIRS, (desc, id) => ({ id, desc }));

export interface UsersGridProps {
  data: Data;
  onRowAction: (props: RowRenderProps) => void;
}

export const UsersGrid = memo(({ data = [] }: UsersGridProps) => (
  <SortableGrid
    data={data}
    defaultSortDir={DEFAULT_SORT_DIRS}
    sortColumns={COLUMN_PROPS}
    columnsMap={COLUMNS_MAP}
    defaultSortBy={DEFAULT_SORT_BYS}
    headerCushion={HEADER_CUSHION}
    columnWidth={COLUMN_WIDTH}
    rowRenderer={stringRowRenderer}
  />
));
