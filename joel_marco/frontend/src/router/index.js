import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import MainView from '../components/MainView'

import Login from '../views/Login.vue'
import UserForm from '../views/UserForm.vue'
import Charts from '../views/Charts.vue'
import Home from '../views/Home.vue'
import Wrapper from '../views/AuditLog/Wrapper.vue'
import Cont from '@/views/AuditLog/Cont.vue'
// import Tps from '@/views/AuditLog/Tps'

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/cont')
}

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: MainView,
  beforeEnter: ifAuthenticated,
  children: [
    {
      path: '',
      name: 'Home',
      component: Home,
      beforeEnter: ifNotAuthenticated
    }, {
      path: 'charts',
      name: 'Charts',
      component: Charts,
      beforeEnter: ifAuthenticated
    }, {
      path: 'logs',
      name: 'Logs',
      component: Wrapper,
      beforeEnter: ifAuthenticated
    }, {
      path: 'cont',
      name: 'Cont',
      component: Cont,
      beforeEnter: ifAuthenticated
    }, {
      path: '/usuarios',
      name: 'NewUser',
      component: UserForm,
      beforeEnter: ifNotAuthenticated,
      props: {
        newUser: true
      }
    }
  ]
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter: ifNotAuthenticated
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
