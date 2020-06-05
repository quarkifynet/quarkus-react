import SwaggerClient from "swagger-client";

export default class Networking {
  static client = new SwaggerClient({
    url: 'http://localhost:8080/openapi'
  });

  static getDefaultSecurity = () => {
    let token = localStorage.getItem("id_token");
    return token == null ? {} : {
      securities: {
        authorized: {
          bearerAuth: {
            value: token
          }
        }
      }
    }
  }

  static exec = ({
                   endpoint,
                   attributes,
                   data,
                   success,
                   failure = res => console.log('failed on api call: ' + res),
                   security = this.getDefaultSecurity()
                 }) => {
    this.client.then(
        client => endpoint(client)(attributes, {...data, ...security}),
        reason => {
          failure(reason);
          console.error('failed to load the spec: ' + reason)
        }
    ).then(success, failure);
  }
}
