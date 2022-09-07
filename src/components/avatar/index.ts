import Handlebars from 'handlebars';
import { avatar } from './avatar.tmpl';
import Block from '../../utils/react/Block';

interface AvatarProps {
  id?: string
  source: any
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(avatar), this.props);
  }
}
