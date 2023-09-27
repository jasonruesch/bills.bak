import { Form, useNavigate } from 'react-router-dom';

import { Bill } from '@/data';

export function BillForm({ bill }: { bill?: Bill }) {
  const navigate = useNavigate();

  return (
    <Form method="post" id="bill-form">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          placeholder="Name"
          defaultValue={bill?.name}
          required
          autoFocus
        />
      </label>
      <p>
        <span>Amount & Due Date</span>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          defaultValue={bill?.amount}
          required
        />
        <input
          type="date"
          name="dueDate"
          placeholder="Due date"
          defaultValue={bill?.dueDate.toISOString().slice(0, 10)}
          required
        />
      </p>
      <label>
        <span>Paid</span>
        <input
          type="checkbox"
          name="paid"
          placeholder="Paid"
          defaultChecked={bill?.paid}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() =>
            bill?.id ? navigate(`../${bill.id}`) : navigate('..')
          }
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
