import TokenService from '../services/token.service';
import { mutation } from '@/store/store.constants';

export default {
  [mutation.CLEAR_TOKEN]: (state) => {
    TokenService.delete();
    state.token = TokenService.get();
  },
  [mutation.STORE_TOKEN]: (state, payload) => {
    TokenService.set(payload);
    state.token = TokenService.get();
  },
  [mutation.ADD_MESSAGE_PROMPT]: (state, messageData) => {
    const currentIndex = state.messagePromptCounter;
    state.messagePromptCounter++;
    state.messagePrompt.push({header: '', text: '', ...messageData, index: currentIndex});
    setTimeout(() => {
      state.messagePrompt = state.messagePrompt.filter((message) => message.index !== currentIndex);
      if (state.messagePrompt.length === 0) {
        state.messagePromptCounter = 0;
      }
    }, 3000);
  },
  [mutation.FETCH_USER_DATA]: (state, payload) => {
    state.userData = payload;
  },
  [mutation.CLEAR_USER_DATA]: state => {
    state.userData = null;
  },
  [mutation.STORE_TASK_DATA]: (state, payload) => {
    state.taskData = payload;
  }
};
