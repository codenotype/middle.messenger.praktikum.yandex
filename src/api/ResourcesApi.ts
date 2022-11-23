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

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new ResourcesApi();
