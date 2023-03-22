import { Bill } from '../lib/bill.store';

interface BillDetailsProps {
  bill?: Bill;
}

export const BillDetails = ({ bill }: BillDetailsProps) => {
  return (
    <div className="rounded bg-white p-4 shadow">
      {!bill?.id ? (
        <div className="animate-pulse">
          <div>
            <strong>ID:</strong>{' '}
            <div className="inline-block h-4 w-40 rounded bg-gray-400"></div>
          </div>
          <div>
            <strong>Name:</strong>{' '}
            <div className="inline-block h-4 w-40 rounded bg-gray-400"></div>
          </div>
          <div>
            <strong>Amount:</strong>{' '}
            <div className="inline-block h-4 w-20 rounded bg-gray-400"></div>
          </div>
          <div>
            <strong>Due Date:</strong>{' '}
            <div className="inline-block h-4 w-10 rounded bg-gray-400"></div>
          </div>
          <div>
            <strong>Auto-paid:</strong>{' '}
            <div className="inline-block h-4 w-10 rounded bg-gray-400"></div>
          </div>
          <div>
            <strong>Balance:</strong>{' '}
            <div className="inline-block h-4 w-20 rounded bg-gray-400"></div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <strong>ID:</strong> <span>{bill.id}</span>
          </div>
          <div>
            <strong>Name:</strong> <span>{bill.name}</span>
          </div>
          <div>
            <strong>Amount:</strong> <span>{bill.amount}</span>
          </div>
          <div>
            <strong>Due Date:</strong> <span>{bill.dueDate}</span>
          </div>
          <div>
            <strong>Auto-paid:</strong>{' '}
            <span>{bill.autoPaid ? 'Yes' : 'No'}</span>
          </div>
          <div>
            <strong>Balance:</strong> <span>{bill.balance}</span>
          </div>
        </div>
      )}
    </div>
  );
};
