import BaseApi from './BaseApi';
import { Chat, User } from './types';

export class ChatsApi extends BaseApi {
  constructor() {
    super('/chats');
  }

  read(): Promise<Chat[]> {
    return this.http.get('/');
  }

  readFiles(chatId: number) {
    return this.http.get(`/${chatId}/files`);
  }

  uploadAvatar(chatId: number, avatar: any) {
    return this.http.put('/avatar', {
      data: {
        chatId,
        avatar,
      },
    });
  }

  addUser(users: number[], chatId: number) {
    return this.http.put('/users', {
      data: {
        users,
        chatId,
      },
    });
  }

  deleteUser(users: number[], chatId: number) {
    return this.http.del('/users', {
      data: {
        users,
        chatId,
      },
    });
  }

  create(title: string) {
    return this.http.post('/', { data: { title } });
  }

  deleteChat(chatId: number) {
    return this.http.del('/', { data: { chatId } });
  }

  getChatUsers(id: number): Promise<User[]> {
    return this.http.get(`/${id}/users`);
  }

  getToken(chatId: number): Promise<{ token: string }> {
    return this.http.post(`/token/${chatId}`);
  }
}

export default new ChatsApi();
