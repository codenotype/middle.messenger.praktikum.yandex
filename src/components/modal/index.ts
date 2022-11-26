import { modalLoad, modalUser } from './modal.tmpl';
import Block from '../../utils/react/Block';
import { Button } from '../button';
import Handlebars from 'handlebars';
import { Input } from '../input';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';
import { collect } from '../../utils/collect';
import { Events } from '../../utils/react/types';

interface ModalProps {
  title: string;
}

interface ModalLoadProps extends ModalProps {
  events: Events;
}

export class ModalLoad extends Block {
  constructor(props: ModalLoadProps) {
    super(props);
  }

  protected init(): void {
    this.children = {
      InputFile: new Input({
        type: 'file',
        id: 'file-input',
        val: '',
        label: '',
        events: {
          change: (event: any) => {
            const title = document.querySelector('.modal h1');
            const input = event.target;

            let file = null;

            if (input?.files) {
              file = input.files[0];
            }

            if (title) {
              if (file) {
                title.textContent = 'File loaded';
              } else {
                title.textContent = 'File load error';
              }
            }
          },
        },
      }),

      ButtonLoad: new Button({
        label: 'Change',
        type: 'submit',
        events: {},
      }),

      ButtonClose: new Button({
        label: 'Close',
        type: 'button',
        events: {
          click: () => {
            const modal = document.querySelector('.modal');
            const input = modal?.querySelector('input');
            const title = modal?.querySelector('h1');

            if (input) {
              input.value = '';
            }

            if (title) {
              title.textContent = 'Load file';
            }

            modal?.classList.add('modal_hidden');
          },
        },
      }),
    };
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(modalLoad), this.props);
  }
}

export class ModalUser extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        submit: (data: SubmitEvent) => {
          collect(data);
          router.go(routes.chats);
        },
      },
    });
  }

  protected init(): void {
    const isAdding = this.props.title === 'Add user';

    this.children.ButtonAction = new Button({
      label: isAdding ? 'Add' : 'Delete',
      events: {},
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
