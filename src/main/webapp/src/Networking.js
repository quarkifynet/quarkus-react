import SwaggerClient from "swagger-client";

export default class Networking {
  static client = new SwaggerClient({
    url: 'http://localhost:8080/openapi'
  });
  // TODO security
  static exec = (endpoint, object, success, failure = res => console.log('failed on api call: ' + res), meta = {}) => {
    this.client.then(
        client => endpoint(client)(object, meta),
        reason => {
          failure(reason);
          console.error('failed to load the spec: ' + reason)
        }
    ).then(success, failure);
  }
}
