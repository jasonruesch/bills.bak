import { Params, redirect, useLoaderData } from 'react-router-dom';

import { Contact, updateContact } from '@/data';
import { fromEntries } from '@/lib';

import { ContactForm } from './components/form';

export async function action({
  request,
  params,
}: {
  request: Request;
  params: Params<string>;
}) {
  const formData = await request.formData();
  const updates = fromEntries(formData) as Contact;
  await updateContact(params.contactId as string, updates);

  return redirect(`/contacts/${params.contactId}`);
}

export function EditContactPage() {
  const { contact } = useLoaderData() as { contact: Contact };

  return <ContactForm contact={contact} />;
}
