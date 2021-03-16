import VueRouter from 'vue-router';
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";

const router = new VueRouter({mode: 'hash', routes: [{
    name: 'register',
    component: Register,
    path: '/register'
  },
  {
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
    name: 'lessons',
    //this component should be the one for lessons page
    path: '/lessons'
  },
  {
    name: 'courses',
    //this component should be the one for courses page
    path: '/courses'
  },
  {
    name: 'challenges',
    //this component should be the one for challenges page
    path: '/challenges'
  }],
})

export default router;
