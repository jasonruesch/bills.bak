import { Outlet } from 'react-router-dom';

import { Header } from '@/components';

export function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
