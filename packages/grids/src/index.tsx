import React, { memo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeGrid } from 'react-window';
import { SortDirection } from '@znemz/react-extras-hooks-use-sort-by';

import Cell, { RowRenderer, RowRenderProps, stringRowRenderer, RowActionProps } from './Cell';
import GridTemplate from './GridTemplate';
import { OnSortProps } from './Header';

import { SortableGrid, SortableGridProps } from './SortableGrid';

export { SortableGrid };

export type SortableGridProps = SortableGridProps;
export interface ColumnObj {
  name: string;
  label: string;
}
export type Column = ColumnObj | string;
export type ColumnsMap = Column[];
export type ColumnWidthFunc = () => number;
export type Data = any[];
// forwarding bs in typescript
export type RowRenderProps = RowRenderProps;
export type RowActionProps = RowActionProps;
export type RowRenderer = RowRenderer;

export { stringRowRenderer };

export interface GridProps<T> {
  data: Data;
  columnWidth: number | ColumnWidthFunc;
  headerCushion?: number;
  columnsMap: ColumnsMap;
  rowRenderer?: RowRenderer;
  sortDirs?: Map<SortDirection>;
  onSort?: (_: OnSortProps) => void;
}

export const Grid = memo(
  <T extends object>({
    data,
    columnWidth,
    headerCushion,
    columnsMap,
    rowRenderer,
    sortDirs,
    onSort,
  }: GridProps<T>) => {
    const gridRef = useRef(null);

    if (!data || !data.length) return;

    function onResize() {
      if (gridRef.current) {
        gridRef.current.resetAfterIndices({
          columnIndex: 0,
          shouldForceUpdate: false,
        });
      }
    }

    let getColumnWidth = columnWidth as ColumnWidthFunc;

    if (typeof columnWidth !== 'function') {
      getColumnWidth = () => columnWidth;
    }

    return (
      <AutoSizer onResize={onResize} style={{ width: 600, height: 600 }}>
        {({ height, width }) => (
          <VariableSizeGrid
            columnCount={columnsMap.length}
            columnWidth={getColumnWidth}
            height={height}
            innerElementType={GridTemplate({
              columnsMap,
              headerCushion,
              sortDirs,
              onSort,
            })}
            itemData={data}
            ref={gridRef}
            rowCount={data.length}
            rowHeight={() => 50}
            width={width}
          >
            {Cell({ columnsMap, rowRenderer })}
          </VariableSizeGrid>
        )}
      </AutoSizer>
    );
  }
);

export default Grid;
