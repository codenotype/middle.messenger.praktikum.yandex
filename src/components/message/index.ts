import Handlebars from 'handlebars';
import Block from '../../utils/react/Block';
import { messages } from './messages.tmpl';

interface MessageProps {
  own: boolean;
  avatar: string;
  username: string;
  message: string;
  time: string;
}

export class ChatMessage extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(messages.chatMessageTest), this.props);
  }
}
