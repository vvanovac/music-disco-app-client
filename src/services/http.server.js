const serverURL = 'http://localhost:3000/';
const tokenService = {
  get: () => localStorage.getItem('userToken'),
  set: (token) => localStorage.setItem('userToken', token),
  delete: () => localStorage.removeItem('userToken')
}
const common = (method, url, body) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const token = tokenService.get();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    const options = {
      method,
      headers,
      body,
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
}

export default {
  storeToken: tokenService.set,
  clearToken: localStorage.delete,
  get: (url) => common('get', url),
  post: (url, body) => common('post', url, body),
  put: (url, body) => common('put', url, body),
  delete: (url) => common('delete', url),
};
