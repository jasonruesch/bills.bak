import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Bill } from '../../../lib/bill.model';
import { BillPage } from './BillPage';

async function getBill(id: string): Promise<Bill> {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills/${id}`);

  if (response.status === 404) {
    redirect('/bills');
  }

  const bill = await response.json();

  return bill;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const bill = await getBill(id);

  return { title: `${bill.name} - Bills` };
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const bill = await getBill(id);

  return <BillPage bill={bill} />;
}
