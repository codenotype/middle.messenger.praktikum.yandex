import { errorPage } from './error.tmpl';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { Button } from '../../components/button';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';

interface ErrorPageProps {
  code: string;
  message: string;
}

export class ErrorPage404 extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      code: '404',
      message: 'Oops, the page doesn’t exist',
    });
  }

  protected init(): void {
    this.children.ButtonBack = new Button({
      label: 'Back to home',
      type: 'button',
      events: {
        click: () => router.go(routes.profile),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(errorPage), this.props);
  }
}

export class ErrorPage500 extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
      code: '500',
      message: 'Sorry, we’re already fixing it',
    });
  }

  protected init(): void {
    this.children.ButtonBack = new Button({
      label: 'Back to home',
      type: 'button',
      events: {
        click: () => router.go(routes.profile),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(errorPage), this.props);
  }
}
