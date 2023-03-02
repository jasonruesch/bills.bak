'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import BillForm from '../../../../components/BillForm';
import { Bill } from '../../../../lib/bill.model';

async function deleteBill(id: string): Promise<boolean> {
  const response = await fetch(`/api/bills/${id}`, {
    method: 'DELETE',
  });
  const deletedBill = await response.json();

  return !!deletedBill;
}

export interface EditBillPageProps {
  bill: Bill;
}

export function EditBillPage({ bill }: EditBillPageProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const success = await deleteBill(id);

    if (success) {
      router.push('/bills');
    } else {
      console.error('Failed to delete bill');
    }
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

      <BillForm bill={bill} />
    </>
  );
}

export default EditBillPage;
