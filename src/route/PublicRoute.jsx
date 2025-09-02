import { ROUTE_PATH } from '../constant/routePath';
import { HomePage } from '../screen/home/HomePage';
import { DetailPage } from '../screen/detail-page/DetailPage';

export const publicRoute = [
  {
    id: 'home',
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
    index: true
  },
  {
    id: 'ticket-detail',
    path: '/ticket/:id',
    element: <DetailPage />
  }
];
