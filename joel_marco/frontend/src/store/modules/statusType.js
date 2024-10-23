'use-strict'
import { api } from '../../webservices/api'
import Vue from 'vue'
export const statusType = {
  namespaced: true,
  state: {
    items: {
      dict: {},
      array: []
    }
  },
  mutations: {
    update: (state, list) => {
      const newStore = {}
      list.map(i => { newStore[i.status] = i.description })
      Vue.set(state.items, 'array', list)
      Vue.set(state.items, 'dict', newStore)
      return state
    }
  },
  actions: {
    fetch: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const path = '/status-type'
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
    types: state => state.items
  }
}
