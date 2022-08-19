import { chatList } from './chat-list.tmpl';
import { render } from '../../utils/render';

window.addEventListener('DOMContentLoaded', () => {
  const chatListData = {
    message: 'Sorry, this page is under construction',
  };

  render('#btn-chat-list', chatList, chatListData);
});
