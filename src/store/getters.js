export default {
  messagePrompt: state => state.messagePrompt.slice(0, 4),
  unprotectedRoutes: () => ['register', 'login'],
  adminProtectedRoutes: () => ['administrator', 'administrator/tasks'],
  userData: state => state.userData,
  taskData: () => [
    {taskID: 1, title: 'task 1 title'},
    {taskID: 2, title: 'task 2 title'},
    {taskID: 3, title: 'task 3 title'},
    {taskID: 4, title: 'task 4 title'},
    {taskID: 5, title: 'task 5 title'},
    {taskID: 6, title: 'task 6 title'},
    {taskID: 7, title: 'task 7 title'},
    {taskID: 8, title: 'task 8 title'},
    {taskID: 9, title: 'task 9 title'},
    {taskID: 10, title: 'task 10 title'}
  ]
}
