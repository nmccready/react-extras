import React, { memo, useState, useMemo } from 'react';
import {
  SortDirections,
  SortDirection,
  useSortBy,
  Column as SortColumn,
} from '@znemz/react-extras-hooks-use-sort-by';
import { mapValues } from 'lodash';

import { Grid, Data, ColumnsMap, RowRenderer } from './index';

const debug = require('../debug').spawn('components:Grid:Sortable');

export interface SortableGridProps {
  data: Data;
  defaultSortDir: Map<SortDirection>;
  sortColumns: SortColumn[];
  defaultSortBy: SortColumn[];
  columnsMap: ColumnsMap;
  headerCushion: number;
  columnWidth: number;
  rowRenderer: RowRenderer;
}

export const SortableGrid = memo(
  ({
    data = [],
    defaultSortDir,
    sortColumns,
    defaultSortBy,
    columnsMap,
    headerCushion,
    columnWidth,
    rowRenderer,
  }: SortableGridProps) => {
    const [sortDir, setSortDir] = useState(defaultSortDir);
    const { toggleSortBy, rows } = useSortBy({
      doDebug: true,
      rows: data,
      columns: sortColumns,
      defaultSortBy,
    });

    return useMemo(
      () => (
        <Grid
          data={rows}
          columnsMap={columnsMap}
          headerCushion={headerCushion}
          columnWidth={columnWidth}
          rowRenderer={rowRenderer}
          sortDirs={sortDir}
          onSort={({ direction, index, columnName }) => {
            debug(() => `${direction}:index(${index}):${columnName}`);

            toggleSortBy(columnName, direction, false);
            setSortDir((oldSortDirs) => {
              const newValues = mapValues(oldSortDirs, () => SortDirections.OFF);
              newValues[columnName] = direction;
              return newValues;
            });
          }}
        />
      ),
      [rows, sortDir]
    );
  }
);
