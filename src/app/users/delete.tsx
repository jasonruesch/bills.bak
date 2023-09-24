import { Params, redirect } from 'react-router-dom';

import { deleteUser } from '@/data';

export async function action({ params }: { params: Params<string> }) {
  await deleteUser(params.userId as string);

  return redirect('/users');
}
