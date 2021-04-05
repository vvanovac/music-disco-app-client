export default {
  messagePrompt: state => state.messagePrompt.slice(0, 4),
  unprotectedRoutes: () => ['register', 'login'],
  adminProtectedRoutes: () => ['administrator', 'createTasks', 'updateTasks', 'task'],
  userProtectedRoutes: () => ['home'],
  userData: state => state.userData,
  taskData: (state) => state.taskData || [],
  taskPagination: (state) => {
    return {
      start: state.tasksStartIndex,
      end: state.tasksEndIndex
    }
  }
};
