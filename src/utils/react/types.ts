import Block from './Block';

export type Props<T = any> = Record<string, T>;

export type Events = {
  [key in string]: (...args: any[]) => void;
};

export interface BlockWrap<P extends {} = any> {
  new (props: P): Block<P>;
}
