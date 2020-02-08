import Vue from 'vue'
import Vuex from 'vuex'
import tenant from './modules/tenant';
import land from './modules/land';
import electricity from './modules/electricity';
import water from './modules/water'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tenant,
    land,
    electricity,
    water
  }
})
