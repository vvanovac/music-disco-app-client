import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import HttpServer from './services/http.server'
import Store from './store';

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false
const storeUsed = Store(Vuex);
Vue.prototype.$http = HttpServer(storeUsed);

new Vue({
  render: h => h(App),
  router: router(storeUsed),
  store: storeUsed
}).$mount('#app')
