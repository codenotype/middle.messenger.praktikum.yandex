import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputProfile } from '../../components/input';

// @ts-ignore
import avatarSvg from '../../icons/user-astronaut-solid.svg';
import Block from '../../utils/react/Block';

export const profileData: Record<string, Block> = {
  Avatar: new Avatar({
    source: avatarSvg,
    id: 'avatar'
  }),

  InputLogin: new InputProfile({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: 'yandex',
  }),

  InputEmail: new InputProfile({
    label: 'Email',
    id: 'email',
    type: 'email',
    val: 'user@yandex.ru',
  }),

  InputFirstName: new InputProfile({
    type: 'text',
    label: 'First Name',
    id: 'first_name',
    val: 'yandex',
  }),

  InputSecondName: new InputProfile({
    type: 'text',
    label: 'Second Name',
    id: 'second_name',
    val: 'yandex',
  }),

  InputPhone: new InputProfile({
    type: 'text',
    label: 'Phone',
    id: 'phone',
    val: '123456789',
  }),

  InputChatName: new InputProfile({
    label: 'Chat name',
    id: 'display_name',
    type: 'text',
    val: 'praktikum',
  }),

  ButtonEdit: new Button({
    label: 'Save Data',
    type: 'submit',
    events: {},
  }),

  ButtonPassword: new Button({
    label: 'Change password',
    type: 'button',
    events: {},
  }),

  ButtonLogOut: new Button({
    label: 'Log out',
    type: 'button',
    events: {
      click: () => {
        console.log('log out done...');
      },
    },
  }),
};

export const changePasswordData: Record<string, Block> = {
  Avatar: new Avatar({
    source: avatarSvg,
  }),

  InputOldPassword: new InputProfile({
    label: 'Old password',
    id: 'oldPassword',
    type: 'password',
    val: 'praktikum',
  }),

  InputNewPassword: new InputProfile({
    label: 'New password',
    id: 'newPassword',
    type: 'password',
    val: '',
  }),

  InputNewPasswordConfirm: new InputProfile({
    label: 'New password Confirm',
    //id: 'newPasswordConfirm',
    type: 'password',
    val: '',
  }),

  ButtonSavePassword: new Button({
    label: 'Save password',
    type: 'submit',
    events: {},
  }),
};
