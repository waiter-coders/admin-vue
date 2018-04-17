import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    visitedViews: [],
    currentView: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ 
      	name: view.name, 
      	path: view.path,
      	title: view.title
      })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    },
    DEL_OTHERS_VIEWS: (state, view) => {
    	for (const [i, v] of state.visitedViews.entries()) {
    		if (v.path === view.path) {
    			state.visitedViews.slice(i,i+1);
    		}
    	}
    },
    DEL_ALL_VIEWS: (state ) => {
    	state.visitedViews = [];
    },
		INIT_CURRENT_VIEW: (state, view) => {
			state.currentView = view;
		}
  },
  actions: {
    ToggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
    	return new Promise( (resolve) => {
    		commit('DEL_OTHERS_VIEWS', view);
    		resolve([...state.visitedViews])
    	})
    },
    delAllViews({ commit, state }){
    	return new Promise( (resolve) => {
    		commit('DEL_ALL_VIEWS')
    		resolve([...state.visitedViews])
    	})
    },
    initCurrentView({ commit, state }, view){
    	commit('INIT_CURRENTVIEW', view); 
    }
  }
}

export default app
