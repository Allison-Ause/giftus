import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className={''}>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
