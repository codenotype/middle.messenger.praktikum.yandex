import { errorPage } from './error.tmpl';
import { renderPage } from '../../utils/render';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { Button } from '../../components/button';

interface ErrorPageProps {
  code: string;
  message: string;
}

export class ErrorPage404 extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected init(): void {
    this.children.ButtonBack = new Button({
      label: 'Back to home',
      type: 'button',
      events: {
        click: () => console.log('going back'),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(errorPage), this.props);
  }
}

export class ErrorPage500 extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected init(): void {
    this.children.ButtonBack = new Button({
      label: 'Back to home',
      type: 'button',
      events: {
        click: () => console.log('going back'),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(errorPage), this.props);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderPage(
    '#btn-404',
    new ErrorPage404({
      code: '404',
      message: 'Oops, the page doesn’t exist',
    })
  );
  renderPage(
    '#btn-500',
    new ErrorPage500({
      code: '500',
      message: 'Sorry, we’re already fixing it',
    })
  );
});
