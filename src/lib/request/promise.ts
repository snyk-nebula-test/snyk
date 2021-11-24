import * as request from './index';

export async function makeRequest<T>(payload: any): Promise<T> {
  return new Promise((resolve, reject) => {
    request.makeRequest(payload, (error, res, body) => {
      if (error) {
        return reject(error);
      }
      if (res.statusCode !== 200) {
        return reject({
          code: res.statusCode,
          message: body?.message,
        });
      }
      resolve(body);
    });
  });
}

export async function makeRequestV3<T>(payload: any): Promise<T> {
  return new Promise((resolve, reject) => {
    request.makeRequest(payload, (error, res, body) => {
      if (error) {
        return reject(error);
      }
      if (res.statusCode >= 400) {
        return reject({
          code: res.statusCode,
          body,
        });
      }
      resolve(body);
    });
  });
}
