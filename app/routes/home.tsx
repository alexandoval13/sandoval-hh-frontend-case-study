import Dashboard from '~/components/Dashboard';
import type { Route } from './+types/home';

import AutoRefetch from '~/components/AutoRefetch';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <>
      <AutoRefetch />
      <div className="p-1">
        <Dashboard />
      </div>
    </>
  );
}
