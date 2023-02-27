import Bill from '../../../../lib/bill.model';
import { BillForm } from '../../BillForm';

async function getBill(id: string): Promise<Bill> {
  const request = fetch(`${process.env.BILLS_API_URL}/bills/${id}`);

  const response = await request;

  const bill = await response.json();

  return bill;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const bill = await getBill(id);

  return <BillForm bill={bill} />;
}
