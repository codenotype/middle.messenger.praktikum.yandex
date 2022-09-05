import { Button } from '../../components/button';
import { Input } from '../../components/input';

export const login = {
  ButtonLogin: new Button({
    label: 'Sign in',
    type: 'submit',
  }),
  LoginInput: new Input({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: 'yandex',
  }),
  PasswordInput: new Input({
    label: 'Password',
    id: 'password',
    type: 'password',
    val: 'praktikum',
  }),
};

export const account = {
  ButtonAccount: new Button({
    label: 'Create account',
    type: 'submit',
  }),

  InputLogin: new Input({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: 'yandex',
  }),

  InputEmail: new Input({
    label: 'Email',
    id: 'email',
    type: 'email',
    val: 'user@yandex.ru',
  }),

  InputFirstName: new Input({
    type: 'text',
    label: 'First Name',
    id: 'first_name',
    val: 'yandex',
  }),

  InputSecondName: new Input({
    type: 'text',
    label: 'Second Name',
    id: 'second_name',
    val: 'yandex',
  }),

  InputPhone: new Input({
    type: 'text',
    label: 'Phone',
    id: 'phone',
    val: '123456789',
  }),

  InputPassword: new Input({
    label: 'Password',
    id: 'password',
    type: 'password',
    val: 'praktikum',
  }),

  InputPasswordAgain: new Input({
    label: 'Password Again',
    id: 'password_again',
    type: 'password',
    val: 'praktikum',
  }),
};
