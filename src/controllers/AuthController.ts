import authApi, { AuthApi, SigninData, SignupData } from '../api/AuthApi';
import router from '../utils/router/Router';
import { routes } from '../utils/router/types';
import store from '../utils/store/Store';

export class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = authApi;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.getUser();

      router.go(routes.profile);
    } catch (err) {
      console.error(err);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      router.go(routes.chats);
    } catch (err) {
      console.error(err);
    }
  }

  async getUser() {
    const user = await this.api.read();

    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (err) {
      console.error(err);
    }
  }
}

export default new AuthController();
