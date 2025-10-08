import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { logger } from './util/logger';
import { Cookie } from './util/cookie.util';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './lib/redux/auth.slice';
import { UserAuthenticationService } from './service/user/user.authentication.service';
import { UserInfoService } from './service/user/user.info.service';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constant/common';
import { jwtDecode } from 'jwt-decode';
import NotFound from './screen/NotFound';

const PrivateRoute = ({ children }) => {
  const accessToken = Cookie.get(ACCESS_TOKEN_KEY);
  const refreshToken = Cookie.get(REFRESH_TOKEN_KEY);
  const dispatch = useDispatch();

  const renewAccessToken = async () => {
    try {
      const {
        access_token: newAccessToken,
        expires_in,
        id_token
      } = await UserAuthenticationService.oauthRefreshToken(refreshToken).then((res) => res.data);
      Cookie.set(ACCESS_TOKEN_KEY, newAccessToken, new Date(Date.now() + expires_in * 1000).toUTCString());
      const userInfo = jwtDecode(id_token);
      dispatch(
        login({
          userId: userInfo.sub.split('|')[1],
          userName: userInfo.given_name,
          userAvatar: userInfo.picture
        })
      );
    } catch (error) {
      logger.error('Error during token refresh:', error);
      UserAuthenticationService.login();
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { given_name, picture, sub } = await UserInfoService.getUserData(accessToken).then((res) => res.data);
      dispatch(
        login({
          userId: sub.split('|')[1],
          userName: given_name,
          userAvatar: picture
        })
      );
    } catch (error) {
      logger.error('Error fetching user info:', error);
      UserAuthenticationService.login();
    }
  };

  useLayoutEffect(() => {
    if (!refreshToken) {
      UserAuthenticationService.login();
    }
    if (!accessToken) {
      renewAccessToken();
      return;
    }
    fetchUserInfo();
  }, []);
  return children;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        {privateRoute.map((route, i) => {
          const { element, ...rest } = route;
          return <Route key={i} {...rest} element={<PrivateRoute>{element}</PrivateRoute>} />;
        })}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
