// Import your Client Component
import Bill from '../../lib/bill.model';
import BillsPage from './BillsPage';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function getBills(): Promise<Bill[]> {
  await sleep(500);

  const response = await fetch(`${process.env.BILLS_API_URL}/bills`);
  const bills = await response.json();

  return bills;
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const bills = await getBills();

  // Forward fetched data to your Client Component
  return <BillsPage bills={bills} />;
}
