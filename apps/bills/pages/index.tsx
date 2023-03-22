import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BillDetails } from '../components/BillDetails';
import { useBillStore } from '../lib/bill.store';

export function Index() {
  const [isHydrated, setIsHydrated] = useState(false);
  const { bills, isLoading } = useBillStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {isHydrated &&
        (isLoading
          ? Array.from({ length: 10 }, (_, i) => <BillDetails key={i} />)
          : bills.map((bill) => (
              <Link
                key={bill.id}
                href={`/${bill.id}`}
                className="transition-transform duration-300 hover:scale-105"
              >
                <BillDetails bill={bill} />
              </Link>
            )))}
    </div>
  );
}

export default Index;
