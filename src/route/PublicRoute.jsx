import { NAVIGATE_ROUTES } from '../constant/routePath';
import CommingSoonPage from '../screen/CommingSoon';
import { HomePage } from '../screen/home/HomePage';

export const publicRoute = [
  {
    id: 'home',
    path: NAVIGATE_ROUTES.HOME,
    element: <HomePage />,
    index: true
  },
  {
    id: 'bus_tickets',
    path: NAVIGATE_ROUTES.BUS_TICKETS,
    element: <CommingSoonPage />
  },
  {
    id: 'concert_tickets',
    path: NAVIGATE_ROUTES.CONCERT_TICKETS,
    element: <CommingSoonPage />
  },
  {
    id: 'event_tickets',
    path: NAVIGATE_ROUTES.EVENT_TICKETS,
    element: <CommingSoonPage />
  }
];
