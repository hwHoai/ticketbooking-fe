import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { logger } from './util/logger';
import { Cookie } from './util/cookie,util';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './lib/redux/auth.slice';
import { UserAuthenticationService } from './service/user/user.authentication.service';

export const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const checkAuthentication = useCallback(() => {
    const accessToken = Cookie.getCookie('access_token');

    if (!accessToken) {
      dispatch(logout());
      logger.info('No access token found, logging out');
      return false;
    }
    dispatch(login(accessToken));
    return true;
  }, [dispatch]);

  const handleAuthentication = useCallback(
    async (code) => {
      if (!code) {
        logger.error('No authentication code found');
        return;
      }
      const tokenResponse = await UserAuthenticationService.oauthGetAccessToken(code);
      const accessToken = tokenResponse.data.access_token;
      if (!accessToken) {
        logger.error('No access token found');
        return null;
      }

      const tokenExpireTime = new Date(Date.now() + (tokenResponse.data.expires_in - 5 * 60) * 1000).toUTCString(); //expires 5 minutes early
      logger.info(tokenExpireTime);
      Cookie.setCookie('access_token', accessToken, tokenExpireTime, '/');
      dispatch(login(accessToken));
      return accessToken;
    },
    [dispatch]
  );

  useEffect(() => {
    (async () => {
      if (!checkAuthentication()) {
        // User is authenticated
        const authCode = searchParams.get('code');
        const accessToken = await handleAuthentication(authCode);
        logger.info(accessToken);
        if (authCode && !accessToken) {
          UserAuthenticationService.login();
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        {isAuthenticated ? privateRoute.map((route, i) => <Route key={i} {...route} />) : <></>}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
