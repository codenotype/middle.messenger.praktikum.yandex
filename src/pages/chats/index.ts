import { chats } from './chats.tmpl';
import { renderPage } from '../../utils/render';
import { icons } from './icons_import';
import Block from '../../utils/react/Block';
import Handlebars from 'handlebars';
import { chatsData } from './data';

interface ChatsPageProps {
  selectedChatTitle: string;
  settingsIcon: any;
}

export class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {
    super(props);
  }

  protected init(): void {
    Object.entries(chatsData).forEach(([name, block]) => {
      this.children[name] = block;
    });
  }

  protected render(): DocumentFragment {
    return this.swap(Handlebars.compile(chats), this.props);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  renderPage(
    '#btn-chat-list',
    new ChatsPage({
      selectedChatTitle: 'Selected chat title',
      settingsIcon: icons.settingsIcon,
    })
  );
});
