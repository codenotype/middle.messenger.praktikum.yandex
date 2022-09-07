import { modalLoad, modalUser } from './modal.tmpl';
import { renderPage } from '../../utils/render';
import Block from '../../utils/react/Block';
import { Button } from '../button';
import Handlebars from 'handlebars';
import { Input } from '../input';

interface ModalProps {
  title: string;
}

interface ModalLoadProps extends ModalProps {
  label: string;
}

export class ModalLoad extends Block {
  constructor(props: ModalLoadProps) {
    super(props);
  }

  protected init(): void {
    this.children.ButtonLoad = new Button({
      label: 'Change',
      events: {
        click: () => console.log('loaded'),
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(modalLoad), this.props);
  }
}

export class ModalUser extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  protected init(): void {
    const isAdding = this.props.title === 'Add user';

    this.children.ButtonAction = new Button({
      label: isAdding ? 'Add' : 'Delete',
      events: {
        click: () => console.log('action'),
      },
    });
    this.children.InputLogin = new Input({
      type: 'text',
      id: isAdding ? 'user-create' : 'user-delete',
      val: '',
      label: 'Login',
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(modalUser), this.props);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderPage(
    '#btn-load',
    new ModalLoad({
      title: 'Load file',
      label: 'Choose file on your computer',
    })
  );
  renderPage(
    '#btn-loaded',
    new ModalLoad({
      title: 'File loaded',
      label: 'filename.png',
    })
  );
  renderPage(
    '#btn-load-error',
    new ModalLoad({
      title: 'Error (try again)',
      label: 'Choose file on your computer',
    })
  );
  renderPage(
    '#btn-user-creation',
    new ModalUser({
      title: 'Add user',
    })
  );
  renderPage(
    '#btn-user-removal',
    new ModalUser({
      title: 'Delete user',
    })
  );
});
