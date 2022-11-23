import chatsApi, { ChatsApi } from '../api/ChatApi';
import store from '../utils/store/Store';
import { Store } from '../utils/store/types';
import MessagesController from './MessagesController';

export class ChatsController {
  private readonly api: ChatsApi;

  constructor() {
    this.api = chatsApi;
  }

  async getChats(updateStore: boolean = true) {
    const chats = await this.api.read();

    if (updateStore) {
      store.set('chats', chats);
    }

    return chats;
  }

  async createChat(title: string) {
    await this.api.create(title);
    await this.getChats();
  }

  async deleteChat(id: number) {
    await this.api.deleteChat(id);
    await this.getChats();
  }

  getChatUsers(id: number) {
    return this.api.getChatUsers(id);
  }

  async selectChat(id: number) {
    const { selectedChat } = store.getState();

    if (id === selectedChat) {
      return;
    }

    const token = await this.getToken(id);

    store.set('selectedChat', id);

    MessagesController.connect(id, token);
  }

  filterChatsByTitle(title: string) {
    store.set('filter', title);
  }

  async addUser(users: number[]) {
    const state = store.getState() as Store;

    await this.api.addUser(users, state.selectedChat);
  }

  async deleteUser(users: number[]) {
    const state = store.getState() as Store;

    await this.api.deleteUser(users, state.selectedChat);
  }

  async getToken(chatId: number) {
    const { token } = await this.api.getToken(chatId);

    return token;
  }
}

export default new ChatsController();
