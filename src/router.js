import VueRouter from 'vue-router';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Administrator from '@/pages/Administrator';
import Tasks from '@/pages/Tasks';
import Task from '@/pages/Single.task';
import Lessons from '@/pages/Lessons';
import { action, getter } from '@/store/store.constants';
import { messageHeader, messageText, messageValidity } from '@/constants/message.constants';

const routes = [
  { name: 'register', component: Register, path: '/register' },
  { name: 'login', component: Login, path: '/login'},
  { name: 'home', component: Home, path: '/home', alias: ['/']},
  { name: 'administrator', component: Administrator, path: '/administrator' },
  { name: 'createTasks', component: Tasks, path: '/administrator/tasks' },
  { name: 'updateTasks', component: Tasks, path: `/administrator/tasks/:taskID` },
  { name: 'task', component: Task, path: `/tasks/:taskID` },
  { name: 'createLessons', component: Lessons, path: '/administrator/lessons' },
  { name: 'updateLessons', component: Lessons, path: '/administrator/lessons/:lessonID' }
];

const router = (store) => {
  const routerUsed = new VueRouter({ mode: 'hash', routes });

  routerUsed.beforeEach(async (to, from, next) => {
    const redirect = 'login';

    if (store.getters[getter.UNPROTECTED_ROUTES].includes(to.name)) {
      return next();
    }
    const token = store.state.token;
    if (!token) {
      return next(redirect);
    }
    const userData = await store.dispatch(action.GET_USER_DATA);
    if (userData && !userData.isAdmin && store.getters[getter.ADMIN_PROTECTED_ROUTES].includes(to.name)) {
      store.dispatch(action.MESSAGE_PROMPT, {
        header: messageHeader.UNAUTHORIZED,
        text: messageText.UNAUTHORIZED,
        validity: messageValidity.ERROR
      });
      return next({ name: 'home' });
    }
    return next();
  });
  return routerUsed;
};

export default router;
