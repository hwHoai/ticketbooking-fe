import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/publicroute';
import { logger } from './util/logger';
import { useEffect, useState } from 'react';
import { axiosInstance } from './config/axios.config';
import { UserAuthenticationService } from './service/user/auth/authentication.service';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated) {
          const token = await UserAuthenticationService.oauthGetAccessToken();
          logger.info('Access token fetched successfully', token);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsAuthenticated(true);
        }
      } catch (error) {
        logger.error('Error fetching access token', error);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
      <Routes>
        {privateRoute.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
