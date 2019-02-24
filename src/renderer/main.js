import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import db from './datastore'

import App from './App'
import router from './router'
import store from './store'

Vue.use(ElementUI, {locale})
Vue.prototype.$db = db
Vue.prototype.$cutTime = function (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
