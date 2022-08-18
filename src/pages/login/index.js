import { loginForm } from './login.tmpl';
import { createAccountForm } from './create-account.tmpl';
import { render } from '../../utils/render';

window.addEventListener('DOMContentLoaded', () => {
  const loginData = {
    formTitle: 'Enter',
    link: 'Create account',
    login: 'yandex',
    password: 'praktikum',
  };

  const accountData = {
    formTitle: 'Registration',
    link: 'Sign in',
    first_name: 'yandex',
    second_name: 'praktikum',
    login: 'frontend',
    email: 'frontend@yandex.ru',
    password: '123456',
    phone: '81234567890',
  };

  render('#btn-login', loginForm, loginData);
  render('#btn-account', createAccountForm, accountData);
});
