import SwaggerClient from "swagger-client";

export default class Networking {
  static client = new SwaggerClient({
    url: 'http://localhost:8080/openapi'
  });
  // TODO security
  static exec = ({endpoint, attributes, data, success, failure = res => console.log('failed on api call: ' + res)}) => {
    // this.client.then(
    //     client => client.apis.default.get_posts(),
    //     error => console.error('Failed to load the spec: ', error)
    // ).then(
    //     result => doStuff(result.body),
    //     error => console.error('Failure on api call: ', error)
    // )
    this.client.then(
        client => endpoint(client)(attributes, data),
        reason => {
          failure(reason);
          console.error('failed to load the spec: ' + reason)
        }
    ).then(success, failure);
  }
}
