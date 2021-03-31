export default {
  messagePrompt: state => state.messagePrompt.slice(0, 4),
  unprotectedRoutes: () => ['register', 'login'],
  adminProtectedRoutes: () => ['administrator', 'administrator/tasks'],
  userData: state => state.userData
}
