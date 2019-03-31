import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book
  },
  getters,
  actions
})
