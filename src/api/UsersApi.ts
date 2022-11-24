import BaseApi from './BaseApi';
import { User, UserProfile } from './types';

export class UsersApi extends BaseApi {
  constructor() {
    super('/user');
  }

  async changeProfile(data: UserProfile) {
    return this.http.put('/profile', { data });
  }

  async changeAvatar() {
    const form = document.querySelector('#form-load') as HTMLFormElement;

    return this.http.put('/profile/avatar', {
      data: new FormData(form),
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async changePassword(data: { oldPassword: string; newPassword: string }) {
    return this.http.put('/password', { data });
  }

  async getUserByLogin(login: string) {
    return this.http.post('/search', { data: { login } }) as Promise<User[]>;
  }
}

export default new UsersApi();
