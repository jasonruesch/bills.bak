import { redirect } from 'react-router-dom';

import { createBill } from '@/data';
import { formDataToBill } from '@/lib';

import Styles from '../styles';
import { BillForm } from './components/form';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const updates = formDataToBill(formData);
  await createBill(updates);

  return redirect('/bills');
}

export function NewBillPage() {
  return (
    <>
      <Styles />

      <div id="detail">
        <BillForm />
      </div>
    </>
  );
}
