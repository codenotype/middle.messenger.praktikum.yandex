import { EventBus } from './react/EventBus';

export const wsEvents = {
  open: 'open',
  error: 'error',
  message: 'message',
  close: 'close',
};

export default class WS extends EventBus {
  ws: WebSocket | null = null;
  url = '';
  interval = 0;

  constructor(url: string) {
    super();

    this.url = url;
  }

  open() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener(wsEvents.open, () => {
      this.emit(wsEvents.open);
    });
    this.ws.addEventListener(wsEvents.message, (msg) => {
      const data = (msg as MessageEvent).data;

      if (data?.type === 'pong') {
        return;
      }

      this.emit(wsEvents.message, data);
    });
    this.ws.addEventListener(wsEvents.error, (err) => {
      this.emit(wsEvents.open, err);
    });
    this.ws.addEventListener(wsEvents.close, () => {
      this.emit(wsEvents.close);
    });

    this.interval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000) as any;

    this.on(wsEvents.open, () => true);
    this.on(wsEvents.close, () => {
      clearInterval(this.interval);

      this.interval = 0;
    });

    return new Promise<void>((resolve) => {
      this.on(wsEvents.open, () => {
        resolve();
      });
    });
  }

  send(data: any) {
    if (!this.ws) {
      console.error('websocket is not connected');

      return;
    }

    this.ws?.send(JSON.stringify(data));
  }

  close() {
    this.ws?.close();
  }
}
