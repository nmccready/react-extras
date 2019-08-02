import { useMemo, useState } from 'react';
import memoize from 'memoizee';

import * as sortTypes from './sortTypes';

/*
  Not using our Map, as this should be given to react-table
  or put in it's own hook lib.
*/
export type Map<T> = { [K in string]?: T };

export type SortDirection = 'ASC' | 'DSC' | false;

export const SortDirections = {
  ASC: 'ASC' as SortDirection,
  DSC: 'DSC' as SortDirection,
  OFF: false as SortDirection,
};

export type Row = Map<any>;

export type Rows = Row[];

export type Dir = boolean | SortDirection;

export interface Column {
  id: string;
  sortDescFirst?: boolean;
  desc?: Dir;
  sortType?: string | SortFunc;
  sortInverted?: boolean;
}
export type SortFunc = (a: Row, b: Row) => number;

export interface OrderByProps {
  rows: Rows;
  funcs: SortFunc[];
  dirs: Dir[];
  sortBy: Column[]; // to break cache
}
export type OrderByFunc = (_: OrderByProps) => Rows;

export interface UseSortByProps {
  doDebug?: boolean;
  rows: Rows;
  columns: Column[];
  orderByFn?: OrderByFunc;
  sortTypes?: Map<SortFunc>;
  manualSorting?: boolean;
  disableSortRemove?: boolean;
  disableMultiRemove?: boolean;
  disableMultiSort?: boolean;
  defaultSortBy?: Column[];
}

export function useSortBy(instance: UseSortByProps) {
  const {
    doDebug,
    rows,
    columns,
    orderByFn = defaultOrderByFn,
    sortTypes: userSortTypes = {},
    manualSorting,
    disableSortRemove,
    disableMultiRemove,
    disableMultiSort,
    defaultSortBy = [],
  } = instance;

  const [sortBy, setSortBy] = useState(defaultSortBy);

  // Updates sorting based on a columnID, desc flag and multi flag
  const toggleSortBy = (columnID: string, desc: SortDirection, multi?: boolean) => {
    return setSortBy((oldSortBy) => {
      // Find the column for this columnID
      const column = columns.find((d) => d.id === columnID);
      const { sortDescFirst } = column;

      // Find any existing sortBy for this column
      const existingSortBy = oldSortBy.find((d) => d.id === columnID);
      const existingIndex = oldSortBy.findIndex((d) => d.id === columnID);
      const hasDescDefined = typeof desc !== 'undefined' && desc !== null;

      let newSortBy = [];

      // What should we do with this sort action?
      let action;

      if (!disableMultiSort && multi) {
        action = existingSortBy ? 'toggle' : 'add';
      } else {
        // Normal mode
        // eslint-disable-next-line
        if (existingIndex !== oldSortBy.length - 1) {
          action = 'replace';
        } else {
          action = existingSortBy ? 'toggle' : 'replace';
        }
      }

      // Handle toggle states that will remove the sortBy
      if (
        action === 'toggle' && // Must be toggling
        !disableSortRemove && // If disableSortRemove, disable in general
        !hasDescDefined && // Must not be setting desc
        (multi ? !disableMultiRemove : true) && // If multi, don't allow if disableMultiRemove
        ((existingSortBy && // Finally, detect if it should indeed be removed
          (existingSortBy.desc && !sortDescFirst)) ||
          (!existingSortBy.desc && sortDescFirst))
      ) {
        action = 'remove';
      }

      if (action === 'replace') {
        newSortBy = [
          {
            id: columnID,
            desc: hasDescDefined ? desc : sortDescFirst,
          },
        ];
      } else if (action === 'add') {
        newSortBy = [
          ...oldSortBy,
          {
            id: columnID,
            desc: hasDescDefined ? desc : sortDescFirst,
          },
        ];
      } else if (action === 'toggle') {
        // This flips (or sets) the
        newSortBy = oldSortBy.map((d) => {
          if (d.id === columnID) {
            return {
              ...d,
              desc: hasDescDefined ? desc : !existingSortBy.desc,
            };
          }
          return d;
        });
      } else if (action === 'remove') {
        newSortBy = oldSortBy.filter((d) => d.id !== columnID);
      }

      return newSortBy;
    });
  };

  const sortedRows = useMemo(() => {
    if (manualSorting || !sortBy.length) {
      return rows;
    }
    // eslint-disable-next-line no-console
    if (doDebug) console.time('getSortedRows');

    const sortData = (_rows) => {
      // Use the orderByFn to compose multiple sortBy's together.
      // This will also perform a stable sorting using the row index
      // if needed.
      const sortedData = orderByFn({
        rows: _rows,
        funcs: getSortFuncs({ sortBy, columns, userSortTypes }),
        dirs: getSortDirs(sortBy, columns),
        sortBy,
      });

      // If there are sub-rows, sort them
      sortedData.forEach((row) => {
        if (!row.subRows) {
          return;
        }
        row.subRows = sortData(row.subRows);
      });

      // eslint-disable-next-line no-console
      if (doDebug) console.timeEnd('getSortedRows');

      return sortedData;
    };

    return sortData(rows);
  }, [manualSorting, sortBy, doDebug, columns, rows, orderByFn, userSortTypes]);

  return {
    ...instance,
    toggleSortBy,
    rows: sortedRows,
    preSortedRows: rows,
  };
}

export const getSortDirs = (sortBy: Column[], columns: Column[]) => {
  // Map the directions
  return sortBy.map((sort) => {
    // Detect and use the sortInverted option
    const { sortInverted } = columns.find((c) => c.id === sort.id);

    if (sortInverted) {
      return sort.desc;
    }

    return sort.desc;
  });
};

interface GetSortFuncsOpts {
  sortBy: Column[];
  columns: Column[];
  userSortTypes: Map<SortFunc>;
}

export const getSortFuncs = ({ sortBy, columns, userSortTypes }: GetSortFuncsOpts) =>
  sortBy.map((sort) => {
    // Support custom sorting methods for each column
    const { sortType } = columns.find((d) => d.id === sort.id);

    // Look up sortBy functions in this order:
    const sortMethod =
      // column function
      isFunction(sortType) ||
      // column string lookup on user sortType
      // column string lookup on built-in sortType
      userSortTypes[sortType as string] ||
      // default function
      // default string lookup on user sortType
      sortTypes[sortType as string] ||
      // default string lookup on built-in sortType
      sortTypes.alphanumeric;

    // Return the correct sortFn
    return <T>(a: T, b: T) => {
      return sortMethod(a[sort.id], b[sort.id], sort.desc);
    };
  });

/*
Note: this function does not support Multi Sort due to GTFO sortInt !== 0

It's not really needed at this point so I am moving on.

*/
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const _defaultOrderByFn: OrderByFunc = ({ rows, funcs, dirs, sortBy }: OrderByProps) => {
  return [...rows].sort((rowA, rowB): number => {
    for (let i = 0; i < funcs.length; i++) {
      const sortFn = funcs[i];
      const desc = dirs[i] === false || dirs[i] === SortDirections.DSC;
      const sortInt = sortFn(rowA, rowB);
      if (sortInt !== 0) {
        return desc ? -sortInt : sortInt;
      }
    }
    // @ts-ignore
    return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
  });
};

export const defaultOrderByFn: OrderByFunc = memoize(_defaultOrderByFn, {
  normalizer: (args) => {
    // we don't care about normalizing the funcs as they should be the same
    // as the first time through
    const { funcs, ...toCache } = args[0];
    return JSON.stringify(toCache);
  },
});

export function isFunction(a) {
  if (typeof a === 'function') {
    return a;
  }
}
