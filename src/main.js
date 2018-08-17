//  The Vue build version to load with the `import` command
//  (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Icon from 'vue-svg-icon/Icon.vue'
import { AdminBuilder, AdminDialog } from '@/widgets/admin'
//  import './mock'

Vue.component('icon', Icon)
Vue.component('admin-builder', AdminBuilder)
Vue.component('admin-dialog', AdminDialog)

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
