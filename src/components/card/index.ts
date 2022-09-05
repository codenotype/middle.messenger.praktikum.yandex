import { cards } from './card.tmpl';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';

interface CardProps {
  src: string;
  title: string;
  you: string; // => username
  lastMessage: string;
  time: string;
  notifiationsNumber: number;
}

export class CardChat extends Block {
  constructor(props: CardProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(cards.cardChat), this.props);
  }
}
