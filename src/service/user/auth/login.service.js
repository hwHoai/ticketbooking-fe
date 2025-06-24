import { request } from '../../../util/request';

export class UserLoginService {
  static async login({ email, password }) {
    return await request(
      {
        method: 'POST',
        url: '/auth/login'
      },
      {
        email,
        password
      }
    );
  }
}
