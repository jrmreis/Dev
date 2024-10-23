import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap'
import jQuery from 'jquery'
import axios from 'axios'
import Swal from 'sweetalert2'
import './assets/css/app.scss'

window.$ = window.jQuery = jQuery
Vue.config.ignoredElements = [/^ion-/]
Object.defineProperty(Vue.prototype, '$Swal', { value: Swal })

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')
if (token) axios.defaults.headers.common.Authorization = token

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
