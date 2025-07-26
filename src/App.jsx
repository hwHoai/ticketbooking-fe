import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/publicroute';
import { logger } from './util/logger';
import { use, useCallback, useEffect, useState } from 'react';
import { axiosInstance } from './config/axios.config';
import { UserAuthenticationService } from './service/user/auth/authentication.service';
import { AuthProvider } from './components/provider/auth.provider';
import { useAuth0 } from '@auth0/auth0-react';
import { TokenService } from './service/common/token.service';
import { CookieService } from './service/common/cookie.service';
import { t } from 'i18next';

export const App = () => {
  //Auth Handleing
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { loginWithRedirect } = useAuth0();

  // Fetch access token and set authentication state
  const fetchAccessToken = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        const token = await UserAuthenticationService.oauthGetAccessToken();
        if (!token) {
          logger.error('No access token received', 'Authentication');
          throw new Error({
            message: 'No access token received',
            status: 401
          });
        }
        setIsAuthenticated(true);
        return token;
      }
    } catch (error) {
      switch (error.status) {
        case 401:
          logger.error('Unauthorized access - redirecting to login', 'Authentication');
          loginWithRedirect();
          break;
        default:
          logger.error('Error fetching access token', error);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const token = await fetchAccessToken();
      if (token?.status === 200) {
        const tokenExpiration = new Date(Date.now() + token.data?.expires_in * 1000).toUTCString();
        console.log('Token expiration date:', tokenExpiration);
        CookieService.setCookie('access_token', token.data?.access_token, tokenExpiration);
      }
    })();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <AuthProvider.Provider
        value={{ isAuthenticated, setIsAuthenticated, userGlobalInfo: { name: '' }, setUserGlobalInfo: () => {} }}
      >
        <Routes>
          {publicRoute.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {privateRoute.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Routes>
      </AuthProvider.Provider>
    </BrowserRouter>
  );
};

export default App;
