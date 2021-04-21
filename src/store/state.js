import TokenService from '../services/token.service';

export default {
  token: TokenService.get(),
  messagePrompt: [],
  messagePromptCounter: 0,
  userData: null,
  taskData: null,
  taskDataLength: 0,
  paginationPage: 0,
  dataPerPage: 10,
  numberOfRows: [5, 10, 25, 100],
  sortCriteria: null
};
