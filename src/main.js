import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store.js'
import Vuetify from 'vuetify'
import {Upload} from 'element-ui'
import 'vuetify/dist/vuetify.min.css'
import 'element-ui/lib/theme-chalk/index.css';
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})
Vue.use(Vuetify)
Vue.use(Upload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
