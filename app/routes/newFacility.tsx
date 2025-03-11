import PageTitle from '~/components/PageTitle';
import type { Route } from './+types/newFacility';
import AddFacilityForm from '~/components/Form';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Facility Page' },
    { name: 'description', content: 'Add a new facility form.' },
  ];
}

export default function NewFacility() {
  return (
    <div className="p-1 gap">
      <PageTitle title={'New Facility Form'} />
      <AddFacilityForm />
    </div>
  );
}
