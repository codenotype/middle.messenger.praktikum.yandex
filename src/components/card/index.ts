import { cards } from './card.tmpl';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { Events } from '../../utils/react/types';
import ChatsController from '../../controllers/ChatsController';

interface CardProps {
  selected: boolean;
  id: number;
  src: string;
  title: string;
  you: string; // => username
  lastMessage: string;
  time: string;
  notifications: number;
  events: Events;
}

export class ButtonCardDelete extends Block {
  constructor(props: { events: Events }) {
    super(props);
  }

  protected render(): DocumentFragment {
    const template = `<div class="card__delete"><p>X</p></div>`;

    return this.swap(Handlebars.compile(template), this.props);
  }
}

export const events = {
  click: (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const card = target.closest('.card') as HTMLDivElement;

    if (card) {
      ChatsController.selectChat(Number(card.id));
    }
  },
};

export class CardChat extends Block<CardProps> {
  constructor(props: CardProps) {
    super({
      ...props,
      events,
    });
  }

  protected init(): void {
    this.children.ButtonCardDelete = new ButtonCardDelete({
      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          const card = target.closest('.card') as HTMLDivElement;

          if (card && confirm('Удалить этот чат?')) {
            ChatsController.deleteChat(Number(card.id));
          }
        },
      },
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(cards.cardChat), this.props);
  }
}
