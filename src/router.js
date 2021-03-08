import Login from './components/Login';
import VueRouter from 'vue-router';

const router = new VueRouter({mode: 'history', routes: [{
    name: 'login',
    component: Login,
    path: '/login'
  }]
})

export default router;
