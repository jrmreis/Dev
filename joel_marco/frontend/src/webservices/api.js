'use-strict'
import store from '../store'
import axios from 'axios'

const API_HOST = `http://${window.location.hostname}:8092`

export class API {
  constructor () {
    this.url = API_HOST
    this.token = null
  }

  get (path) { return this.request('GET', path, null, null) }

  post (path, body) {
    return axios.post(`${this.url}${path}`, body)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) return res.data ? res.data : res
        else return this.displayError(res, `POST: ${path}`)
      })
      .catch(error => this.displayError(error, `POST: ${path}`))
  }

  request (methodType, path, data = null) {
    const params = {
      url: `${this.url}${path}`,
      method: methodType,
      data: data
    }
    return axios(params)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) return res.data ? res.data : res
        else return this.displayError(res, `${methodType}: ${path}`)
      })
      .catch(error => this.displayError(error, `${methodType}: ${path}`))
  }

  displayError (error, method) {
    if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
      store.dispatch('auth/logout')
    }
    if (error.response) {
      console.error(`API ${method} response error: `)
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
    } else if (error.request) console.error('Request error: ', error.request)
    else console.error(`API ${method} error message: `, error.message)
    console.error(`API ${method} Config error: `, error.config)
    throw error
  }

  setToken (token) {
    this.token = token
    axios.defaults.headers.common.Authorization = token
  }

  deleteToken () {
    delete axios.defaults.headers.common.Authorization
  }
}

export const api = new API()
