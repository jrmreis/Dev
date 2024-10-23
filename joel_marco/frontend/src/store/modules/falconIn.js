'use-strict'
import { api } from '../../webservices/api'
import Vue from 'vue'
export const falconIn = {
  namespaced: true,
  state: {
    item: {}
  },
  mutations: {
    update: (state, dict) => {
      Vue.set(state, 'item', dict)
      return state
    }
  },
  actions: {
    fetch: ({ commit }, { date, system, token }) => {
      return new Promise((resolve, reject) => {
        const path = `/falcon-in?date=${date}&system=${system}&token=${token}`
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
    get: state => state.item
  }
}
