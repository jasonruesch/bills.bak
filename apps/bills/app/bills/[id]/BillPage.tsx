'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Bill from '../../../lib/bill.model';

async function deleteBill(id: string): Promise<boolean> {
  const request = fetch(`/api/bills/${id}`, {
    method: 'DELETE',
  });

  const response = await request;

  const deletedBill = await response.json();

  return !!deletedBill;
}

export interface BillPageProps {
  bill: Bill;
}

export function BillPage({ bill }: BillPageProps) {
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
    <div>
      <div>
        <Link href="/bills">Go back</Link>
      </div>
      <div>
        <h1>{bill.name}</h1>
        <p>{bill.amount}</p>
        <p>{bill.dueDate}</p>
        <Link href={`/bills/${bill.id}/edit`}>Edit</Link>
        <button type="button" onClick={() => handleDelete(bill.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BillPage;
