import { Bill } from '../../../../lib/bill.model';
import { EditBillPage } from './EditBillPage';

async function getBill(id: string): Promise<Bill> {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills/${id}`);
  const bill = await response.json();

  return bill;
}

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const bill = await getBill(id);

  return <EditBillPage bill={bill} />;
}
