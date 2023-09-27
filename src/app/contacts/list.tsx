import { useEffect, useRef } from 'react';
import {
  Form,
  NavLink,
  Outlet,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router-dom';

import { Contact, getContacts } from '@/data';

import Styles from '../styles';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q as string);

  return { contacts, q };
}

export function ContactListPage() {
  const { contacts, q } = useLoaderData() as {
    contacts: Contact[];
    q: string | null;
  };
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const searchRef = useRef<HTMLInputElement>(null);

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isFirstSearch = q === null;
    const formData = new FormData(event.target.form ?? undefined);
    if (formData.get('q') === '') formData.delete('q');
    submit(formData, { replace: !isFirstSearch });
  };

  useEffect(() => {
    if (searchRef.current) searchRef.current.value = q ?? '';
  }, [q]);

  return (
    <>
      <Styles />

      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              ref={searchRef}
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q ?? ''}
              onChange={handleSearchChange}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <button type="button" onClick={() => navigate('new')}>
            New
          </button>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={contact.id}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
