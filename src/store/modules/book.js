const state = () => ({
  test: 1
})

const mutations = {
  SET_TEST(state, newTest) {
    state.test = newTest
  }
}


const actions = {
  setTest({
    commit,
    state
  }, newTest) {
    commit('SET_TEST', newTest)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
