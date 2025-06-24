import { ROUTE_PATH } from '../constant/routePath';
import { HomePage } from '../screen/home/HomePage';

export const publicRoute = [
  {
    id: 'newfeed',
    path: ROUTE_PATH.NEW_FEED,
    element: <HomePage />,
    index: false
  },
  {
    id: 'home',
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
    index: true
  }
];
