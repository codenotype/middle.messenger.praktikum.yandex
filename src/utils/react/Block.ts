import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import { Events, Props } from './types';

// Нельзя создавать экземпляр данного класса
class Block {
  static events = {
    init: 'init',
    mount: 'mount',
    update: 'update',
    render: 'render',
  };

  public id = nanoid(5);
  public children: Record<string, Block>;

  protected props: any;

  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.events.init);
  }

  // 1.1   =============================================
  private _getChildrenAndProps(childrenAndProps: any) {
    const initial = {
      children: {} as Props<Block>,
      props: {} as Props,
    };

    return Object.entries(childrenAndProps).reduce((prev, [key, value]) => {
      const propsType = value instanceof Block ? 'children' : 'props';

      prev[propsType][key] = value;

      return prev;
    }, initial);
  }

  // 1.2  =============================================
  private _makePropsProxy(props: any) {
    /* eslint-disable */
    const block = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;

        block.eventBus().emit(Block.events.update, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  // 1.3   =============================================
  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.events.init, this._init.bind(this));
    eventBus.on(Block.events.mount, this._componentDidMount.bind(this));
    eventBus.on(Block.events.update, this._componentDidUpdate.bind(this));
    eventBus.on(Block.events.render, this._render.bind(this));
  }

  // 1.4   =============================================
  private _init() {
    this.init();

    this.eventBus().emit(Block.events.render);
  }

  // 2.1 (после вызова конструкторов) ==================
  /* eslint-disable */
  protected init() {}

  // 2.2   =============================================
  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    this._removeEvents();
    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  // 2.3   =============================================
  protected swap(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach((entry) => {
      const component = entry[1]
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

    return temp.content;
  }

  // 2.4   =============================================
  private _addEvents() {
    const { events = {} } = this.props as { events: Events };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  // 2.5   =============================================
  public getContent() {
    return this.element;
  }

  // 2.6   =============================================
  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.events.mount);

    Object.values(this.children).forEach((child) =>
      child.dispatchComponentDidMount()
    );
  }

  // 2.7   =============================================
  private _componentDidMount() {
    this.componentDidMount();
  }

  // 2.8   =============================================
  /* eslint-disable */
  public componentDidMount() {}

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.events.render);
    }
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events: Events };

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  /* eslint-disable */
  // @ts-ignore
  protected componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  public setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  public show() {
    this.getContent()!.style.display = 'block';
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
