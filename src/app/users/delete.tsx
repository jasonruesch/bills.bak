import { Params, redirect } from 'react-router-dom';

import { deleteUser } from '@/data';

export async function action({ params }: { params: Params<string> }) {
  // throw new Error('oh dang!');
  await deleteUser(params.userId as string);
  return redirect('/users');
}
