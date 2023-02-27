import { Metadata } from 'next';
import Bill from '../../../lib/bill.model';
import { BillPage } from './BillPage';

async function getBill(id: string): Promise<Bill> {
  const request = fetch(`${process.env.BILLS_API_URL}/bills/${id}`);

  const response = await request;

  const bill = await response.json();

  return bill;
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const bill = await getBill(id);

  return { title: `${bill.name} - Bills - Jason RUesch` };
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const bill = await getBill(id);

  return <BillPage bill={bill} />;
}
