<template>
  <div class="modal fade" ref="logDetailsModal" id="logDetailsModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xl" role="document" style="min-width: 53%">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel" style="color: #17A2B8">Detalhes</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span style="color: white" aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="log">
          <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'transaction' }" style="color: white" class="nav-link" @click="handleTabClick('transaction')">Transação</a>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'user' }" style="color: white" class="nav-link" @click="handleTabClick('user')">Usuário</a>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'request' }" style="color: white" class="nav-link" @click="handleTabClick('request')">Solicitação</a>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'sent' }" style="color: white" class="nav-link" @click="handleTabClick('sent')">Enviado</a>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'received' }" style="color: white" class="nav-link" @click="handleTabClick('received')">Recebido</a>
            </li>
            <li class="nav-item">
              <a v-bind:class="{ active: tab === 'response' }" style="color: white" class="nav-link" @click="handleTabClick('response')">Resposta</a>
            </li>
          </ul>
          <div id="transaction" v-show="tab === 'transaction'">
            <div class="row">
              <div class="col-12">
                <table class="table table-hover table-striped table-sm">
                  <tbody>
                  <tr>
                    <td class="align-left">Data</td>
                    <td class="align-left">{{ getDate(log.transactionDatetime) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Hora</td>
                    <td class="align-left">{{ getTime(log.transactionDatetime) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Processo</td>
                    <td class="align-left">{{ log.pid }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Score</td>
                    <td class="align-left">{{ log.score }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Cartão</td>
                    <td class="align-left">{{ log.pan }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Status</td>
                    <td class="align-left">{{ statusTypes[log.status] }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo de Resposta Total</td>
                    <td class="align-left">{{ formatDuration(log.totalDuration) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo de Spark</td>
                    <td class="align-left">{{ formatDuration(log.sparkDuration) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo de Falcon</td>
                    <td class="align-left">{{ formatDuration(log.falconDuration) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo de LSDB</td>
                    <td class="align-left">{{ formatDuration(log.lsdbDuration) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo Tratando Scores</td>
                    <td class="align-left">{{ formatDuration(log.scoresDuration) }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">Tempo Tratando Reasons</td>
                    <td class="align-left">{{ formatDuration(log.reasonsDuration) }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="user" v-show="tab === 'user'">
            <div class="row">
              <div class="col-12">
                <textarea id="userTextArea" rows="10" cols="80" class="form-control-dark form-control" v-model="user.message">
                </textarea>
              </div>
            </div>
          </div>
          <div id="request" v-show="tab === 'request'">
            <div class="row">
              <div class="col-12">
                <table class="table table-hover table-striped table-sm">
                  <thead>
                  <tr>
                    <th class="align-left">Compr.</th>
                    <th class="align-left">Nome</th>
                    <th class="align-left">Valor</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="align-left">8</td>
                    <td class="align-left">IH_MSGLEN</td>
                    <td class="align-left">{{ request.messageLength }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_EXTHDRLEN</td>
                    <td class="align-left">{{ request.exthdrLength }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">3</td>
                    <td class="align-left">IH_MSG_TYPE</td>
                    <td class="align-left">{{ request.messageType }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">20</td>
                    <td class="align-left">IH_TOKEN</td>
                    <td class="align-left">{{ request.token }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">26</td>
                    <td class="align-left">IH_INITTIME</td>
                    <td class="align-left">{{ request.initTime }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">26</td>
                    <td class="align-left">IH_SENDTIME</td>
                    <td class="align-left">{{ request.sendTime }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">1</td>
                    <td class="align-left">IH_WAIT</td>
                    <td class="align-left">{{ request.wait }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">5</td>
                    <td class="align-left">IH_WAIT_INTERVAL</td>
                    <td class="align-left">{{ request.waitInterval }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">1</td>
                    <td class="align-left">IH_RESPONSE</td>
                    <td class="align-left">{{ request.response }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_SOURCE_IP</td>
                    <td class="align-left">{{ request.sourceIp }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_SOURCE</td>
                    <td class="align-left">{{ request.source }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_DEST</td>
                    <td class="align-left">{{ request.destination }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="sent" v-if="tab === 'sent'">
            <div class="row">
              <div class="col-12">
                <div class="table-wrapper">
                  <div class="table-scroll">
                    <table class="table table-hover table-striped table-sm">
                      <thead>
                      <tr>
                        <th class="align-left" style="width: 50px; border-width: 0 2px 0 0"><span class="text align-left" style="width: 50px">Compr.</span></th>
                        <th class="align-left"><span class="text align-left">Nome</span></th>
                        <th class="align-left"><span class="text align-right">Valor</span></th>
                      </tr>
                      </thead>
                      <tbody v-if="falconIn.message">
                      <tr v-for="(item, index) in fieldsIn" v-bind:key="index">
                        <td class="align-left">{{ item.length }}</td>
                        <td class="align-left">{{ item.name }}</td>
                        <td class="align-left">{{ falconIn.message.substr(item.position - 1, item.length) }}</td>
                      </tr>
                      </tbody>
                      <tbody v-else>
                      <tr>
                        <td class="align-left">{{ item.length }}</td>
                        <td class="align-left">{{ item.name }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="received" v-show="tab === 'received'">
            <div class="row" >
              <div class="col-12">
                <div class="table-wrapper">
                  <div class="table-scroll">
                    <table class="table table-hover table-striped table-sm">
                      <thead>
                      <tr>
                        <th class="align-left" style="width: 50px; border-width: 0 2px 0 0"><span class="text" style="width: 50px">Compr.</span></th>
                        <th class="align-left"><span class="text">Nome</span></th>
<!--                        <th class="align-left"><span class="text">Descrição</span></th>-->
                        <th class="align-left"><span class="text">Valor</span></th>
                      </tr>
                      </thead>
                      <tbody v-if="falconOut.message">
                      <tr v-for="(item, index) in out" v-bind:key="index">
                        <td class="align-left" style="border-width: 0 2px 0 0">{{ item.length }}</td>
                        <td class="align-left">{{ item.name }}</td>
                        <td class="align-left">{{ falconOut.message.substr(item.position - 1, item.length) }}</td>
                      </tr>
                      </tbody>
                      <tbody v-else>
                      <tr v-for="(item, index) in out" v-bind:key="index">
                        <td class="align-left" style="border-width: 0 2px 0 0">{{ item.length }}</td>
                        <td class="align-left">{{ item.name }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="response" v-show="tab === 'response'">
            <div class="row">
              <div class="col-12">
                <table class="table table-hover table-striped table-sm">
                  <thead>
                  <tr>
                    <th class="align-left">Compr.</th>
                    <th class="align-left">Nome</th>
                    <th>Valor</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td class="align-left">2</td>
                    <td class="align-left">IH_RETURN_CODE</td>
                    <td class="align-left">{{ response.returnCode }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">2</td>
                    <td class="align-left">IH_REASON_CODE</td>
                    <td class="align-left">{{ response.reasonCode }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">3</td>
                    <td class="align-left">IH_SCORE</td>
<!--                    <td class="align-left">{{ response.score }}</td>-->
                    <td class="align-left">{{ log.score }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">3</td>
                    <td class="align-left">IH_SCORE_ADAPT</td>
                    <td class="align-left">{{ response.scoreAdapt }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_REASON1</td>
                    <td class="align-left">{{ response.scoreReason1 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_REASON2</td>
                    <td class="align-left">{{ response.scoreReason2 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_REASON3</td>
                    <td class="align-left">{{ response.scoreReason3 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_ADAPT_R1</td>
                    <td class="align-left">{{ response.scoreAdaptR1 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_ADAPT_R2</td>
                    <td class="align-left">{{ response.scoreAdaptR2 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">4</td>
                    <td class="align-left">IH_SCORE_ADAPT_R3</td>
                    <td class="align-left">{{ response.scoreAdaptR3 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">3</td>
                    <td class="align-left">IH_DECLINE_REASON</td>
                    <td class="align-left">{{ response.declineReason }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_USER_DATA1</td>
                    <td class="align-left">{{ response.userData1 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_USER_DATA2</td>
                    <td class="align-left">{{ response.userData2 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_USER_DATA3</td>
                    <td class="align-left">{{ response.userData3 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_USER_DATA4</td>
                    <td class="align-left">{{ response.userData4 }}</td>
                  </tr>
                  <tr>
                    <td class="align-left">15</td>
                    <td class="align-left">IH_USER_DATA5</td>
                    <td class="align-left">{{ response.userData5 }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" style="background-color: #17A2B8">Fechar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

export default {
  name: 'LogDetails',
  props: ['id'],
  computed: {
    log () { return this.$store.getters['logs/selected'] },
    statusTypes () { return this.$store.getters['statusType/types'].dict },
    request () { return this.$store.getters['solicitation/get'] },
    response () { return this.$store.getters['response/get'] },
    user () { return this.$store.getters['auditUser/get'] },
    fieldsIn () { return this.$store.getters['fields/in'] },
    out () { return this.$store.getters['fields/out'] },
    falconIn () { return this.$store.getters['falconIn/get'] },
    falconOut () { return this.$store.getters['falconOut/get'] }
  },
  methods: {
    formatDuration (s) {
      if (s) {
        let microseconds = s.substr(2).replace('S', '')
        if (microseconds.length < 8) {
          for (let i = 0; i < (8 - microseconds.length); i++) {
            microseconds = microseconds + '0'
          }
        }
        microseconds = parseFloat(microseconds).toFixed(6)
        return `${microseconds}s`
      } else {
        return 'N/A'
      }
    },
    getDate (str) {
      return format(parseISO(str), 'dd/MM/yyyy')
    },
    getTime (str) {
      return format(parseISO(str), 'HH:mm:ss')
    },
    handleTabClick (str) {
      this.tab = str
    }
  },
  data () {
    return {
      tab: 'transaction'
    }
  }
}
</script>

<style scoped>
.modal-content{
  background-color: #1D2939;
}
.table-wrapper {
  position:relative;
}
.table-scroll {
  height: 450px;
  overflow:auto;
  margin-top:20px;
}
.table-wrapper table {
  width:100%;

}

.nav-link {
  cursor: pointer;
}
</style>
