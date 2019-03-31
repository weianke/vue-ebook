const actions = {
  setFileName({ commit }, fileName) {
    return commit('SET_FILENAME', fileName)
  },
  setMenuVisible({ commit }, menuVisible) {
    return commit('SET_MENUVISIBLE', menuVisible)
  }
}

export default actions
