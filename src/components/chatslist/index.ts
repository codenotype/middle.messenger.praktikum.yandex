import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { CardChat, events } from '../card';
import ChatsController from '../../controllers/ChatsController';
import { Chat } from '../../api/types';
import { cutString } from '../../utils/cutString';
import store, { storeEvents } from '../../utils/store/Store';

// @ts-ignore
import avatarSvg from '../../icons/user-astronaut-solid.svg';
import AuthController from '../../controllers/AuthController';

type Props = {
  chats: Chat[];
  selectedChat: number;
  filter: string;
};

export class ChatsList extends Block<Props> {
  constructor(props: Props) {
    super(props);

    AuthController.getUser();
    ChatsController.getChats();

    store.on(storeEvents.updated, async (state) => {
      const actualChats = await ChatsController.getChats(false);

      this.setProps({
        ...this.props,
        chats: actualChats,
        selectedChat: state.selectedChat,
        filter: state.filter,
      });
    });
  }

  protected componentDidUpdate(_o: Props, props: Props): boolean {
    let updatedChats: CardChat[] = [];

    if (!props.chats) return false;

    updatedChats = props.chats
      .filter((chat) => {
        if (props.filter) {
          return chat.title.includes(props.filter);
        } else {
          return true;
        }
      })
      .map((chat) => {
        let time = undefined;

        if (chat.last_message?.time) {
          time = new Date(chat.last_message.time).toDateString();
        }

        return new CardChat({
          selected: chat.id === props.selectedChat,
          id: chat.id,
          src: avatarSvg,
          title: chat.title,
          you: chat.last_message?.user.login || '',
          lastMessage: cutString(chat.last_message?.content || ''),
          time: time || '',
          notifications: chat.unread_count || 0,
          events,
        });
      });

    this.children.chats = updatedChats;

    return true;
  }

  protected render(): DocumentFragment {
    const template = `<div>{{{ chats }}}</div>
    `;

    return this.swap(Handlebars.compile(template), this.props);
  }
}
