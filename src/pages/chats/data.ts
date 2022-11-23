import { User } from '../../api/types';
import { Button } from '../../components/button';
import { ChatsList } from '../../components/chatslist';
import { Input, InputChat } from '../../components/input';
import { Menu } from '../../components/menus';
import { menuAttachData } from '../../components/menus/data';
import ChatsController from '../../controllers/ChatsController';
import MessagesController from '../../controllers/MessagesController';
import UserController from '../../controllers/UserController';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';
import store from '../../utils/store/Store';
import { icons } from './icons_import';

const addRemoveUser = async (type: 'add' | 'delete') => {
  const result = prompt('Введите имя пользователя');
  let userId = 0;
  let users: User[] = [];

  if (result) {
    users = await UserController.searchUser(result);

    if (users.length > 0) {
      userId = Number(
        prompt(`Найдены следующие пользователи:
      ${users.map((user) => `\n${user.id} - ${user.login}`)}
    `)
      );
    } else {
      alert(`Пользователь с именем "${result}" не найден`);
    }
  }

  if (userId) {
    const action = type === 'add' ? 'добавить' : 'удалить';
    const approved = confirm(
      `Вы хотите ${action} пользователя: ${
        users.find((user) => user.id === userId)?.login
      } ?`
    );

    if (approved) {
      type === 'add'
        ? await ChatsController.addUser([userId])
        : await ChatsController.deleteUser([userId]);
    }
  }
};

export const chatsData = {
  InputChat: new InputChat({
    src: icons.searchIcon,
    id: 'chat-search',
    events: {
      keypress: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          const target = event.target as HTMLInputElement;

          ChatsController.filterChatsByTitle(target.value);
        }
      },
    },
  }),

  InputMessage: new InputChat({
    src: icons.attachIcon,
    id: 'message',
  }),

  ButtonSendMessage: new Button({
    label: 'Send',
    events: {
      click: () => {
        const input = document.querySelector('#message') as HTMLInputElement;

        const { selectedChat } = store.getState();

        MessagesController.sendMessage(selectedChat, input.value);

        input.value = '';
      },
    },
  }),

  ButtonChatCreate: new Input({
    id: 'button-change-create',
    label: 'Press enter to create chat',
    events: {
      keypress: (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          const target = event.target as HTMLInputElement;

          if (confirm(`Создать чат: ${target.value}`)) {
            ChatsController.createChat(target.value);

            target.value = '';
          }
        }
      },
    },
  }),

  Chats: new ChatsList({ chats: [], selectedChat: 0, filter: '' }),

  ChatMessages: [],

  MenuAttach: new Menu({
    classes: 'menu menu_attach menu_hidden',
    data: menuAttachData,
  }),

  ButtonProfile: new Button({
    label: 'Profile',
    events: {
      click: () => router.go(routes.profile)
    }
  }),

  ButtonAddUser: new Button({
    label: 'Add user',
    events: {
      click: () => addRemoveUser('add')
    }
  }),

  ButtonDeleteUser: new Button({
    label: 'Delete user',
    events: {
      click: () => addRemoveUser('delete')
    }
  }),
};
