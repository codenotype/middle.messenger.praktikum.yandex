import { inputs } from './input.tmpl';
import { compile } from 'handlebars';
import Block from '../../utils/react/Block';
import { Events } from '../../utils/react/types';
import { validateInput } from '../../utils/validate';

interface InputPropsBase {
  label?: string;
  type?: string;
  id?: string;
  val?: string;
  events?: Events;
}

interface InputPropsChat {
  id: string
  src: string;
  events?: Events;
}

export class Input extends Block {
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
  }

  protected render(): DocumentFragment {
    return this.swap(
      compile(inputs.inputProfile),
      this.props
    );
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
        keypress: (event: any) => {
          if (event.key === 'Enter' && this.props.id === 'message') {
            console.log('message:', event.target.value);
          }
        }
      }
    });
  }

  protected render(): DocumentFragment {
    return this.swap(compile(inputs.inputChat), this.props);
  }
}
