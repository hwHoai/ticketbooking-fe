import { NAVIGATE_ROUTES, TICKET_ROUTE } from '../constant/routePath';
import CommingSoonPage from '../screen/CommingSoon';
import { HomePage } from '../screen/home/HomePage';
import { TicketListPage } from '../screen/ticket_list/TicketListPage';
import { TicketDetailPage } from '../screen/ticket_detail/TicketDetailPage';
import { AuthCallback } from '../screen/Auth-Callback';

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
  },
  {
    id: 'ticket-detail',
    path: TICKET_ROUTE.DETAIL,
    element: <TicketDetailPage />
  },
  {
    id: 'all_tickets',
    path: '/all_tickets',
    element: <TicketListPage />
  },
  {
    id: 'auth-callback',
    path: '/auth_callback',
    element: <AuthCallback />
  }
];
