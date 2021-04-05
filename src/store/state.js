import TokenService from '../services/token.service';

export default {
  token: TokenService.get(),
  messagePrompt: [],
  messagePromptCounter: 0,
  userData: null,
  taskData: null,
  tasksLength: null,
  taskPage: 1,
  tasksStartIndex: 0,
  tasksEndIndex: 10
};
