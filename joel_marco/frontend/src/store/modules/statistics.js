'use-strict'
import { api } from '@/webservices/api'
import format from 'date-fns/format'
import Vue from 'vue'
import parseISO from 'date-fns/parseISO'
const COLORS = ['#36A2EB', '#FF8600', '#F1F2F6', '#27187E', '#AEB8FE', '#758BFD']

export const statistics = {
  namespaced: true,
  state: {
    labels: [],
    datasets: []
  },
  mutations: {
    updateItems: (state, statistics) => {
      Vue.set(state, 'labels', Array.from(statistics.labels))
      Vue.set(state, 'datasets', statistics.datasets)
      return state
    }
  },
  actions: {
    fetchChartData: ({ commit }, { intervalType, from, to }) => {
      return new Promise((resolve, reject) => {
        let path = `/statistics?interval=${intervalType}`
        path = from ? `${path}&from=${format(from, 'yyyy-MM-dd\'T\'HH:mm:ss')}` : path
        path = to ? `${path}&to=${format(to, 'yyyy-MM-dd\'T\'HH:mm:ss')}` : path
        api.get(path)
          .then(resp => {
            let datetimeFormat = null
            switch (intervalType) {
              case 'seconds':
                datetimeFormat = 'dd/MM \n HH:mm:ss'
                break
              case 'minutes':
                datetimeFormat = 'dd/MM HH:mm'
                break
              case 'hours':
                datetimeFormat = 'dd/MM HH:mm'
                break
              case 'days':
                datetimeFormat = 'dd/MM'
                break
              case 'weeks':
                datetimeFormat = 'dd/MM - dd/MM'
                break
              case 'months':
                datetimeFormat = 'MM/yyyy'
                break
              case 'years':
                datetimeFormat = 'yyyy'
                break
            }

            const statistics = {
              labels: new Set(),
              data: {},
              datasets: []
            }
            resp.forEach(r => {
              r = r.split(',')
              statistics.labels.add(format(parseISO(r[1]), datetimeFormat))
              if (!(r[0] in statistics.data)) statistics.data[r[0]] = []
              while (statistics.labels.size - 1 > statistics.data[r[0]].length) statistics.data[r[0]].push(0)
              statistics.data[r[0]].push(parseInt(r[2]))
            })
            let colorIndex = 0
            for (const key in statistics.data) {
              if (key !== 'null') {
                while (statistics.labels.size > statistics.data[key].length) statistics.data[key].push(0)
                statistics.datasets.push({
                  label: key,
                  backgroundColor: COLORS[colorIndex],
                  borderColor: COLORS[colorIndex],
                  fill: false,
                  data: statistics.data[key]
                })
                colorIndex = (colorIndex + 1) % COLORS.length
              }
            }
            commit('updateItems', statistics)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getters: {
    labels: state => state.labels,
    datasets: state => state.datasets
  }
}
