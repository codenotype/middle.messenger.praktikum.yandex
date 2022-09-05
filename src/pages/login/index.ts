import { loginForm, createAccountForm } from './login.tmpl';
import { renderPage } from '../../utils/render';
import Block from '../../utils/react/Block';
import Hbs from 'handlebars';
import { account, login } from './data';
import { Events } from '../../utils/react/types';
import { collect } from '../../utils/collect';
import { validateInput } from '../../utils/validate';

interface FormProps {
  classes?: string;
  formTitle: string;
  link: string;
  href: string;
  events?: Events;
}

export class AuthForm extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected init(): void {
    this.children = login;
  }

  protected render(): DocumentFragment {
    return this.swap(Hbs.compile(loginForm), this.props);
  }
}

export class AccountForm extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected init(): void {
    this.children = account;
  }

  protected render(): DocumentFragment {
    return this.swap(
      Hbs.compile(createAccountForm),
      this.props
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const events = {
    submit: collect,
    focusin: validateInput,
    focusout: validateInput,
    input: validateInput,
  };

  renderPage(
    '#btn-login',
    new AuthForm({
      formTitle: 'Enter',
      link: 'Create account',
      href: '#',
      events,
    })
  );
  renderPage(
    '#btn-account',
    new AccountForm({
      formTitle: 'Registration',
      link: 'Sign in',
      href: '#',
      events,
    })
  );
});
