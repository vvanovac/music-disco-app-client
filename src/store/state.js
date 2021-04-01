import TokenService from '../services/token.service';

export default {
  token: TokenService.get(),
  messagePrompt: [],
  messagePromptCounter: 0,
  userData: null
};
