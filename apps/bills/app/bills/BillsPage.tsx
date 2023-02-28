'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Bill from '../../lib/bill.model';

async function deleteBill(id: string): Promise<boolean> {
  const response = await fetch(`/api/bills/${id}`, {
    method: 'DELETE',
  });
  const deletedBill = await response.json();

  return !!deletedBill;
}

export interface BillsPageProps {
  bills: Bill[];
}

export function BillsPage({ bills }: BillsPageProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this bill?');

    if (confirmed) {
      const success = await deleteBill(id);

      if (success) {
        router.push(pathname as string);
      } else {
        console.error('Failed to delete bill');
      }
    }
  };

  return (
    <div>
      <div>
        <Link href="/bills/new">Add a new bill</Link>
      </div>
      {bills.length ? (
        bills.map((bill) => (
          <div key={bill.id}>
            <h1>
              <Link href={`/bills/${bill.id}`}>{bill.name}</Link>
            </h1>
            <p>{bill.amount}</p>
            <p>{bill.dueDate}</p>
            <Link href={`/bills/${bill.id}/edit`}>Edit</Link>
            <button type="button" onClick={() => handleDelete(bill.id)}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No bills found</p>
      )}
    </div>
  );
}

export default BillsPage;
