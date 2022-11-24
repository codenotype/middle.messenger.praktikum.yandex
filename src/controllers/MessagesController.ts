import store from '../utils/store/Store';
import WS, { wsEvents } from '../utils/WS';

export type SocketMessage = {
  chat_id: 'number';
  time: 'string';
  type: 'string';
  user_id: 'string';
  content: 'string';
  file?: {
    id: 'number';
    user_id: 'number';
    path: 'string';
    filename: 'string';
    content_type: 'string';
    content_size: 'number';
    upload_date: 'string';
  };
};

export class MessagesController {
  private _sockets: Record<number, WS> = {};

  async connect(chatId: number, token: string) {
    const { user } = store.getState();
    const ws = new WS(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chatId}/${token}`
    );

    this._sockets[chatId] = ws;

    try {
      await ws.open();
    } catch {
      throw new Error('Failed to open websocket')
    }

    ws.on(wsEvents.message, (msg) => {
      const message = JSON.parse(msg);
      if (message.type === 'pong') return;

      const state = store.getState();
      const id = `chat-messages-${chatId}`;
      const currentMessages = state[id];

      Array.isArray(message)
        ? store.set(id, message.reverse().filter(Boolean))
        : store.set(id, currentMessages.concat(message).filter(Boolean));
    });
    ws.on(wsEvents.close, () => {
      this._sockets[chatId].close();
    });

    ws.send({ type: 'get old', content: '0' });
  }

  sendMessage(id: number, content: string) {
    const ws = this._sockets[id];

    if (ws) {
      ws.send({ type: 'message', content });
    }
  }

  closeAll() {
    Object.values(this._sockets).forEach((ws) => ws.close());
  }
}

export default new MessagesController();
