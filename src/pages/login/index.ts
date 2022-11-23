import Block from '../../utils/react/Block';
import Hbs from 'handlebars';
import { loginForm, createAccountForm } from './login.tmpl';
import { account, login } from './data';
import { Events } from '../../utils/react/types';
import { collect } from '../../utils/collect';
import { validateInput } from '../../utils/validate';
import AuthController from '../../controllers/AuthController';
import { SigninData, SignupData } from '../../api/AuthApi';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';

interface FormProps {
  classes?: string;
  formTitle: string;
  events?: Events;
}

const events = {
  submit: (event: SubmitEvent) => {
    const { data, isValid } = collect(event);
    const { password_again, ...rest } = data;
    const { login, password } = rest;

    if (isValid) {
      (event.target as HTMLElement)?.id === 'account'
        ? AuthController.signup(rest as unknown as SignupData)
        : AuthController.signin({ login, password } as unknown as SigninData);
    } else {
      alert('Fields are filled incorrectly');
    }
  },
  focusin: validateInput,
  focusout: validateInput,
  input: validateInput,
};

export class AuthForm extends Block<FormProps> {
  constructor(props: FormProps) {
    super({ ...props, events, formTitle: 'Enter' });

    AuthController.getUser().then(() => router.go(routes.chats));
  }

  protected init(): void {
    this.children = login;
  }

  protected render(): DocumentFragment {
    return this.swap(Hbs.compile(loginForm), this.props);
  }
}

export class AccountForm extends Block<FormProps> {
  constructor(props: FormProps) {
    super({
      ...props,
      events: {
        ...events,
      },
      formTitle: 'Registration',
    });
  }

  protected init(): void {
    this.children = account;
  }

  protected render(): DocumentFragment {
    return this.swap(Hbs.compile(createAccountForm), this.props);
  }
}
