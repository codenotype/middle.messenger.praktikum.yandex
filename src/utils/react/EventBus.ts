type Callback = (...args: any) => void;

export class EventBus {
  private readonly listeners: Record<string, Callback[]> = {};

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw Error(`No event to off, name: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any) {
    if (!this.listeners[event]) {
      console.warn(`No event to emit, name: ${event}`);

      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
