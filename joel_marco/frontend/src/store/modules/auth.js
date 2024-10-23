'use-strict'
// import axios from 'axios'
import { api } from '../../webservices/api'

export const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
  },
  mutations: {
    request: state => {
      state.status = 'loading'
    },
    success: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    error: state => {
      state.status = 'error'
    },
    logout: state => {
      state.status = 'unlogged'
    }
  },
  actions: {
    login: ({ commit, dispatch }, data) => {
      console.dir(data)
      return new Promise((resolve, reject) => {
        commit('request')
        api.login(data)
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('user-token', token)
            api.setToken(token)
            commit('success', token)
            dispatch('request')
            resolve(resp)
          })
          .catch(err => {
            commit('error', err)
            localStorage.removeItem('user-token')
            reject(err)
          })
      })
    },
    request: ({ commit, dispatch }, token) => {
      return new Promise((resolve, reject) => {
        commit('request', token)
      })
    },
    logout: ({ commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('user-token')
        api.deleteToken(null)
        resolve()
      })
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  }
}
