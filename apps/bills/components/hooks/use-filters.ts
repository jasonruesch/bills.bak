'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { BillType } from '../../lib/bill.model';
import { queryString } from '../../lib/utils';

export const useFilters = () => {
  const router = useRouter();
  const pathname = usePathname() as string;
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get('type');
  const filterParam = searchParams?.get('filter');
  const [filters, setFilters] = useState<{ type: BillType; filter: string }>({
    type: typeParam
      ? (String(typeParam).toUpperCase() as BillType)
      : BillType.MONTHLY,
    filter: filterParam ? (filterParam as string) : 'all',
  });
  const [query, setQuery] = useState<string>(() => {
    const query = Object.keys(filters).includes('type')
      ? { ...filters, type: filters.type.toLowerCase() }
      : filters;

    return queryString(query);
  });

  const onFiltersChange = (filters: { type: BillType; filter: string }) => {
    setFilters(filters);

    const query = Object.keys(filters).includes('type')
      ? { ...filters, type: filters.type.toLowerCase() }
      : filters;

    const params = queryString(query);
    setQuery(params);

    router.replace(`${pathname}?${params}`);
  };

  return { filters, query, onFiltersChange };
};

export default useFilters;
