import Handlebars from 'handlebars';
import { avatar } from './avatar.tmpl';
import Block from '../../utils/react/Block';
import { Events } from '../../utils/react/types';

interface AvatarProps {
  id?: string;
  source: any;
  events?: Events;
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(avatar), this.props);
  }
}
