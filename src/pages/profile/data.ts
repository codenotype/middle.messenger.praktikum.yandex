import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { InputProfile } from '../../components/input';
import { ModalLoad } from '../../components/modal';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';

// @ts-ignore
import avatarSvg from '../../icons/user-astronaut-solid.svg';
import Block from '../../utils/react/Block';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';

export const profileData: Record<string, Block> = {
  Avatar: new Avatar({
    source: avatarSvg,
    id: 'avatar',
    events: {
      click: () => {
        document.querySelector('.modal_load')?.classList.remove('modal_hidden');
      },
    },
  }),

  InputLogin: new InputProfile({
    type: 'text',
    label: 'Login',
    id: 'login',
    val: '',
  }),

  InputEmail: new InputProfile({
    label: 'Email',
    id: 'email',
    type: 'email',
    val: '',
  }),

  InputFirstName: new InputProfile({
    type: 'text',
    label: 'First Name',
    id: 'first_name',
    val: '',
  }),

  InputSecondName: new InputProfile({
    type: 'text',
    label: 'Second Name',
    id: 'second_name',
    val: '',
  }),

  InputPhone: new InputProfile({
    type: 'text',
    label: 'Phone',
    id: 'phone',
    val: '',
  }),

  InputChatName: new InputProfile({
    label: 'Chat name',
    id: 'display_name',
    type: 'text',
    val: '',
  }),

  ButtonEdit: new Button({
    label: 'Save Data',
    type: 'submit',
    events: {},
  }),

  ButtonPassword: new Button({
    label: 'Change password',
    type: 'button',
    events: {
      click: () => router.go(routes.password),
    },
  }),

  ButtonLogOut: new Button({
    label: 'Log out',
    type: 'button',
    events: {
      click: () => {
        AuthController.logout();
        router.go(routes.index);
      },
    },
  }),

  ButtonChats: new Button({
    label: 'Go to chats',
    type: 'button',
    events: {
      click: () => {
        router.go(routes.chats);
      },
    },
  }),

  ModalLoad: new ModalLoad({
    title: 'Load file',
    events: {
      submit: async (e: SubmitEvent) => {
        e.preventDefault();

        const input = (e.target as any)?.querySelector('input');

        if (input?.files?.length > 0) {
          UserController.saveAvatar();
        }
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
    val: '',
  }),

  InputNewPassword: new InputProfile({
    label: 'New password',
    id: 'newPassword',
    type: 'password',
    val: '',
  }),

  InputNewPasswordConfirm: new InputProfile({
    label: 'New password Confirm',
    id: 'newPasswordConfirm',
    type: 'password',
    val: '',
  }),

  ButtonSavePassword: new Button({
    label: 'Save password',
    events: {},
  }),

  ButtonBack: new Button({
    label: 'Go back',
    type: 'button',
    events: {
      click: () => router.back(),
    },
  }),
};
