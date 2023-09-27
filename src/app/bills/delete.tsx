import { Params, redirect } from 'react-router-dom';

import { deleteBill } from '@/data';

export async function action({ params }: { params: Params<string> }) {
  await deleteBill(params.billId as string);

  return redirect('/bills');
}
