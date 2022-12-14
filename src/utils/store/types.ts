import { Chat, User } from '../../api/types';
import { SocketMessage } from '../../controllers/MessagesController';

export type State = {
  user: User;
  chats: Chat[];
  selectedChat: number;
  filter: string;
  selectedChatMessagesId: string;
  messages: SocketMessage[];
};

/* eslint-disable */
export type Store = {} & State;
