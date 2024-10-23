import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './modules/auth'
import { statistics } from './modules/statistics'
import { logs } from './modules/logs'
import { cont } from './modules/cont'
import { statusType } from './modules/statusType'
import { solicitation } from './modules/solicitation'
import { response } from './modules/response'
import { falconIn } from './modules/falconIn'
import { falconOut } from './modules/falconOut'
import { fields } from './modules/fields'
import { auditUser } from './modules/auditUser'
import { status } from './modules/status'
import { system } from './modules/system'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    statistics,
    logs,
    cont,
    statusType,
    solicitation,
    response,
    falconIn,
    falconOut,
    fields,
    auditUser,
    system,
    status
  }
})
