import { useEffect, useRef } from 'react';
import {
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import debounce from 'lodash/debounce';

import { Bill, getBills, getSelectedBill } from '@/data';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const bills = await getBills(q ?? undefined, 'name', true);
  const selectedBill = getSelectedBill();

  return { bills, selectedBill, q };
}

export function BillListPage() {
  const { bills, selectedBill, q } = useLoaderData() as {
    bills: Bill[];
    selectedBill: Bill | null;
    q: string | null;
  };

  // const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const searchRef = useRef<HTMLInputElement>(null);

  // const isSearching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has('q');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = q === null;
    const formData = new FormData(e.target.form ?? undefined);

    if (formData.get('q') === '') formData.delete('q');

    submit(formData, { replace: !isFirstSearch });
  };

  const debounceSearchChange = debounce(handleSearchChange, 300);

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = q ?? '';
  }, [q]);

  return (
    <div className="px-8 py-4">
      <h1 className="text-4xl font-bold">Bills</h1>
      <div className="flex items-center justify-between h-16">
        <Form id="search-form" role="search">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-neutral-400"
                aria-hidden="true"
              />
            </div>
            <input
              ref={searchRef}
              id="q"
              className="block w-full rounded-md border-0 pl-10 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
              // className={isSearching ? 'loading' : ''}
              aria-label="Search users"
              placeholder="Search..."
              type="search"
              name="q"
              defaultValue={q ?? ''}
              onChange={debounceSearchChange}
            />
            {/* <div id="search-spinner" aria-hidden hidden={!isSearching} /> */}
            <div className="sr-only" aria-live="polite"></div>
          </div>
        </Form>
        <Link
          to="new"
          className="rounded-md bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
        >
          New Bill
        </Link>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-center">Paid</th>
            <th className="px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr
              key={bill.id}
              className={clsx(
                'hover:bg-neutral-50 cursor-pointer',
                bill.id === selectedBill?.id ? 'bg-neutral-100' : ''
              )}
              onClick={() => navigate(`/bills/${bill.id}`)}
            >
              <td className="border-t px-4 py-2 text-left">{bill.name}</td>
              <td className="border-t px-4 py-2 text-left">
                {Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(
                  bill.dueDate
                )}
              </td>
              <td className="border-t px-4 py-2 text-center">
                {bill.paid ? 'Yes' : 'No'}
              </td>
              <td className="border-t px-4 py-2 text-right">
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(bill.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
