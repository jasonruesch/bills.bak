import { redirect } from 'react-router-dom';

import { User, createUser } from '@/data';
import { fromEntries } from '@/lib';

import Styles from '../styles';
import { UserForm } from './components/form';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const updates = fromEntries(formData) as User;
  await createUser(updates);

  return redirect('/users');
}

export function NewUserPage() {
  return (
    <>
      <Styles />

      <div id="detail">
        <UserForm />
      </div>
    </>
  );
}
