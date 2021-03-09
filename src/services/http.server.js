const serverURL = 'http://localhost:3000/';
const tokenService = {
  get: () => localStorage.getItem('accessToken'),
  set: (token) => localStorage.setItem('accessToken', token),
  delete: () => localStorage.removeItem('accessToken')
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
      body: JSON.stringify(body),
      redirect: 'follow'
    };
    let ok = true;
    return fetch(serverURL + url, options)
      .then((data) => {
        console.log(data, "data")
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
  clearToken: tokenService.delete,
  get: (url) => common('get', url),
  post: (url, body) => common('post', url, body),
  put: (url, body) => common('put', url, body),
  delete: (url) => common('delete', url),
};
