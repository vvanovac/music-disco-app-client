import TokenService from '../services/token.service';

export default (Vuex) => {
  return new Vuex.Store({
    state: {
      token: TokenService.get(),
      messagePrompt: {},
    },
    mutations: {
      CLEAR_TOKEN: (state) => {
        TokenService.delete();
        state.token = TokenService.get();
      },
      STORE_TOKEN: (state, payload) => {
        TokenService.set(payload);
        state.token = TokenService.get();
      },
      ADD_MESSAGE_PROMPT: (state, messageData) => {
        state.messagePrompt = { ...messageData, showPrompt: true }
        setTimeout(() => {
          state.messagePrompt.showPrompt = false
        }, 3000)
      }
    },
    actions: {
      clearToken: ({commit}) => {
        commit('CLEAR_TOKEN');
      },
      storeToken: ({commit}, payload) => {
        commit('STORE_TOKEN', payload);
      },
      messagePrompt: ({commit}, payload) => {
        commit('ADD_MESSAGE_PROMPT', payload)
      }
    },
    getters: {
      messagePrompt: state => state.messagePrompt
    }
  });
}
