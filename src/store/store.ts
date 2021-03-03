import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.ts'
import getters from './getters.ts'
import mutations from './mutations.ts'
import state from './state.ts'
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
