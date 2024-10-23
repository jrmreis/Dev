'use-strict'
import { api } from '../../webservices/api'
import Vue from 'vue'
export const fields = {
  namespaced: true,
  state: {
    in: [],
    out: []
  },
  mutations: {
    update: (state, array) => {
      const newIn = array.filter(field => field.flow === 'I')
      const newOut = array.filter(field => field.flow === 'O')
      Vue.set(state, 'in', newIn)
      Vue.set(state, 'out', newOut)
      return state
    }
  },
  actions: {
    fetch: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const path = '/fields'
        api.get(path)
          .then(resp => {
            commit('update', resp)
            resolve(resp)
          })
          .catch(err => { reject(err) })
      })
    }
  },
  getters: {
    in: state => state.in,
    out: state => state.out
  }
}
