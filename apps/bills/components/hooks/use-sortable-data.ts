/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState } from 'react';

export type Direction = 'ascending' | 'descending';

export interface SortConfig {
  key: string;
  direction: Direction;
}

export function useSortableData<T>(
  items: Array<T>,
  config: SortConfig = {
    key: 'name',
    direction: 'ascending',
  },
  keyTypes?: { [key: string]: 'number' | 'date' | 'string' }
) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const rawAValue = (a as any)[sortConfig.key];
        const rawBValue = (b as any)[sortConfig.key];

        const aValue =
          keyTypes?.[sortConfig.key] === 'number'
            ? Number(rawAValue)
            : keyTypes?.[sortConfig.key] === 'date'
            ? new Date(rawAValue)
            : rawAValue;
        const bValue =
          keyTypes?.[sortConfig.key] === 'number'
            ? Number(rawBValue)
            : keyTypes?.[sortConfig.key] === 'date'
            ? new Date(rawBValue)
            : rawBValue;

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig, keyTypes]);

  const handleSort = (key: string) => {
    let direction: Direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, handleSort, sortConfig };
}

export default useSortableData;
