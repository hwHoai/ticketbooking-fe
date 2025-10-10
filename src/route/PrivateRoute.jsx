import { lazy } from 'react';
import { ACCOUNT, EVENT } from '../constant/routePath';

const AccountPage = lazy(() => import('../screen/account/AccountPage'));
const CreateNewEventPage = lazy(() => import('../screen/create_event/CreateNewEventPage'));

export const privateRoute = [
  {
    id: 'account-management',
    path: ACCOUNT.MANAGEMENT_PAGE,
    element: <AccountPage />
  },
  {
    id: 'event-creation',
    path: EVENT.CREATE,
    element: <CreateNewEventPage />
  }
];
