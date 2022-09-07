import { stringifyQuery } from './stringifyQuery';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
} as const;

type Options = {
  data?: string[];
  headers: Record<string, string>;
  timeout: number;
  method?: any;
};

export class Fetch {
  get(url: string, options: Options) {
    let params = '';

    if (options?.data) {
      params = stringifyQuery(options.data);
    }

    const result = url + params;

    return this.request(
      result,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  put(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  post(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  del(url: string, options: Options) {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  request = (url: string, options: Options, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const { data, headers = {}, method } = options;
      const xhr = new XMLHttpRequest();
      const titles = Object.entries(headers);

      xhr.open(method, url);

      xhr.onload = () => resolve(xhr);

      xhr.timeout = timeout;

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (titles.length > 0) {
        titles.forEach(([type, value]) => xhr.setRequestHeader(type, value));
      }

      if (!data || method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
