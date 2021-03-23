import VueRouter from 'vue-router';
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import { tokenService } from "@/services/http.server";

const protectionType = {
  unprotected: 'unprotected',
  protected: 'protected',
  adminProtected: 'adminProtected'
}

const generateMeta = (protection) => ({ protection });

const routes = [
  { name: 'register', component: Register, path: '/register', meta: generateMeta(protectionType.unprotected) },
  { name: 'login', component: Login, path: '/login', meta: generateMeta(protectionType.unprotected) },
  { name: 'home', component: Home, path: '/home', alias: ['/'], meta: generateMeta(protectionType.protected) },
];

const router = new VueRouter({mode: 'hash', routes});

router.beforeEach(async (to, from, next) => {
  const redirect = 'login';

  if (to.meta.protection === protectionType.unprotected) {
    return next();
  }
  const token = tokenService.get();
  if (!token) {
    return next(redirect);
  }
  return next();
})
export default router;
