const book = {
  state: {
    fileName: ''
  },
  mutations: {
    SET_FILENAME(state, fileName) {
      state.fileName = fileName
    }
  },
  actions: {
    setFileName({
      commit
    }, fileName) {
      return commit('SET_FILENAME', fileName)
    }
  }
}

export default book
