import { Routes, Route, BrowserRouter } from 'react-router';
import { privateRoute } from './route/PrivateRoute';
import { publicRoute } from './route/PublicRoute';
import { logger } from './util/logger';
import { Cookie } from './util/cookie.util';
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './lib/redux/auth.slice';
import { UserAuthenticationService } from './service/user/user.authentication.service';
import { UserInfoService } from './service/user/user.info.service';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constant/common';
import { jwtDecode } from 'jwt-decode';
import NotFound from './screen/NotFound';

export const App = () => {
  const accessToken = Cookie.get(ACCESS_TOKEN_KEY);
  const refreshToken = Cookie.get(REFRESH_TOKEN_KEY);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const renewAccessToken = async () => {
    setIsLoading(true);
    try {
      const {
        access_token: newAccessToken,
        expires_in,
        id_token
      } = await UserAuthenticationService.oauthRefreshToken(refreshToken).then((res) => res.data);
      console.log('newAccessToken', newAccessToken);
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
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    const isAuthenticated = !!refreshToken;
    if (!isAuthenticated) return;
    if (!accessToken) {
      renewAccessToken();
      return;
    }
    fetchUserInfo();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        {isAuthenticated ? privateRoute.map((route, i) => <Route key={i} {...route} />) : <></>}
        {!isLoading && <Route path='*' element={<NotFound />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
