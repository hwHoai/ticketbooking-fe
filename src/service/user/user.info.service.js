import { request } from '../../util/request';

export class UserInfoService {
  static async getUserData(accessToken) {
    return request({
      method: 'GET',
      url: `/user/1`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
