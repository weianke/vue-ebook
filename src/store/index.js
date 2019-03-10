import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book
  }
})
