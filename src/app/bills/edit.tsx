import { Params, redirect, useLoaderData } from 'react-router-dom';

import { Bill, updateBill } from '@/data';
import { formDataToBill } from '@/lib';

import Styles from '../styles';
import { BillForm } from './components/form';

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const id = params.billId as string;
  const formData = await request.formData();
  formData.append('id', id);
  const updates = formDataToBill(formData);
  await updateBill(id, updates);

  return redirect(`/bills/${id}`);
}

export function EditBillPage() {
  const { bill } = useLoaderData() as { bill: Bill };

  return (
    <>
      <Styles />

      <div id="detail">
        <BillForm bill={bill} />
      </div>
    </>
  );
}
