const dialog = {
  state: {
    title: '弹框',
    display: false,
    config: {},
    callback: function () {
      alert(1)
    }
  },
  mutations: {
    show (state, options) {
      state.config = options.config
      state.display = true
      state.callback = options.callback
    },
    hidden (state) {
      state.config = {}
      state.display = false
      state.callback()
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
