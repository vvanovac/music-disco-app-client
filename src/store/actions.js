import HttpServer from '@/services/http.server';
import { mutation, action } from './store.constants'

export default {
  [action.CLEAR_TOKEN]: ({commit}) => {
    commit(mutation.CLEAR_TOKEN);
    commit(mutation.CLEAR_USER_DATA);
  },
  [action.STORE_TOKEN]: async ({commit, dispatch}, payload) => {
    commit(mutation.STORE_TOKEN, payload);
    await dispatch(action.GET_USER_DATA);
  },
  [action.MESSAGE_PROMPT]: ({commit}, payload) => {
    commit(mutation.ADD_MESSAGE_PROMPT, payload);
  },
  [action.GET_USER_DATA]: async ({commit, state}) => {
    if (!state.userData) {
      const userData = await HttpServer.get('/currentUser', {token: state.token});
      await commit(mutation.FETCH_USER_DATA, userData);
    }
    return state.userData;
  },
  [action.REGISTER]: async ({dispatch}, payload) => {
    try {
      await HttpServer.post('/register', {}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Successfully registered.',
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Registration failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.LOGIN]: async ({dispatch}, payload) => {
    try {
      const token = await HttpServer.post('/login', {}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Successfully logged in.',
        validity: 'success'
      });
      await dispatch(action.STORE_TOKEN, token.accessToken);
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Login failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.CREATE_TASK]: async ({dispatch, state}, payload) => {
    try {
      await HttpServer.post('/tasks', {token: state.token}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Task successfully created.',
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Task creating failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.UPDATE_TASK]: async ({dispatch, state}, payload) => {
    try {
      const {taskID, ...rest} = payload;
      await HttpServer.put(`/tasks/${taskID}`, {token: state.token}, rest);
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Task successfully updated.',
        validity: 'success'
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Task updating failed.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.GET_TASKS]: async ({dispatch, commit, state}, forceFetch) => {
    try {
      if (!state.taskData || forceFetch) {
        const data = await HttpServer.get('/tasks', {token: state.token});
        commit(mutation.STORE_TASK_DATA, data);
      }
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Error during fetching.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.GET_TASK]: async ({dispatch, state}, taskID) => {
    try {
      if (state.taskData && state.taskData.length > 0) {
        return state.taskData.find((task) => task.id === taskID);
      }
      return await HttpServer.get(`/tasks/${taskID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Error during fetching.',
        text: error.message,
        validity: 'error'
      });
    }
  },
  [action.DELETE_TASK]: async ({dispatch, state}, taskID) => {
    try {
      await HttpServer.delete(`/tasks/${taskID}`, {token: state.token})
      dispatch(action.GET_TASKS, true);
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Task successfully deleted.',
        validity: 'success'
      });
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: 'Deletion error.',
        text: error.message,
        validity: 'error'
      })
    }
  }
};
