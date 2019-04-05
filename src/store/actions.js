const actions = {
  setFileName({ commit }, fileName) {
    return commit('SET_FILENAME', fileName)
  },
  setMenuVisible({ commit }, menuVisible) {
    return commit('SET_MENUVISIBLE', menuVisible)
  },
  setSettingVisible({ commit }, settingVisible) {
    return commit('SET_SETTINGVISIBLE', settingVisible)
  },
  setDefaultFontSize({ commit },defaultFontSize) {
    return commit('SET_DEFAULT_FONT_SIZE', defaultFontSize)
  }
}

export default actions
