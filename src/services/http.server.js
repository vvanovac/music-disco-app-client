const serverURL = process.env.VUE_APP_SERVER_URL || 'http://localhost:3000';

export default (state) => {
  const common = (method, url, body) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const token = state.state.token;
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

  return {
    get: (url) => common('get', url),
    post: (url, body) => common('post', url, body),
    put: (url, body) => common('put', url, body),
    delete: (url) => common('delete', url),
  }
}
