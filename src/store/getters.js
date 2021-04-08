export default {
  messagePrompt: state => state.messagePrompt.slice(0, 4),
  unprotectedRoutes: () => ['register', 'login'],
  adminProtectedRoutes: () => ['administrator', 'createTasks', 'updateTasks', 'task'],
  userData: state => state.userData,
  taskData: (state) => state.taskData || [],
};
