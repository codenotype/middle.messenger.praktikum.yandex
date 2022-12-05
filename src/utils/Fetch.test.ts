import { expect } from 'chai';
import sinon from 'sinon';
import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import Fetch from './Fetch';

describe('Fetch', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: Fetch;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    http = new Fetch('/chats');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    http.get('/');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });

  it('.put() should send PUT request', () => {
    http.put('/users');

    const [request] = requests;

    expect(request.method).to.eq('PUT');
  });

  it('.post() should send POST request', () => {
    http.post('/password');

    const [request] = requests;

    expect(request.method).to.eq('POST');
  });

  it('.del() should send DELETE request', () => {
    http.del('/');

    const [request] = requests;

    expect(request.method).to.eq('DELETE');
  });
});
