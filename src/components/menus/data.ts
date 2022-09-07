import { MenuOption } from '.';
import { icons } from '../../pages/chats/icons_import';

export const menuSettingsData = {
  OptionOne: new MenuOption({
    icon: icons.profileIcon,
    label: 'Profile',
    rotated: '',
  }),
  OptionTwo: new MenuOption({
    icon: icons.plusIcon,
    label: 'Add user',
    rotated: '',
  }),
  OptionThree: new MenuOption({
    icon: icons.plusIcon,
    label: 'Delete user',
    rotated: 'rotated-90',
  }),
};

export const menuAttachData = {
  OptionOne: new MenuOption({
    icon: icons.imageIcon,
    label: 'Image or video',
    rotated: '',
  }),
  OptionTwo: new MenuOption({
    icon: icons.fileIcon,
    label: 'File',
    rotated: '',
  }),
  OptionThree: new MenuOption({
    icon: icons.locationIcon,
    label: 'Location',
    rotated: '',
  }),
};
