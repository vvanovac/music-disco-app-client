//u store -> token, i podaci korisnika
import TokenService from '../services/token.service';

export default (Vuex) => {
  return new Vuex.Store({
    state: {
      token: TokenService.get()
    },
    mutations: {
      CLEAR_TOKEN: (state) => {
        TokenService.delete();
        state.token = TokenService.get();
      },
      STORE_TOKEN: (state, payload) => {
        TokenService.set(payload);
        state.token = TokenService.get();
      }
    },
    actions: {
      clearToken: ({commit}) => {
        commit('CLEAR_TOKEN');
      },
      storeToken: ({commit}, payload) => {
        commit('STORE_TOKEN', payload);
      }
    },
    getters: {
      getTestValue: state => state.test
    }
  });
}
