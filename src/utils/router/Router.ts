import { BlockWrap } from '../react/types';
import { Route } from './Route';
import { routes } from './types';

class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _route: Route | null = null;
  private _history = window.history;

  constructor(readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];

    Router.__instance = this;
  }

  public use(path: string, block: BlockWrap) {
    const route = new Route({
      path,
      view: block,
      query: this.rootQuery,
    });

    this._routes.push(route);

    return this;
  }

  public getRoute(path: string) {
    return this._routes.find((route) => route.match(path));
  }

  private _onRoute(path: string) {
    const route = this.getRoute(path);
    if (route === undefined) {
      this.go(routes.notFound);
      throw new Error('Route is undefined');
    }
    if (this._route && this._route !== route) {
      this._route.leave();
    }

    this._route = route;

    route.render();
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  public go(path: string) {
    this._history.pushState({}, '', path);

    this._onRoute(path);
  }

  public back() {
    this._history.back();
  }

  public forward() {
    this._history.forward();
  }
}

const router = new Router('#app');

export default router;
