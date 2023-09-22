import { redirect } from 'react-router-dom';

import { User, createUser } from '@/data';
import { fromEntries } from '@/lib';

import { UserForm } from './form';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const updates = fromEntries(formData) as User;
  const user = await createUser(updates);
  return redirect(`/users?id=${user.id}`);
}

export function NewUserPage() {
  return (
    <div id="detail">
      <UserForm />
    </div>
  );
}
