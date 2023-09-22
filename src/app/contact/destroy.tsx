import { Params, redirect } from 'react-router-dom';

import { deleteContact } from '@/data';

export async function action({ params }: { params: Params<string> }) {
  // throw new Error('oh dang!');
  await deleteContact(params.contactId as string);
  return redirect('/contacts');
}
