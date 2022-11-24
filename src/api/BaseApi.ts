import Fetch from '../utils/Fetch';

export default abstract class BaseApi {
  protected http: Fetch;

  protected constructor(endpoint: string) {
    this.http = new Fetch(endpoint);
  }
}
