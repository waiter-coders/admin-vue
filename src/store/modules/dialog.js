const dialog = {
  state: {
    title: '弹框',
    display: false,
    config: {}
  },
  mutations: {
    show (state, options) {
      state.config = options.config
      state.display = true
    },
    hidden (state) {
      state.config = {}
      state.display = false
    }
  },
  actions: {
    showDialog (context, options) {
      context.commit('show', options)
    },
    hiddenDialog (context) {
      context.commit('hidden')
    }
  }
}

export default dialog
