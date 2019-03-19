const book = {
  state: {
    test: 1
  },
  mutations: {
    SET_TEST(state, newTest) {
      state.test = newTest
    }
  },
  actions: {
    setTest({
      commit,
      state
    }, newTest) {
      return commit('SET_TEST', newTest)
    }
  }
}

export default book
