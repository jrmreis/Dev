'use-strict'
import { api } from '@/webservices/api'
import Vue from 'vue'
export const system = {
  namespaced: true,
  state: {
    items: []
  },
  mutations: {
    update: (state, list) => {
      Vue.set(state, 'items', list)
      return state
    }
  },
  actions: {
    fetch: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const path = '/auditlogs/systems'
        api.get(path)
          .then(resp => {
            commit('update', resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    list: state => state.items
  }
}
