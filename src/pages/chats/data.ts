import { CardChat } from '../../components/card';
import { InputChat } from '../../components/input';
import { Menu } from '../../components/menus';
import {
  menuAttachData,
  menuSettingsData,
} from '../../components/menus/data';
import { ChatMessage } from '../../components/message';
import { cutString } from '../../utils/cutString';
import { icons } from './icons_import';
import { testmsg } from './testmsg';

export const chatsData = {
  InputChat: new InputChat({
    src: icons.searchIcon,
    id: 'chat-search'
  }),

  InputMessage: new InputChat({
    src: icons.attachIcon,
    id: 'message'
  }),

  CardChat: new CardChat({
    src: icons.chatPic,
    title: 'Chat title',
    you: 'Artem',
    lastMessage: cutString(testmsg),
    time: '23 Aug \'21',
    notifiationsNumber: 42,
  }),

  CardChat2: new CardChat({
    src: icons.chatPic,
    title: 'Chat title',
    you: 'Artem',
    lastMessage: cutString(testmsg),
    time: '23 Aug \'21',
    notifiationsNumber: 42,
  }),

  ChatMessage: new ChatMessage({
    own: false,
    avatar: icons.chatPic,
    username: 'Friend',
    message: testmsg,
    time: '19:05',
  }),

  ChatMessageOwn: new ChatMessage({
    own: true,
    avatar: icons.chatPic,
    username: 'Friend',
    message: testmsg,
    time: '19:05',
  }),

  MenuSettings: new Menu({
    classes: 'menu menu_options',
    data: menuSettingsData,
  }),

  MenuAttach: new Menu({
    classes: 'menu menu_attach',
    data: menuAttachData,
  }),
};
