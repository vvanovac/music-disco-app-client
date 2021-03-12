import VueRouter from 'vue-router';
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

const router = new VueRouter({mode: 'hash', routes: [{
    name: 'login',
    component: Login,
    path: '/login'
  },
  {
    name: 'home',
    component: Home,
    path: '/home',
    alias: ['/']
  },
  {
    name: 'register',
    component: Register,
    path: '/register'
  }],
})

export default router;
