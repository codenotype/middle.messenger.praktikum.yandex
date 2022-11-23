import { inputs } from './input.tmpl';
import { compile } from 'handlebars';
import Block from '../../utils/react/Block';
import { Events } from '../../utils/react/types';
import { validateInput } from '../../utils/validate';
import store, { storeEvents } from '../../utils/store/Store';

interface InputPropsBase {
  label?: string;
  type?: string;
  id: string;
  val?: string;
  events?: Events;
}

interface InputPropsChat {
  id: string;
  src: string;
  events?: Events;
}

export class Input extends Block<InputPropsBase> {
  constructor(props: InputPropsBase) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(compile(inputs.inputBase), this.props);
  }
}

export class InputProfile extends Block {
  constructor(props: InputPropsBase) {
    super(props);

    store.on(storeEvents.updated, ({ user }) => {
      if (user && this.props.id) {
        this.setProps({ val: user[this.props.id] });
      }
    });
  }

  protected componentDidUpdate(_o: any, _n: any): boolean {
    return true;
  }

  protected render(): DocumentFragment {
    return this.swap(compile(inputs.inputProfile), this.props);
  }
}

export class InputChat extends Block {
  constructor(props: InputPropsChat) {
    super(props);
  }

  protected init(): void {
    this.children.Input = new Input({
      id: this.props.id,
      type: 'text',
      events: {
        input: validateInput,
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(compile(inputs.inputChat), this.props);
  }
}
