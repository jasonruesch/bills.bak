import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
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
        </ul>
      </nav>
    </header>
  );
};
