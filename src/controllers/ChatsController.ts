import chatsApi, { ChatsApi } from '../api/ChatApi';
import router from '../utils/router/Router';
import { routes } from '../utils/router/types';
import store from '../utils/store/Store';
import { Store } from '../utils/store/types';
import MessagesController from './MessagesController';

export class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = chatsApi;
  }

  async getChats(updateStore: boolean = true) {
    try {
      const chats = await this.api.read();

      if (updateStore) {
        store.set('chats', chats);
      }

      return chats;
    } catch (err) {
      console.log(err)

      return []
    }
  }

  async createChat(title: string) {
    try {
      await this.api.create(title);
      await this.getChats();
    } catch (err) {
      console.log(err)
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      await this.getChats();
    } catch (err) {
        console.log(err)
    }
  }

  getChatUsers(id: number) {
    try {
      return this.api.getChatUsers(id);
    } catch (err) {
      return []
    }
  }

  async selectChat(id: number) {
    try {
      const { selectedChat } = store.getState();

      if (id === selectedChat) {
        return;
      }

      const token = await this.getToken(id);

      store.set('selectedChat', id);

      MessagesController.connect(id, token);
    } catch {
      router.go(routes.notFound)
    }
  }

  filterChatsByTitle(title: string) {
    store.set('filter', title);
  }

  async addUser(users: number[]) {
    try {
      const state = store.getState() as Store;

      await this.api.addUser(users, state.selectedChat);
    } catch (err) {
      console.error('Unable to add user', err)
    }
  }

  async deleteUser(users: number[]) {
    try {
      const state = store.getState() as Store;

      await this.api.deleteUser(users, state.selectedChat);
    } catch (err) {
      console.error('Unable to delete user', err)
    }
  }

  async getToken(chatId: number) {
    try {
      const { token } = await this.api.getToken(chatId);

      return token;
    } catch (err) {
      console.error('No token was given')

      return ''
    }
  }
}

export default new ChatsController();
