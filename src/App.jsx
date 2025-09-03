import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { logger } from './util/logger';
import { Cookie } from './util/cookie,util';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './lib/redux/auth.slice';
import { UserAuthenticationService } from './service/user/user.authentication.service';
import { UserInfoService } from './service/user/user.info.service';

export const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const currentAccessToken = Cookie.getCookie('access_token');
  const auth0Code = searchParams.get('code');
  const { isAuthenticated, accessToken, userName, userAvatar } = useSelector((state) => state.auth);

  const handleAuthentication = useCallback(async (code) => {
    if (!code) {
      logger.error('No authentication code found');
      return;
    }
    const tokenResponse = await UserAuthenticationService.oauthGetAccessToken(code);
    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const tokenExpireTime = new Date(Date.now() + (tokenResponse.data.expires_in - 5 * 60) * 1000).toUTCString(); //expires 5 minutes early
    logger.info(tokenExpireTime);
    Cookie.setCookie('access_token', accessToken, tokenExpireTime, '/');
    return accessToken;
  }, []);

  useEffect(() => {
    (async () => {
      if (currentAccessToken) {
        if (isAuthenticated && accessToken && userName && userAvatar) {
          return;
        }
        await UserInfoService.getUserData(currentAccessToken)
          .then((res) => ({ userName: res.data.name, userAvatar: res.data.picture, accessToken: currentAccessToken }))
          .then(async (userData) => {
            dispatch(login(userData));
          })
          .catch((err) => {
            logger.error(err);
          });
        return;
      }

      if (auth0Code) {
        await handleAuthentication(auth0Code)
          .then(async (accessToken) => {
            const userDataResponse = await UserInfoService.getUserData(accessToken);
            return {
              userAvatar: userDataResponse.data.picture,
              userName: userDataResponse.data.name,
              accessToken
            };
          })
          .then(async (userData) => {
            dispatch(login(userData));
          })
          .catch((err) => {
            UserAuthenticationService.login();
            logger.error(err);
          });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccessToken, auth0Code]);

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
