import HttpServer from '@/services/http.server';
import { mutation, action } from './store.constants'
import {messageHeader, messageText, messageValidity} from '@/constants/message.constants';

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
  },
  [action.CREATE_LESSON]: async ({dispatch, state}, payload) => {
    try {
      const lesson = await HttpServer.post('/lessons', {token: state.token}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_CREATED,
        validity: messageValidity.SUCCESS
      });
      return {data: lesson, status: true};
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_CREATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.UPDATE_LESSON]: async ({dispatch, state}, payload) => {
    try {
      const {lessonID, ...rest} = payload;
      const lesson = await HttpServer.put(`/lessons/${lessonID}`, {token: state.token}, rest);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_UPDATED,
        validity: messageValidity.SUCCESS
      });
      return {data: lesson, status: true};
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_UPDATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_LESSONS]: async ({dispatch, commit, state}, forceFetch) => {
    try {
      if (!state.lessonData || forceFetch) {
        const data = await HttpServer.get('/lessons', {token: state.token});
        state.lessonDataLength = data.length;
        commit(mutation.STORE_LESSON_DATA, data);
      }
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_LESSON]: async ({dispatch, state}, lessonID) => {
    try {
      if (state.lessonData && state.lessonData.length > 0) {
        return state.lessonData.find((lesson) => lesson.id === lessonID);
      }
      return await HttpServer.get(`/lessons/${lessonID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_COURSE_ID]: async ({dispatch, state}, lessonID) => {
    try {
      return await HttpServer.get(`/lessons/courseID/${lessonID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.DELETE_LESSON]: async ({dispatch, state}, lessonID) => {
    try {
      await HttpServer.delete(`/lessons/${lessonID}`, {token: state.token});
      dispatch(action.GET_LESSONS, true);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_DELETED,
        validity: messageValidity.SUCCESS
      });
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_DELETING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      })
    }
  },
  [action.CREATE_TASK_LESSON]: async ({dispatch, state}, payload) => {
    try {
      await HttpServer.post('/taskLesson', {token: state.token}, payload);
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_CREATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.UPDATE_TASK_LESSON]: async ({dispatch, state}, payload) => {
    try {
      const {taskLessonID, ...rest} = payload;
      await HttpServer.put(`/taskLesson/${taskLessonID}`, {token: state.token}, rest);
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_UPDATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_TASK_LESSON_ID]: async ({dispatch, state}, payload) => {
    try {
      return await HttpServer.get(`/taskLesson/${payload.lessonID}/${payload.taskID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.DELETE_TASK_LESSON]: async ({dispatch, state}, taskLessonID) => {
    try {
      await HttpServer.delete(`/taskLesson/${taskLessonID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.LESSON_DELETING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      })
    }
  },
  [action.GET_TASK_PROGRESS]: async ({dispatch, commit, state}, payload) => {
    try {
      const data = await HttpServer.get(`/userProgress/taskProgress/${payload.userID}/${payload.lessonID}`, {token: state.token});
      commit(mutation.STORE_TASK_PROGRESS_DATA, data);
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.COUNT_COMPLETED_TASKS]: async ({dispatch, state}, payload) => {
    try {
      return await HttpServer.get(`/userProgress/completedTasks/${payload.userID}/${payload.lessonID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.CREATE_USER_PROGRESS]: async ({dispatch, state}, payload) => {
    try {
      const { userID, lessonID, taskID } = payload;
      const taskLessonID = await dispatch(action.GET_TASK_LESSON_ID, {lessonID, taskID});
      return await HttpServer.post(
          `/userProgress`,
          { token: state.token },
          { users: userID, taskLesson: taskLessonID.id, completed: false },
      );
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.STARTING_ERROR,
        text: messageText.STARTING_ERROR,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_USER_PROGRESS_ID]: async ({dispatch, state}, payload) => {
    try {
      return await HttpServer.get(`/userProgress/id/${payload.userID}/${payload.lessonID}/${payload.taskID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });    }
  },
  [action.UPDATE_USER_PROGRESS]: async ({dispatch, state}, payload) => {
    try {
      const { id, ...rest } = payload;
      return await HttpServer.put(`/userProgress/${id}`, {token: state.token}, rest);
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.IS_LESSON_STARTED]: async ({dispatch}, payload) => {
    try {
      const lesson = await dispatch(action.GET_LESSON, payload.lessonID);
      const userProgress = await dispatch(action.GET_USER_PROGRESS_ID, {
        userID: payload.userID,
        lessonID: payload.lessonID,
        taskID: lesson.listOfTasks[0],
      });
      return !!userProgress;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.CREATE_COURSE]: async ({dispatch, state}, payload) => {
    try {
      await HttpServer.post('/courses', {token: state.token}, payload);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_CREATED,
        validity: messageValidity.SUCCESS
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_CREATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_COURSES]: async ({dispatch, commit, state}, forceFetch) => {
    try {
      if (!state.courseData || forceFetch) {
        const data = await HttpServer.get('/courses', {token: state.token});
        state.courseDataLength = data.length;
        commit(mutation.STORE_COURSE_DATA, data);
      }
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.GET_COURSE]: async ({dispatch, state}, courseID) => {
    try {
      if (state.courseData && state.courseData.length > 0) {
        return state.courseData.find((course) => course.id === courseID);
      }
      return await HttpServer.get(`/courses/${courseID}`, {token: state.token});
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.FETCHING_ERROR,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.UPDATE_COURSE]: async ({dispatch, state}, payload) => {
    try {
      const {courseID, ...rest} = payload;
      await HttpServer.put(`/courses/${courseID}`, {token: state.token}, rest);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_UPDATED,
        validity: messageValidity.SUCCESS
      });
      return true;
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_UPDATING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      });
    }
  },
  [action.DELETE_COURSE]: async ({dispatch, state}, courseID) => {
    try {
      await HttpServer.delete(`/courses/${courseID}`, {token: state.token});
      dispatch(action.GET_COURSES, true);
      dispatch(action.GET_LESSONS, true);
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_DELETED,
        validity: messageValidity.SUCCESS
      });
    } catch (error) {
      dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.COURSE_DELETING_FAILED,
        text: error.message,
        validity: messageValidity.ERROR
      })
    }
  },
};
