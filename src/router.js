import VueRouter from 'vue-router';
import Login from './pages/Login';
import Home from '@/pages/Home';

const router = new VueRouter({mode: 'history', routes: [{
    name: 'login',
    component: Login,
    path: '/login'
  },
  {
    name: 'home',
    component: Home,
    path: 'home'
  }],
})

export default router;
