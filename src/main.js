import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import HttpServer from './services/http.server'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$http = HttpServer;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#login')
