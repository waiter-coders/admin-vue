import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
// import user from './modules/user'
// import power from './modules/power'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app
    // user
    // power
  },
  getters
})

export default store
