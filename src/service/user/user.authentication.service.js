import { Cookie } from '../../util/cookie.util';
import { request } from '../../util/request';

const { VITE_AUTH0_AUDIENCE, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_DOMAIN } = import.meta.env;

export class UserAuthenticationService {
  static async login() {
    Cookie.set(
      'redirect_uri',
      window.location.pathname + window.location.search,
      new Date(Date.now() + 1000 * 60 * 5).toUTCString(),
      '/'
    ); // 5 minutes
    const redirectUri = 'http://localhost:5173/auth_callback';
    const authUrl = `https://${VITE_AUTH0_DOMAIN}/authorize?audience=${VITE_AUTH0_AUDIENCE}&response_type=code&client_id=${VITE_AUTH0_CLIENT_ID}&redirect_uri=${redirectUri}&scope=openid%20profile%20email%20offline_access`;
    window.location.href = authUrl;
  }

  static async logout() {
    const redirectUri = 'http://localhost:5173/auth_callback?logout=true';
    const logoutUrl = `https://${VITE_AUTH0_DOMAIN}/v2/logout?client_id=${VITE_AUTH0_CLIENT_ID}&returnTo=${redirectUri}`;
    window.location.href = logoutUrl;
  }

  static async oauthGetAccessToken(code) {
    return request({
      method: 'GET',
      url: `/auth/access_token/${code}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  static async oauthRefreshToken(refreshToken) {
    return request({
      method: 'POST',
      url: `/auth/refresh_token`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        refreshToken: refreshToken
      }
    });
  }
}
