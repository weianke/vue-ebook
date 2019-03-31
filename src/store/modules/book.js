const book = {
  state: {
    fileName: '',
    menuVisible: false
  },
  mutations: {
    SET_FILENAME(state, fileName) {
      state.fileName = fileName
    },
    SET_MENUVISIBLE(state, menuVisible) {
      state.menuVisible = menuVisible
    }
  },
  actions: {
    setFileName({ commit }, fileName) {
      return commit('SET_FILENAME', fileName)
    },
    setMenuVisible ({ commit }, menuVisible) {
      return commit('SET_MENUVISIBLE', menuVisible)
    }
  }
}

export default book
