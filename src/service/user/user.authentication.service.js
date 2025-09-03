import { request } from '../../util/request';

const { VITE_AUTH0_AUDIENCE, VITE_AUTH0_CLIENT_ID, VITE_AUTH0_DOMAIN } = import.meta.env;

export class UserAuthenticationService {
  static async login(redirectUri = 'http://localhost:5173') {
    const authUrl = `https://${VITE_AUTH0_DOMAIN}/authorize?audience=${VITE_AUTH0_AUDIENCE}&response_type=code&client_id=${VITE_AUTH0_CLIENT_ID}&redirect_uri=${redirectUri}&scope=openid%20profile%20email`;
    window.location.href = authUrl;
  }

  static async oauthGetAccessToken(code, redirectUri = 'http://localhost:5173') {
    return request({
      method: 'GET',
      url: `/auth/access_token/${code}?redirect_uri=${redirectUri}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
