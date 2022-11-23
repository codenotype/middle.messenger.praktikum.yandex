import { renderBlock } from '../helpers';
import Block from '../react/Block';
import { BlockWrap } from '../react/types';

type Options = {
  path: string;
  view: BlockWrap;
  query: string;
};

export class Route {
  private _block: Block | null = null;
  private _path: string;
  private readonly _view: BlockWrap;
  private readonly _query: string;

  constructor(options: Options) {
    const { path, view, query } = options;

    this._path = path;
    this._view = view;
    this._query = query;
  }

  leave() {
    this._block = null;
  }

  match(path: string) {
    return path === this._path;
  }

  render() {
    if (this._block === null) {
      this._block = new this._view({});
    }

    renderBlock(this._query, this._block);

    return;
  }
}
