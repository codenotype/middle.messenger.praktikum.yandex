import BaseApi from './BaseApi';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData extends SigninData {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
}

export interface User extends Omit<SignupData, 'password'> {
  id: number;
  display_name: string;
  avatar: string;
}

export class AuthApi extends BaseApi {
  constructor() {
    super('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', { data });
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  read(): Promise<unknown> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthApi();
