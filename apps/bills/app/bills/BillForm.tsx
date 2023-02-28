'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Bill from '../../lib/bill.model';

async function createBill(bill: Partial<Bill>): Promise<Bill> {
  const response = await fetch('/api/bills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });
  const createdBill = await response.json();

  return createdBill;
}

async function updateBill(bill: Bill): Promise<Bill> {
  const response = await fetch(`/api/bills/${bill.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });
  const updatedBill = await response.json();

  return updatedBill;
}

export interface BillFormProps {
  bill?: Bill;
}

export function BillForm({ bill }: BillFormProps) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      name: { value: name },
      amount: { value: amount },
      dueDate: { value: dueDate },
    } = e.target as typeof e.target & {
      name: { value: string };
      amount: { value: string };
      dueDate: { value: string };
    };

    const result = bill?.id
      ? await updateBill({
          id: bill.id,
          name: name,
          amount: Number(amount),
          dueDate: dueDate,
        })
      : await createBill({
          name: name,
          amount: Number(amount),
          dueDate: dueDate,
        });

    if (result) {
      router.push('/bills');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          defaultValue={bill?.name || ''}
        />
      </div>
      <div>
        <input
          id="amount"
          name="amount"
          type="text"
          placeholder="Amount"
          defaultValue={bill?.amount || ''}
        />
      </div>
      <div>
        <input
          id="dueDate"
          name="dueDate"
          type="text"
          placeholder="Due Date"
          defaultValue={bill?.dueDate || ''}
        />
      </div>
      <div>
        <Link href="/bills">Cancel</Link>
        <input type="submit" value="Save" />
      </div>
    </form>
  );
}

export default BillForm;
