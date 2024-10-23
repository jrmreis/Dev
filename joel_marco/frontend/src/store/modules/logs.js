'use-strict'
import { api } from '@/webservices/api'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import Vue from 'vue'
export const logs = {
  namespaced: true,
  state: {
    items: [],
    selected: null,
    pageable: {
      currentPage: 1,
      empty: true,
      first: false,
      last: true,
      number: 0,
      numerOfElements: 0,
      size: 0,
      sort: {},
      totalElements: 0,
      totalPages: 0,
      sortAsc: true
    }
  },
  mutations: {
    update: (state, list) => {
      Vue.set(state, 'items', list)
      return state
    },
    setSelected: (state, log) => {
      Vue.set(state, 'selected', log)
      return state
    },
    updatePageable: (state, resp) => {
      const pageable = {
        currentPage: resp.number,
        empty: resp.empty,
        first: resp.first,
        last: resp.last,
        number: resp.number,
        numerOfElements: resp.numberOfElements,
        size: resp.size,
        sort: resp.sort,
        totalElements: resp.totalElements,
        totalPages: resp.totalPages,
        sortAsc: resp.sortAsc
      }

      Vue.set(state, 'pageable', pageable)
      return state
    }
  },
  actions: {
    search: ({ commit }, { date, page = 0, size = 20, sortAsc = true, server = null, status = null, pan = null, tps = null }) => {
      return new Promise((resolve, reject) => {
        const dateString = format(date, 'yyyy-MM-dd\'T\'HH:mm:ss')
        const path = '/auditlogs/search'
        if (server === 'null') server = null
        if (status === 'null') status = null
        if (pan === 'null' || pan === '') pan = null
        const body = {
          date: dateString,
          page: page,
          size: size,
          sortAsc: sortAsc,
          server: server,
          status: status,
          pan: pan,
          tps: tps
        }
        api.post(path, body)
          .then(resp => {
            const content = resp.content.map(log => {
              const dateObj = parseISO(log.transactionDatetime)
              return { ...log, transactionDate: format(dateObj, 'dd/MM/yyyy'), transactionTime: format(dateObj, 'HH:mm:ss') }
            })

            resp.sortAsc = sortAsc
            commit('update', content)
            commit('updatePageable', resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchLastDate: ({ commit }, { size = '20' }) => {
      return new Promise((resolve, reject) => {
        const path = `/auditlogs/load-last-date?&size=${size}`
        api.get(path)
          .then(resp => {
            const content = resp.content.map(log => {
              const dateObj = parseISO(log.transactionDatetime)
              return { ...log, transactionDate: format(dateObj, 'dd/MM/yyyy'), transactionTime: format(dateObj, 'HH:mm:ss') }
            })
            commit('update', content)
            commit('updatePageable', resp)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    details: ({ commit }, { date, system, token }) => {
      return new Promise((resolve, reject) => {
        const path = `/auditlogs?date=${date}&system=${system}&token=${token}`
        api.get(path)
          .then(resp => {
            commit('setSelected', resp)
            resolve(resp)
          })
          .catch(err => { reject(err) })
      })
    }
  },
  getters: {
    logs: state => state.items,
    selected: state => state.selected,
    pageable: state => state.pageable
  }
}
