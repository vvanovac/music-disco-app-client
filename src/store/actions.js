import HttpServer from '@/services/http.server';
import { mutation, action } from './store.constants'
import { messageHeader, messageValidity } from '@/constants/message.constants';

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
        header: messageHeader.REGISTERED,
        validity: messageValidity.SUCCESS
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.REGISTRATION_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.LOGIN]: async ({dispatch}, payload) => {
    try {
      const token = await HttpServer.post('/login', {}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LOGGED_IN,
        validity: messageValidity.SUCCESS
      });
      await dispatch(action.STORE_TOKEN, token.accessToken);
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LOGIN_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.CREATE_TASK]: async ({dispatch, state}, payload) => {
    try {
      await HttpServer.post('/tasks', {token: state.token}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_CREATED,
        validity: messageValidity.SUCCESS
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_CREATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.UPDATE_TASK]: async ({dispatch, state}, payload) => {
    try {
      const {taskID, ...rest} = payload;
      await HttpServer.put(`/tasks/${taskID}`, {token: state.token}, rest);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_UPDATED,
        validity: messageValidity.SUCCESS
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_UPDATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_TASKS]: async ({dispatch, commit, state}, forceFetch) => {
    try {
      if (!state.taskData || forceFetch) {
        const data = await HttpServer.get('/tasks', {token: state.token});
        state.taskDataLength = data.length;
        commit(mutation.STORE_TASK_DATA, data);
      }
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
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
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.DELETE_TASK]: async ({dispatch, state}, taskID) => {
    try {
      await HttpServer.delete(`/tasks/${taskID}`, {token: state.token})
      dispatch(action.GET_TASKS, true);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_DELETED,
        validity: messageValidity.SUCCESS
      });
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.TASK_DELETING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      })
    }
  },
  [action.SET_SLICE]: ({commit}, page) => {
    commit(mutation.SET_SLICE, page);
  },
  [action.SET_DATA_PER_PAGE]: ({commit}, perPage) => {
    commit(mutation.SET_DATA_PER_PAGE, perPage);
  },
  [action.SET_SORT_CRITERIA]: ({commit}, criteria) => {
    commit(mutation.SET_SORT_CRITERIA, criteria);
  }
};
