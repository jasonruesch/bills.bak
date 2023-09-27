import {
  Form,
  Params,
  useFetcher,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';

import { Bill, getBill, updateBill } from '@/data';

import Styles from '../styles';

export async function loader({ params }: { params: Params<string> }) {
  const bill = await getBill(params.billId as string);
  if (!bill) {
    throw new Response(null, { status: 404, statusText: 'Not Found' });
  }

  return { bill };
}
export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const formData = await request.formData();

  return updateBill(params.billId as string, {
    paid: formData.get('paid') === 'true',
  });
}

export function BillPage() {
  const { bill } = useLoaderData() as { bill: Bill };
  const navigate = useNavigate();

  return (
    <>
      <Styles />

      <div id="detail">
        <button type="button" onClick={() => navigate('..')} className="mb-8">
          Back
        </button>

        <div id="bill">
          <div>
            <h1>
              {bill.name ? bill.name : <i>No Name</i>} <Paid bill={bill} />
            </h1>

            <p>
              {bill.amount.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}

              {bill.dueDate && (
                <>
                  {' '}
                  due{' '}
                  <time dateTime={bill.dueDate.toString()}>
                    {Intl.DateTimeFormat('en-US', {
                      dateStyle: 'short',
                    }).format(bill.dueDate)}
                  </time>
                </>
              )}
            </p>

            <div>
              <Form action="edit">
                <button type="submit">Edit</button>
              </Form>
              <Form
                method="post"
                action="delete"
                onSubmit={(event) => {
                  if (
                    // eslint-disable-next-line no-restricted-globals
                    !confirm('Please confirm you want to delete this record.')
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button type="submit">Delete</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Paid({ bill }: { bill: Bill }) {
  const fetcher = useFetcher();
  let paid = bill.paid;
  if (fetcher.formData) {
    paid = fetcher.formData.get('paid') === 'true';
  }

  return (
    <fetcher.Form method="post">
      <button
        type="submit"
        name="paid"
        value={paid ? 'false' : 'true'}
        aria-label={paid ? 'Mark as unpaid' : 'Mark as paid'}
        className="flex items-center gap-1"
      >
        <span>Paid</span>
        {paid ? '✔' : '✘'}
      </button>
    </fetcher.Form>
  );
}
