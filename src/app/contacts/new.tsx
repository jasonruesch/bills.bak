import { redirect } from 'react-router-dom';

import { Contact, createContact } from '@/data';
import { fromEntries } from '@/lib';

import { ContactForm } from './form';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const updates = fromEntries(formData) as Contact;
  const contact = await createContact(updates);
  return redirect(`/contacts/${contact.id}`);
}

export function NewContactPage() {
  return <ContactForm />;
}
