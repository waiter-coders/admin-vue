import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import controller from './modules/controller'
import dialog from './modules/dialog'
//import user from './modules/user'
//import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    controller,
    //user,
    //permission
    dialog
  },
  getters
})

export default store
