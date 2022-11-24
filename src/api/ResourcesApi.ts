import BaseApi from './BaseApi';

export class ResourcesApi extends BaseApi {
  constructor() {
    super('/resources');
  }

  upload(data: any) {
    return this.http.post('/', { data });
  }

  download(path: string) {
    return this.http.get(`${path}`);
  }
}

export default new ResourcesApi();
