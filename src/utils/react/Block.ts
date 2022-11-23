import { EventBus } from './EventBus';
import { nanoid } from 'nanoid';
import { Events } from './types';

abstract class Block<Props extends {} = any> {
  static events = {
    init: 'init',
    mount: 'mount',
    update: 'update',
    render: 'render',
  };

  public id = nanoid(5);
  public children: Record<string, Block | Block[]>;

  protected props: Props;

  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  constructor(propsWithChildren: Props) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.events.init);
  }

  private _getChildrenAndProps(childrenAndProps: Props) {
    const initial = {
      children: {} as Record<string, Block | Block[]>,
      props: {} as Record<string, any>,
    };

    return Object.entries(childrenAndProps).reduce((prev, [key, value]) => {
      const propsType = value instanceof Block ? 'children' : 'props';

      prev[propsType][key] = value;

      return prev;
    }, initial);
  }

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

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.events.init, this._init.bind(this));
    eventBus.on(Block.events.mount, this._componentDidMount.bind(this));
    eventBus.on(Block.events.update, this._componentDidUpdate.bind(this));
    eventBus.on(Block.events.render, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.events.render);
  }

  /* eslint-disable */
  protected init() {}

  private _render() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    this._removeEvents();
    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  protected swap(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      const createStub = (id: string) => `<div data-id="${id}"></div>`;

      contextAndStubs[name] = Array.isArray(component)
        ? component.map(({ id }) => createStub(id))
        : createStub(component.id);
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.values(this.children).forEach((component) => {
      Array.isArray(component)
        ? component.map((component) => replaceStub(component))
        : replaceStub(component);
    });

    return temp.content;
  }

  private _addEvents() {
    const { events = {} } = this.props as Props & { events: Events };

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  public getContent() {
    return this.element;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.events.mount);

    Object.values(this.children).forEach((child) =>
      Array.isArray(child)
        ? child.forEach((component) => component.dispatchComponentDidMount())
        : child.dispatchComponentDidMount()
    );
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  /* eslint-disable */
  public componentDidMount() {}

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.events.render);
    }
  }

  private _removeEvents() {
    const { events = {} } = this.props as Props & { events: Events };

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
