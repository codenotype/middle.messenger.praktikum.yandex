import Fetch from '../utils/Fetch';

export default abstract class BaseApi {
  protected http: Fetch;

  protected constructor(endpoint: string) {
    this.http = new Fetch(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;
  public abstract read?(identifier: string): Promise<unknown>;
  public abstract update?(identifier: string, data: unknown): Promise<unknown>;
  public abstract delete?(identifier: string): Promise<unknown>;
}
