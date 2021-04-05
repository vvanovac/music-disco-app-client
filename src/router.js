import VueRouter from 'vue-router';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Administrator from '@/pages/Administrator';
import Tasks from '@/pages/Tasks';
import Task from '@/pages/Single.task';

const routes = [
  { name: 'register', component: Register, path: '/register' },
  { name: 'login', component: Login, path: '/login'},
  { name: 'home', component: Home, path: '/home', alias: ['/']},
  { name: 'administrator', component: Administrator, path: '/administrator' },
  { name: 'createTasks', component: Tasks, path: '/administrator/tasks' },
  { name: 'updateTasks', component: Tasks, path: `/administrator/tasks/:taskID` },
  { name: 'task', component: Task, path: `/administrator/tasks/view/:taskID` }
];

const router = (store) => {
  const routerUsed = new VueRouter({ mode: 'hash', routes });

  routerUsed.beforeEach(async (to, from, next) => {
    const redirect = 'login';

    if (store.getters.unprotectedRoutes.includes(to.name)) {
      return next();
    }
    const token = store.state.token;
    if (!token) {
      return next(redirect);
    }
    const userData = await store.dispatch('getUserData');
    if (userData && !userData.isAdmin && store.getters.adminProtectedRoutes.includes(to.name)) {
      store.dispatch('messagePrompt', {
        header: 'Access not allowed.',
        text: 'You cannot access this.',
        validity: 'error'
      });
      return next({ name: 'home' });
    }
    return next();
  });
  return routerUsed;
};

export default router;
