import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Alerts Page' },
    { name: 'description', content: 'Alerts history and settings' },
  ];
}

export default function Alerts() {
  return <>THIS WILL BE ALERTS PAGE</>;
}
