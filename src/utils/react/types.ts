export type Props<T = any> = {
  [key in string]: T;
};

export type Events = {
  [key in string]: (...args: any[]) => void;
};
