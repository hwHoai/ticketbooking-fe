import { ACCOUNT, EVENT } from '../constant/routePath';
import { AccountPage } from '../screen/account/AccountPage';
import { CreateNewEventPage } from '../screen/create_event/CreateNewEventPage';

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
