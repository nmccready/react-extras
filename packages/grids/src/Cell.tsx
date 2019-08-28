import React, { memo } from 'react';
import { get } from 'lodash';
import cx from 'classnames';

import { ColumnsMap, Data } from '.';

export interface CellProps {
  data: Data;
  columnIndex: number;
  rowIndex: number;
  style: Record<string, any>;
}

export interface RowRenderProps {
  entity: Record<string, any>;
  value: any;
  columnIndex: number;
  rowIndex: number;
  style: Record<string, any>;
  columnName: string;
  // makes it easy to tack on JSX.Element to rows
  renderRaw?: boolean;
}

export interface RowActionProps extends RowRenderProps {
  onClick: (_: RowRenderProps) => void;
}

export type RowRenderer = (_?: RowRenderProps) => string | JSX.Element;

export const stringRowRenderer = ({ value, renderRaw }: RowRenderProps) =>
  // entity say if it is JSX.Element
  renderRaw ? value : String(value);

export interface CellOutterProps<T> {
  columnsMap: ColumnsMap;
  rowRenderer?: RowRenderer;
}

/* name ? Props Cell */
const Cell = <T extends object>({
  columnsMap,
  rowRenderer = stringRowRenderer,
}: CellOutterProps<T>) =>
  memo(({ data, columnIndex, rowIndex, style }: CellProps) => {
    const column = columnsMap[columnIndex];
    const columnName = get(column, 'name', column);
    const entity = data[rowIndex];
    const value = get(entity, [columnName]);
    const rowData = rowRenderer({ entity, columnIndex, rowIndex, style, columnName, value });

    return (
      <div
        style={style}
        className={cx(
          'GridItem',
          `Column${columnIndex + 1}`,
          columnIndex % 2 ? 'GridItemOdd' : 'GridItemEven'
        )}
      >
        {rowData}
      </div>
    );
  });

export default Cell;
