import { NavLink, Outlet } from 'react-router-dom';

export function App() {
  return (
    <>
      <header className="h-16 flex items-center px-8 bg-neutral-200 border-b border-neutral-300">
        <nav>
          <ul className="flex gap-2">
            <li>
              <NavLink
                to="/bills"
                className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
              >
                Bills
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
