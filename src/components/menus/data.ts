import { MenuOption } from '.';
import { User } from '../../api/types';
import ChatsController from '../../controllers/ChatsController';
import UserController from '../../controllers/UserController';
import { icons } from '../../pages/chats/icons_import';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';

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

export const menuSettingsData = {
  OptionOne: new MenuOption({
    icon: icons.profileIcon,
    label: 'Profile',
    rotated: '',
    events: {
      click: () => router.go(routes.profile),
    },
  }),
  OptionTwo: new MenuOption({
    icon: icons.plusIcon,
    label: 'Add user',
    rotated: '',
    events: {
      click: () => addRemoveUser('add'),
    },
  }),
  OptionThree: new MenuOption({
    icon: icons.plusIcon,
    label: 'Delete user',
    rotated: 'rotated-90',
    events: {
      click: () => addRemoveUser('delete'),
    },
  }),
};

export const menuAttachData = {
  OptionOne: new MenuOption({
    icon: icons.imageIcon,
    label: 'Image or video',
    rotated: '',
    events: {},
  }),
  OptionTwo: new MenuOption({
    icon: icons.fileIcon,
    label: 'File',
    rotated: '',
    events: {},
  }),
  OptionThree: new MenuOption({
    icon: icons.locationIcon,
    label: 'Location',
    rotated: '',
    events: {},
  }),
};
