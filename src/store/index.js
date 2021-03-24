import TokenService from '../services/token.service';
import HttpServer from '../services/http.server'

export default (Vuex) => {
  return new Vuex.Store({
    state: {
      token: TokenService.get(),
      messagePrompt: null,
      userData: null
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
        state.messagePrompt = { header: '', text: '', ...messageData }
        setTimeout(() => {
          state.messagePrompt = null;
        }, 3000)
      },
      FETCH_USER_DATA: (state, payload) => {
        state.userData = payload;
      },
      CLEAR_USER_DATA: state => {
        state.userData = null
      }
    },
    actions: {
      clearToken: ({commit}) => {
        commit('CLEAR_TOKEN');
        commit('CLEAR_USER_DATA');
      },
      storeToken: async ({commit, dispatch}, payload) => {
        commit('STORE_TOKEN', payload);
        await dispatch('getUserData');
      },
      messagePrompt: ({commit}, payload) => {
        commit('ADD_MESSAGE_PROMPT', payload)
      },
      getUserData: async ({commit, state}) => {
        if (!state.userData) {
          const userData = await HttpServer.get('/currentUser', {token: state.token});
          await commit('FETCH_USER_DATA', userData);
        }
        return state.userData;
      },
      registerUser: async ({dispatch}, payload) => {
        try {
          await HttpServer.post('/register', {}, payload);
          dispatch('messagePrompt', {
            header: 'Successfully registered.',
            validity: 'success',
          })
          return true;
        } catch (error) {
          dispatch('messagePrompt', {
            header: 'Registration failed.',
            text: error.message,
            validity: 'error',
          })
        }
      },
      loginUser: async ({dispatch}, payload) => {
        try {
          const token = await HttpServer.post('/login', {}, payload);
          dispatch('messagePrompt',{
            header: 'Successfully logged in.',
            validity: 'success',
          })
          await dispatch('storeToken', token.accessToken);
          return true;
        } catch (error) {
          dispatch('messagePrompt', {
            header: 'Login failed.',
            text: error.message,
            validity: 'error',
          })
        }
      }
    },
    getters: {
      messagePrompt: state => state.messagePrompt,
      unprotectedRoutes: () => ['register', 'login'],
      adminProtectedRoutes: () => [],
      userData: state => state.userData
    }
  });
}
