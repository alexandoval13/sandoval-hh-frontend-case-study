import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Facility Page' },
    { name: 'description', content: 'Details for facility' },
  ];
}

export default function Facility() {
  return <>THIS WILL BE FACILITY PAGE</>;
}
