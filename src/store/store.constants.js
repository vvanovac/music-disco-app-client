const mutation = {
  CLEAR_TOKEN: 'CLEAR_TOKEN',
  STORE_TOKEN: 'STORE_TOKEN',
  ADD_MESSAGE_PROMPT: 'ADD_MESSAGE_PROMPT',
  FETCH_USER_DATA: 'FETCH_USER_DATA',
  CLEAR_USER_DATA: 'CLEAR_USER_DATA',
  STORE_TASK_DATA: 'STORE_TASK_DATA',
};

const action = {
  CLEAR_TOKEN: 'clearToken',
  STORE_TOKEN: 'storeToken',
  MESSAGE_PROMPT: 'messagePrompt',
  GET_USER_DATA: 'getUserData',
  REGISTER: 'registerUser',
  LOGIN: 'loginUser',
  CREATE_TASK: 'createTask',
  UPDATE_TASK: 'updateTask',
  GET_TASKS: 'getTasks',
  GET_TASK: 'getTask',
  DELETE_TASK: 'deleteTask'
}

const getter = {
  MESSAGE_PROMPT: 'messagePrompt',
  UNPROTECTED_ROUTES: 'unprotectedRoutes',
  ADMIN_PROTECTED_ROUTES: 'adminProtectedRoutes',
  USER_DATA: 'userData',
  TASK_DATA: 'taskData'
}

export {
  mutation,
  action,
  getter
}

