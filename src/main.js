import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate/src';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue'
import router from './router'
import HttpServer from './services/http.server'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.prototype.$http = HttpServer;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#login')
