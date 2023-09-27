import { useEffect, useRef } from 'react';
import {
  Form,
  NavLink,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router-dom';

import { User, getSelectedUser, getUsers } from '@/data';

import Styles from '../styles';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const users = await getUsers(q as string);
  const selectedUser = await getSelectedUser();

  return { users, selectedUser, q };
}

export function UserListPage() {
  const { users, selectedUser, q } = useLoaderData() as {
    users: User[];
    selectedUser: User | null;
    q: string | null;
  };
  const navigation = useNavigation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const searchRef = useRef<HTMLInputElement>(null);

  const isUserActive = (user: User) => user.id === selectedUser?.id;
  const isSearching =
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

      <div id="content">
        <h1>React Router Users</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              ref={searchRef}
              id="q"
              className={isSearching ? 'loading' : ''}
              aria-label="Search users"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q ?? ''}
              onChange={handleSearchChange}
            />
            <div id="search-spinner" aria-hidden hidden={!isSearching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <button type="button" onClick={() => navigate('new')}>
            New
          </button>
        </div>
        <nav>
          {users.length ? (
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <NavLink
                    to={user.id}
                    className={({ isActive = false, isPending }) =>
                      isActive || isUserActive(user)
                        ? 'active'
                        : isPending
                        ? 'pending'
                        : ''
                    }
                  >
                    {user.first || user.last ? (
                      <>
                        {user.first} {user.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {user.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No users</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
