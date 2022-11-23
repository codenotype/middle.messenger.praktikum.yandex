import { changePassword, profile } from './profile.tmpl';
import Block from '../../utils/react/Block';
import { changePasswordData, profileData } from './data';
import Handlebars from 'handlebars';
import { Events } from '../../utils/react/types';
import { collect } from '../../utils/collect';
import { validateInput } from '../../utils/validate';
import UserController from '../../controllers/UserController';
import { UserPasswords, UserProfile } from '../../api/types';
import router from '../../utils/router/Router';
import { routes } from '../../utils/router/types';
import AuthController from '../../controllers/AuthController';

interface ProfilePageProps {
  events: Events;
  block: Record<string, Block<any>>;
}

const profileEvents = {
  submit: (event: SubmitEvent) => {
    event.preventDefault();

    const { isValid, data } = collect(event);

    if (isValid) {
      UserController.saveData(data as unknown as UserProfile).then(() => {
        if (confirm('Данные сохранены. Перейти в чат?')) {
          router.go(routes.chats);
        }
      });
    }
  },
  focusin: validateInput,
  focusout: validateInput,
  input: validateInput,
};

export class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      events: profileEvents,
      block: profileData,
    });

    AuthController.getUser();
  }

  init() {
    this.children = this.props.block;
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(profile), this.props);
  }
}

export class ProfilePagePasswordChange extends Block<ProfilePageProps> {
  constructor(props: ProfilePageProps) {
    super({
      ...props,
      ...{
        template: changePassword,
        data: changePasswordData,
        events: {
          submit: (event: SubmitEvent) => {
            event.preventDefault();

            const { isValid, data } = collect(event);

            if (isValid) {
              UserController.savePassword(
                data as unknown as UserPasswords
              ).then(() => router.go(routes.profile));
            }
          },
          focusin: validateInput,
          focusout: validateInput,
          input: validateInput,
        },
      },
    });
  }

  init() {
    this.children = changePasswordData;
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(changePassword), this.props);
  }
}
