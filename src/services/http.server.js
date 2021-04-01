const serverURL = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000';

const common = (method, url, header, body) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  if (header.token) {
    headers.append('Authorization', `Bearer ${header.token}`);
  }
  const options = {
    method,
    headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  };
  let ok = true;
  return fetch(serverURL + url, options)
    .then((data) => {
      ok = data.ok;
      return data.json();
    })
    .then((data) => {
      if (ok) {
        return data;
      }
      return Promise.reject(data);
    });
};

export default {
  get: (url, header) => common('get', url, header),
  post: (url, header, body) => common('post', url, header, body),
  put: (url, header, body) => common('put', url, header, body),
  delete: (url, header) => common('delete', url, header)
};
