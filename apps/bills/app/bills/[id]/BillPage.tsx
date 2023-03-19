'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Bill, BillType } from '../../../lib/bill.model';
import { queryString, toCurrency } from '../../../lib/utils';

async function deleteBill(id: string): Promise<boolean> {
  const response = await fetch(`/api/bills/${id}`, {
    method: 'DELETE',
  });
  const deletedBill = await response.json();

  return !!deletedBill;
}

export interface BillPageProps {
  bill: Bill;
}

export function BillPage({ bill }: BillPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams?.get('type');
  const type = typeParam ? (String(typeParam).toUpperCase() as BillType) : null;

  const handleDelete = async (id: string) => {
    const success = await deleteBill(id);

    if (success) {
      router.push('/bills');
    } else {
      console.error('Failed to delete bill');
    }
  };

  const cancelQueryString = () => {
    // const query = router.query;
    // delete query.id; // Clear the id before returning to the list

    // return queryString({ ...query, type: type || initialValues?.type });
    return queryString({ type: type || bill.type });
  };

  return (
    <>
      {/* Page header */}
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                      {bill.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              <Link
                href={`/bills/${bill.id}/edit`}
                className="inline-flex items-center rounded-md border border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
              >
                Edit bill
              </Link>
              <button
                className="ml-3 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => handleDelete(bill.id)}
              >
                Delete bill
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-6">
          <dt className="font-bold">ID:</dt>
          <dd className="col-span-5">{bill.id}</dd>
          <dt className="font-bold">Bill Type:</dt>
          <dd className="col-span-5">{bill.type}</dd>
          <dt className="font-bold">Name:</dt>
          <dd className="col-span-5">{bill.name}</dd>
          <dt className="font-bold">Amount:</dt>
          <dd className="col-span-5">{toCurrency(bill.amount)}</dd>
          <dt className="font-bold">Due Date:</dt>
          <dd className="col-span-5">{bill.dueDate}</dd>
          <dt className="font-bold">Auto-paid:</dt>
          <dd className="col-span-5">{bill.autoPaid ? 'Yes' : 'No'}</dd>
          <dt className="font-bold">Balance:</dt>
          <dd className="col-span-5">{toCurrency(bill.balance)}</dd>
          <dt className="font-bold">Owner:</dt>
          <dd className="col-span-5">{bill.owner}</dd>
          <dt className="font-bold">Website:</dt>
          <dd className="col-span-5">{bill.website}</dd>
          <dt className="font-bold">Username:</dt>
          <dd className="col-span-5">{bill.username}</dd>
          <dt className="font-bold">Password:</dt>
          <dd className="col-span-5">{bill.password}</dd>
          <dt className="font-bold">Created:</dt>
          <dd className="col-span-5">
            {new Date(bill.createdAt).toISOString()}
          </dd>
          <dt className="font-bold">Updated:</dt>
          <dd className="col-span-5">
            {bill.updatedAt && new Date(bill.updatedAt)?.toISOString()}
          </dd>
        </dl>

        <div className="pt-5">
          <div className="flex flex-col py-2 px-4 sm:flex-row sm:justify-end sm:px-6">
            <Link
              href={`/bills?${cancelQueryString()}`}
              className="order-4 mb-5 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:order-1 sm:mb-0 sm:w-auto"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BillPage;
