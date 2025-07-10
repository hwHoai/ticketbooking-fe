import { request } from '../../../util/request';

export class UserAuthenticationService {
  static async oauthGetAccessToken() {
    return request({
      method: 'GET',
      url: '/auth/access_token',
      header: {
        'Content-Type': 'application/json'
      }
    });
  }
}
