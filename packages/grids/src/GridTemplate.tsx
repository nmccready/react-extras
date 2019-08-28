import React, { forwardRef, PropsWithChildren, MutableRefObject } from 'react';
import { SortDirection } from '@znemz/react-extras-hooks-use-sort-by';
import Header, { OnSortProps } from './Header';
import { ColumnsMap } from '.';

export interface GridTemplateOuterProps {
  columnsMap: ColumnsMap;
  headerCushion: number;
  sortDirs?: Record<string, SortDirection>;
  onSort?: (_: OnSortProps) => void;
}

export interface GridTemplateProps {
  style: Record<string, any>;
}

const GridTemplate = ({
  columnsMap,
  headerCushion = 0,
  sortDirs,
  onSort,
}: GridTemplateOuterProps) =>
  forwardRef(
    (
      { children, style, ...rest }: PropsWithChildren<GridTemplateProps>,
      ref: MutableRefObject<any>
    ) => (
      <div
        className="Grid"
        ref={ref}
        style={{ ...style, height: style.height + headerCushion }}
        {...rest}
      >
        {headerCushion ? (
          <Header columnsMap={columnsMap} style={style} sortDirs={sortDirs} onSort={onSort} />
        ) : (
          ''
        )}
        <div className="Data" style={{ width: style.width }}>
          {children}
        </div>
      </div>
    )
  );

export default GridTemplate;
