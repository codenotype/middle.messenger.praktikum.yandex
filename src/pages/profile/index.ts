import { changePassword, profile } from './profile.tmpl';
import { renderPage } from '../../utils/render';
import Block from '../../utils/react/Block';
import { changePasswordData, profileData } from './data';
import Handlebars from 'handlebars';
import { Events } from '../../utils/react/types';
import { collect } from '../../utils/collect';
import { validateInput } from '../../utils/validate';

interface ProfilePageProps {
  template: string;
  data: any;
  events?: Events;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
    super(props);
  }

  init() {
    this.children = this.props.data;
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(this.props.template), this.props);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const events = {
    submit: collect,
    focusin: validateInput,
    focusout: validateInput,
    input: validateInput,
  };

  renderPage(
    '#btn-profile',
    new ProfilePage({
      template: profile,
      data: profileData,
      events,
    })
  );

  renderPage(
    '#btn-profile-change',
    new ProfilePage({
      template: changePassword,
      data: changePasswordData,
      events,
    })
  );
});
