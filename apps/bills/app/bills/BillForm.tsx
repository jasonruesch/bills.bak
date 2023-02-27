'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Bill from '../../lib/bill.model';

async function createBill(bill: Partial<Bill>): Promise<Bill> {
  const request = fetch('/api/bills', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });

  const response = await request;

  const createdBill = await response.json();

  return createdBill;
}

async function updateBill(bill: Bill): Promise<Bill> {
  const request = fetch(`/api/bills/${bill.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bill),
  });

  const response = await request;

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

    const { name, amount, dueDate } = e.target as typeof e.target & {
      name: { value: string };
      amount: { value: string };
      dueDate: { value: string };
    };

    const result = bill?.id
      ? await updateBill({
          id: bill.id,
          name: name.value,
          amount: Number(amount.value),
          dueDate: dueDate.value,
        })
      : await createBill({
          name: name.value,
          amount: Number(amount.value),
          dueDate: dueDate.value,
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
