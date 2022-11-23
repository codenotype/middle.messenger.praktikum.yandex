import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { Link } from '../../components/link';
import { routes } from '../../utils/router/types';

export const login = {
  ButtonLogin: new Button({
    label: 'Sign in',
    type: 'submit',
    events: {},
  }),
  LoginInput: new Input({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: '',
  }),
  PasswordInput: new Input({
    label: 'Password',
    id: 'password',
    type: 'password',
    val: '',
  }),
  Link: new Link({
    label: 'Create account',
    to: routes.signup,
  }),
};

export const account = {
  ButtonAccount: new Button({
    label: 'Create account',
    type: 'submit',
    events: {},
  }),

  InputLogin: new Input({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: '',
  }),

  InputEmail: new Input({
    label: 'Email',
    id: 'email',
    type: 'email',
    val: '',
  }),

  InputFirstName: new Input({
    type: 'text',
    label: 'First Name',
    id: 'first_name',
    val: '',
  }),

  InputSecondName: new Input({
    type: 'text',
    label: 'Second Name',
    id: 'second_name',
    val: '',
  }),

  InputPhone: new Input({
    type: 'text',
    label: 'Phone',
    id: 'phone',
    val: '',
  }),

  InputPassword: new Input({
    label: 'Password',
    id: 'password',
    type: 'password',
    val: '',
  }),

  InputPasswordAgain: new Input({
    label: 'Password Again',
    id: 'password_again',
    type: 'password',
    val: '',
  }),

  Link: new Link({
    label: 'Sign in',
    to: routes.index,
  }),
};
