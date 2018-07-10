import Vue from 'vue'
import Router from 'vue-router'

import Chat from '@/components/Chat.vue'
import LoginForm from '@/components/LoginForm.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  }, {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (localStorage.jwtToken) {
        next()
      } else {
        next(from.fullPath)
      }
    }
  }]
})
