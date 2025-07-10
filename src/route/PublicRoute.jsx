import { ROUTE_PATH } from '../constant/routePath';
import { HomePage } from '../screen/home/HomePage';

export const publicRoute = [
  {
    id: 'home',
    path: ROUTE_PATH.HOME,
    element: <HomePage />,
    index: true
  }
];
