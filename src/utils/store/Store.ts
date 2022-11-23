import { set } from '../helpers';
import { EventBus } from '../react/EventBus';

export const storeEvents = {
  updated: 'updated',
} as const;

export class Store extends EventBus {
  private _state: Record<string, any> = {};

  set(keypath: string, data: unknown) {
    set(this._state, keypath, data);

    (window as any).mystore = () => this._state;

    this.emit(storeEvents.updated, this.getState());
  }

  getState() {
    return this._state;
  }
}

const store = new Store();

export default store;
