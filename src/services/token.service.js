export default {
  get: () => localStorage.getItem('accessToken'),
  set: (token) => localStorage.setItem('accessToken', token),
  delete: () => localStorage.removeItem('accessToken')
}
