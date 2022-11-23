import Handlebars from 'handlebars';
import { buttonBase, buttonDanger } from './button.tmpl';
import Block from '../../utils/react/Block';
import { Events } from '../../utils/react/types';

Handlebars.registerPartial('buttonBase', buttonBase);
Handlebars.registerPartial('buttonDanger', buttonDanger);

interface ButtonProps {
  label: string;
  type?: string;
  events: Events;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(buttonBase), this.props);
  }
}
