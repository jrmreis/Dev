<template>
  <div>
    <div v-show="loading" style="margin-top: 150px">
      <h4 style="color: white"> Carregando </h4>
      <div class="loader"></div>
    </div>

    <ejs-grid ref='grid' locale='pt-BR'
              :recordDoubleClick="doubleClickHandler"
              :recordClick="singleClickHandler"
              :load='keyboardNavigationHandler'
              :dataSource="logs"
              :sortSettings='sortOptions'
              :allowGrouping='true'
              :allowSorting='true'
              :allowPaging='false'
              :allowFiltering='true'
              :dataBound='dataBound'>
      <e-columns>
        <e-column :visible='false' field='transactionDatetime' headerText='DATA' width='5'></e-column>
        <e-column textAlign='center' field='transactionDate' headerText='DATA' width='70'></e-column>
        <e-column textAlign='left' field='transactionTime' headerText='HORA' width='50'></e-column>
        <e-column textAlign='left' field='pid' headerText='PID' width='50' ></e-column>
        <e-column textAlign='left' field='system' headerText='SERVIDOR' width='60'></e-column>
        <e-column textAlign='center' field='status' headerText='STATUS' :formatter="statusFormatter" width='105'></e-column>
        <e-column textAlign='center' field='pan' headerText='CARTÃO' width='100'></e-column>
        <e-column textAlign='right' field='score' headerText='SCORE' width='60'></e-column>
        <e-column :formatter="tripFormatter" textAlign='right' field='trip' headerText='TRIP' width='50'></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
import Vue from 'vue'
import jQuery from 'jquery'
import parseISO from 'date-fns/parseISO'
import { L10n, setCulture } from '@syncfusion/ej2-base'
import { GridPlugin, Group, Sort } from '@syncfusion/ej2-vue-grids'
import { PORTUGUESE } from '@/views/AuditLog/locale'

setCulture('pt-BR')
L10n.load(PORTUGUESE)
Vue.use(GridPlugin)

export default {
  name: 'Grid',
  provide: { grid: [Group, Sort] },
  beforeMount () {
    this.loading = true
    this.$store.dispatch('statusType/fetch')
    this.pageSize = parseInt(window.innerHeight / 50)
    this.$store.dispatch('logs/fetchLastDate', { size: this.pageSize })
      .then(resp => {
        this.pageCount = resp.totalPages
        this.totalRecordsCount = resp.totalElements
        const lastDate = parseISO(resp.content[0].transactionDatetime)
        this.filterTime = lastDate
        this.filterDate = lastDate
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  mounted () {
    jQuery('#logDetailsModal').on('hidden.bs.modal', () => {
      this.enterPressed ? this.selectRow(this.selectedRow + 1) : this.selectRow(this.selectedRow)
    })
  },
  data () {
    return {
      selectionOptions: { type: 'Single', mode: 'Row' },
      sortOptions: { columns: [{ field: 'transactionDatetime', direction: 'Descending' }] },
      pageCount: 0,
      totalRecordsCount: 0,
      sortAsc: true,
      selectedRow: -1,
      enterPressed: false,
      loading: false
    }
  },
  methods: {
    formatDuration (microseconds) {
      if (microseconds) {
        if (microseconds.length < 8) {
          for (let i = 0; i < (8 - microseconds.length); i++) {
            microseconds = microseconds + '0'
          }
        }
        microseconds = parseFloat(microseconds).toFixed(3)
        return `${microseconds}s`
      } else {

      }
    },
    keyboardNavigationHandler (args) {
      this.$refs.grid.$el.addEventListener('keydown', (e) => {
        e.preventDefault()
        if (e.keyCode === 13) {
          this.enterPressed = true
          this.selectedRow = this.$refs.grid.getSelectedRowIndexes()[0]
          this.openModal()
          this.selectRow(this.selectedRow - 1)
        }
      })
    },
    selectRow (rowIndex) {
      this.$refs.grid.selectRow(rowIndex, false)
      this.selectedRow = rowIndex
    },
    singleClickHandler (args) {
      this.enterPressed = false
      const index = args.rowIndex
      if (this.selectedRow === index) this.openModal()
      else this.selectedRow = index
    },
    doubleClickHandler () {
      this.enterPressed = false
      this.selectRow(this.selectedRow)
      this.openModal()
    },
    openModal () {
      const log = this.$refs.grid.getSelectedRecords()[0]
      this.selected = log
      this.$store.commit('logs/setSelected', log)
      this.$store.dispatch('fields/fetch')
      this.$store.dispatch('logs/details', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      this.$store.dispatch('solicitation/fetch', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      this.$store.dispatch('falconIn/fetch', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      this.$store.dispatch('falconOut/fetch', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      this.$store.dispatch('response/fetch', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      this.$store.dispatch('auditUser/fetch', {
        date: log.transactionDatetime,
        system: log.system,
        token: log.token
      })
      jQuery('#logDetailsModal').modal()
    },
    dataBound () {
      if (this.$refs.grid.ej2Instances.groupModule.groupSettings.columns.length) {
        this.$refs.grid.ej2Instances.groupModule.collapseAll()
      }
    },
    statusFormatter (value, data) {
      return this.statusTypes[data.status]
    },
    tripFormatter (value, data) {
      if (data.trip) {
        let microseconds = '' + data.trip
        if (microseconds.length < 6) {
          for (let i = 0; i < (6 - microseconds.length); i++) {
            microseconds = microseconds + '0'
          }
        }
        let microsseconds = parseInt(microseconds) / 1000000
        microsseconds = parseFloat(microsseconds).toFixed(6)
        return `${microsseconds}s`
      } else {
        return 'N/A'
      }
    }
  },
  computed: {
    logs () { return this.$store.getters['logs/logs'] },
    statusTypes () { return this.$store.getters['statusType/types'].dict }
  }
}
</script>

<style scoped>

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid rgb(23, 162, 184); /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  text-align: center;
  margin: auto;
  padding: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
