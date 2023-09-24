import { Params, redirect, useLoaderData } from 'react-router-dom';

import { User, updateUser } from '@/data';
import { fromEntries } from '@/lib';

import Styles from '../styles';
import { UserForm } from './components/form';

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const formData = await request.formData();
  const updates = fromEntries(formData) as User;
  await updateUser(params.userId as string, updates);

  return redirect(`/users/${params.userId}`);
}

export function EditUserPage() {
  const { user } = useLoaderData() as { user: User };

  return (
    <>
      <Styles />

      <div id="detail">
        <UserForm user={user} />
      </div>
    </>
  );
}
