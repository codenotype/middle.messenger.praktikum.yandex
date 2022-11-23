import { chats } from './chats.tmpl';
import { icons } from './icons_import';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { chatsData } from './data';
import store, { storeEvents } from '../../utils/store/Store';
import { State } from '../../utils/store/types';
import { ChatMessage } from '../../components/message';
import { Events } from '../../utils/react/types';
import ChatsController from '../../controllers/ChatsController';
import { SocketMessage } from '../../controllers/MessagesController';

// @ts-ignore
import avatarSvg from '../../icons/user-astronaut-solid.svg';
import { User } from '../../api/types';

interface ChatsPageProps {
  chatUsers: User[];
  chatSelected: boolean;
  selectedChatTitle: string;
  messages: SocketMessage[];
  settingsIcon: any;
  data: any;
  userId: number;

  events?: Events;
}

export class ChatsPage extends Block<ChatsPageProps> {
  constructor(props: ChatsPageProps) {
    super({
      ...props,
      userId: 0,
      chatSelected: false,
      data: chatsData,
      selectedChatTitle: '',
      settingsIcon: icons.settingsIcon,
      messages: [],
      events: {},
    });

    store.on(storeEvents.updated, async (state: State) => {
      const selectedChatTitle =
        state?.chats?.find(({ id }) => {
          return id === state.selectedChat;
        })?.title || '';

      const id = `chat-messages-${state.selectedChat}`;
      const messages = state[id as keyof State];

      const chatUsers = await ChatsController.getChatUsers(state.selectedChat);

      this.setProps({
        ...this.props,
        chatUsers,
        userId: state.user.id,
        messages: messages || [],
        selectedChatMessagesId: state.selectedChatMessagesId,
        chatSelected: Boolean(selectedChatTitle),
        selectedChatTitle,
        events: {
          click: async (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains('chats__title')) {
              const users = await ChatsController.getChatUsers(
                state.selectedChat
              );
              const list = users.map((user) => user.login).join('\n - ');

              alert(
                list ? `Список пользователей:\n - ${list}` : 'Нет пользователей'
              );
            }
          },
        },
      });
    });
  }

  protected init(): void {
    Object.entries(this.props.data).forEach(([name, block]) => {
      this.children[name] = block as Block<any> | Block<any>[];
    });
  }

  protected componentDidUpdate(
    _oldProps: any,
    newProps: ChatsPageProps
  ): boolean {
    this.children.ChatMessages = newProps.messages.map(
      (message: SocketMessage) => {
        const user = newProps?.chatUsers?.find(
          ({ id }) => id === Number(message.user_id)
        );

        return new ChatMessage({
          own: Number(message.user_id) === newProps.userId,
          avatar: avatarSvg,
          username: user?.display_name || user?.login || `${message.user_id}`,
          message: message.content,
          time: new Date(message.time).toLocaleString(),
        });
      }
    );

    return true;
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(chats), this.props);
  }
}
