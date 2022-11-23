import Handlebars from 'handlebars';
import { menu } from './menu.tmpl';
import Block from '../../utils/react/Block';
import { option } from './menu.tmpl';
import { Events } from '../../utils/react/types';

interface OptionProps {
  icon: any;
  label: string;
  rotated: string;
  events?: Events;
}

interface MenuProps {
  classes: string;
  data: any;
}

export class MenuOption extends Block {
  constructor(props: OptionProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(option), this.props);
  }
}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super(props);
  }

  protected init(): void {
    this.children = this.props.data;
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(menu), this.props);
  }
}
