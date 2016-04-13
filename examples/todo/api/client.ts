const baseUrl = 'http://localhost:1234/api/v1/';

export function delay<T>(v: T, ms: number = 5000): Promise<T> {
  // useful for testing server latency
  // to apply to all rest calls, add .delay() to the checkStatus return value.
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(v); }, ms);
  });
}

export function post<T>(path: string, data: any): Promise<T> {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(toJson);
}

export function patch<T>(path: string, data: any): Promise<T> {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(toJson);
}

export function get<T>(path: string): Promise<T> {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }).then(toJson);
}

export function destroy<T>(path: string): Promise<T> {
  const url = `${baseUrl}${path}`;
  return fetch(url, {
    method: 'DELETE'
  }).then(toJson);
}

const NO_CONTENT = 204;

export function toJson<T>(
  response: Response,
  onError: <A>(response: Response) => Promise<A> = toError
): Promise<T> {
  const {status} = response;

  if (status === NO_CONTENT) {
    return response.text().then(() => undefined);
  }

  if (status >= 200 && status < 300) {
    return response.json<T>();
  }

  return onError(response);
}

export interface ErrorResponse {
  error?: string;
}

export function toError<T>(response: Response): Promise<T> {
  return response.json<ErrorResponse>().then((data): T => {
    if (data.error) {
      throw new Error(data.error);
    }

    throw new Error(JSON.stringify(data));
  }, () => {
    throw new Error(status.toString());
  });
}
