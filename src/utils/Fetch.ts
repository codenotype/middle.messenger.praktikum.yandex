import { stringifyQuery } from './stringifyQuery';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

type Options = Partial<{
  data: any;
  headers: Record<string, string>;
  timeout: number;
  method: any;
}>;

export default class Fetch {
  static api = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = Fetch.api + endpoint;
  }

  get<Response>(url = '/', options: Options = {}): Promise<Response> {
    let params = '';

    if (options?.data) {
      params = stringifyQuery(options.data);
    }

    const result = url + params;

    return this.request(
      this.endpoint + result,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  }

  put<Response = void>(path: string, options: Options = {}): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  }

  post<Response = void>(
    path: string,
    options: Options = {}
  ): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  }

  patch<Response = void>(
    path: string,
    options: Options = {}
  ): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { ...options, method: METHODS.PATCH },
      options.timeout
    );
  }

  del<Response>(path: string, options: Options = {}): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  }

  private request<Response>(
    url: string,
    options: Options,
    timeout = 5000
  ): Promise<Response> {
    return new Promise((resolve, reject) => {
      const { data, headers = {}, method } = options;
      const xhr = new XMLHttpRequest();
      const titles = Object.entries(headers);

      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          xhr.status < 400 ? resolve(xhr.response) : reject(xhr.response);
        }
      };

      xhr.timeout = timeout;

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network problem' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (titles.length > 0) {
        titles.forEach(([type, value]) => xhr.setRequestHeader(type, value));
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (!data || method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
