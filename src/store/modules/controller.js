// import Cookies from 'js-cookie'
import { getConfigs } from '@/api/admin/adminRender'

const controller = {
  state: {
    configs: []
  },
  mutations: {
    SET_CONFIG: (state, configs) => {
      state.configs = configs
    }
    //  INIT_CURRENT_VIEW: (state, view) => {
    //    // Cookies.set('currentView',view);
    //    state.currentView = view;
    //  }
  },
  actions: {
    //  initConfig( { commit, state }, config) {
    //    // commit('INIT_CONFIG', config);
    //  },
    addConfig ({ commit }, controller) {
      return new Promise((resolve, reject) => {
        getConfigs(controller).then(response => {
          let configs = []
          for (var i = 0; i < response.data.length; i++) {
            var config = response.data[i]
            config.index = i
            configs.push(config)
          }
          commit('SET_CONFIG', configs)
          resolve()
          //  _this.configs = configs;
        }).catch(error => {
          reject(error)
        })
      })
    }
    //  ToggleSideBar({ commit }) {
    //    commit('TOGGLE_SIDEBAR')
    //  },
    //  addVisitedViews({ commit }, view) {
    //    commit('ADD_VISITED_VIEWS', view)
    //  },
    //  delVisitedViews({ commit, state }, view) {
    //    return new Promise((resolve) => {
    //      commit('DEL_VISITED_VIEWS', view)
    //      resolve([...state.visitedViews])
    //    })
    //  },
    //  delOthersViews({ commit, state }, view) {
    //    return new Promise( (resolve) => {
    //      commit('DEL_OTHERS_VIEWS', view);
    //      resolve([...state.visitedViews])
    //    })
    //  },
    //  delAllViews({ commit, state }){
    //    return new Promise( (resolve) => {
    //      commit('DEL_ALL_VIEWS')
    //      resolve([...state.visitedViews])
    //    })
    //  },
    //  initCurrentView({ commit, state }, view){
    //    commit('INIT_CURRENT_VIEW', view);
    //  }
  }
}

export default controller
