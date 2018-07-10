import Vue from 'vue'

import App from './App'
import plugins from './plugins'
import router from './router'
import store from './store'

for (let plugin in plugins) {
  Vue.use(plugins[plugin])
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
