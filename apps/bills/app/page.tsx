import { redirect } from 'next/navigation';

// Import your Client Component
export default async function Page() {
  redirect('/bills');
}
