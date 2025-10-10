import { useEffect } from 'react';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constant/common';
import { UserAuthenticationService } from '../service/user/user.authentication.service';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login, logout } from '../lib/redux/auth.slice';
import { logger } from '../util/logger';
import { useNavigate } from 'react-router';
import { Cookie } from '../util/cookie.util';

const AuthCallback = () => {
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const dispatch = useDispatch();
  const isLogoutCallback = url.searchParams.get('logout');

  const loginWithAuth0Code = async () => {
    try {
      const tokenData = await UserAuthenticationService.oauthGetAccessToken(code).then((res) => res.data);
      const { access_token, refresh_token, expires_in, id_token } = tokenData;
      const userInfo = jwtDecode(id_token);
      Cookie.set(ACCESS_TOKEN_KEY, access_token, new Date(Date.now() + expires_in * 1000).toUTCString());
      Cookie.set(REFRESH_TOKEN_KEY, refresh_token, new Date(Date.now() + 604800000).toUTCString()); // 7 days
      dispatch(
        login({
          userId: userInfo.sub.split('|')[1],
          userName: userInfo.given_name,
          userAvatar: userInfo.picture
        })
      );
    } catch (error) {
      logger.error('Error fetching access token:', error);
    } finally {
      const from = Cookie.get('redirect_uri') || '/';
      navigate(from, { replace: true });
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    window.location.href = '/';
  };

  useEffect(() => {
    if (isLogoutCallback) {
      handleLogout();
    }
    if (!code) return;
    loginWithAuth0Code();
  }, []);
  return null;
};

export default AuthCallback;
