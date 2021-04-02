import HttpServer from '@/services/http.server';

export default {
  clearToken: ({commit}) => {
    commit('CLEAR_TOKEN');
    commit('CLEAR_USER_DATA');
  },
  storeToken: async ({commit, dispatch}, payload) => {
    commit('STORE_TOKEN', payload);
    await dispatch('getUserData');
  },
  messagePrompt: ({commit}, payload) => {
    commit('ADD_MESSAGE_PROMPT', payload);
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
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Registration failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  loginUser: async ({dispatch}, payload) => {
    try {
      const token = await HttpServer.post('/login', {}, payload);
      dispatch('messagePrompt', {
        header: 'Successfully logged in.',
        validity: 'success'
      });
      await dispatch('storeToken', token.accessToken);
      return true;
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Login failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  createTask: async ({dispatch, state}, payload) => {
    try {
      await HttpServer.post('/tasks', {token: state.token}, payload);
      dispatch('messagePrompt', {
        header: 'Task successfully created.',
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Task creating failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  updateTask: async ({dispatch, state}, payload) => {
    try {
      const {taskID, ...rest} = payload;
      await HttpServer.put(`/tasks/${taskID}`, {token: state.token}, rest);
      dispatch('messagePrompt', {
        header: 'Task successfully updated.',
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Task updating failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  getTasks: async ({dispatch, commit, state}, forceFetch) => {
    try {
      if (!state.taskData || forceFetch) {
        const data = await HttpServer.get('/tasks', {token: state.token});
        commit('STORE_TASK_DATA', data);
      }
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Error during fetching.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  getTask: async ({dispatch, state}, taskID) => {
    try {
      if (state.taskData && state.taskData.length > 0) {
        return state.taskData.find((task) => task.id === taskID);
      }
      return await HttpServer.get(`/tasks/${taskID}`, {token: state.token});
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Error during fetching.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  deleteTask: async ({dispatch, state}, taskID) => {
    try {
      await HttpServer.delete(`/tasks/${taskID}`, {token: state.token})
      dispatch('messagePrompt', {
        header: 'Task successfully deleted.',
        validity: 'success'
      });
    } catch (error) {
      dispatch('messagePrompt', {
        header: 'Deletion error.',
        text: error.message,
        validity: 'error'
      })
    }
  }
};
