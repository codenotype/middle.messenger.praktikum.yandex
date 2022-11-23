import { UserPasswords, UserProfile } from '../api/types';
import usersApi, { UsersApi } from '../api/UsersApi';
import router from '../utils/router/Router';
import { routes } from '../utils/router/types';
import store from '../utils/store/Store';
import AuthController from './AuthController';

export class UserController {
  private readonly api: UsersApi;

  constructor() {
    this.api = usersApi;
  }

  async getUser() {
    let { user } = store.getState();

    if (!user) {
      user = await AuthController.getUser();
    }

    store.set('user', user);

    return user;
  }

  async saveData(data: UserProfile) {
    return this.api.changeProfile(data);
  }

  async saveAvatar() {
    try {
      await this.api.changeAvatar();
    } catch(err) {
      if (err === null) {
        router.go(routes.serverError)
      }
    }
  }

  async savePassword(data: UserPasswords) {
    return this.api.changePassword(data);
  }

  async searchUser(login: string) {
    return this.api.getUserByLogin(login);
  }
}

export default new UserController();
