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
    try {
      let { user } = store.getState();

      if (!user) {
        user = await AuthController.getUser();
      }

      store.set('user', user);

      return user;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  async saveData(data: UserProfile) {
    try {
      await this.api.changeProfile(data);
    } catch (err) {
      console.error('Failed to save data', err);
    }
  }

  async saveAvatar() {
    try {
      await this.api.changeAvatar();
    } catch (err) {
      if (err === null) {
        router.go(routes.serverError);
      }
    }
  }

  async savePassword(data: UserPasswords) {
    try {
      await this.api.changePassword(data);
    } catch (err) {
      console.error('Failed to save password', err);
    }
  }

  async searchUser(login: string) {
    try {
      return this.api.getUserByLogin(login);
    } catch (err) {
      console.error('Unable to search for user', err);

      return [];
    }
  }
}

export default new UserController();
