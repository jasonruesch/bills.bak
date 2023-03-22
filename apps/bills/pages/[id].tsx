import Link from 'next/link';
import { useRouter } from 'next/router';
import { BillDetails } from '../components/BillDetails';
import { useBillStore } from '../lib/bill.store';

export function BillPage() {
  const router = useRouter();
  const { id } = router.query;
  const { bills } = useBillStore();
  const bill = bills.find((bill) => bill.id === id);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <BillDetails bill={bill} />
      </div>

      <div className="mt-4">
        <Link href="/">Back to list</Link>
      </div>
    </>
  );
}

export default BillPage;
