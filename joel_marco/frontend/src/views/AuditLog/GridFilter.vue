<template>
  <table class="table table-striped table-hover" id="logs-grid" style="margin-bottom: 0">
    <thead>
    <tr class="header-form">
      <th style="max-width: 55px!important; min-width: 55px!important;">
        <ul class="pagination" style="margin: 0">
          <li role="presentation" class="page-item">
            <button :disabled="loading" style="background-color: rgb(23, 162, 184); border-color: #2c3e50; color: #FFFFFF"
                    role="menuitem" class="page-link form-control" @click="previousPage()">
              <i class="fas fa-chevron-left"></i>
            </button>
          </li>
          <li role="presentation" class="page-item">
            <button :disabled="loading" style="background-color: rgb(23, 162, 184); border-color: #2c3e50; color: #FFFFFF"
                    role="menuitem" type="button" class="page-link form-control" @click="nextPage()">
              <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </th>
      <th>
        <date-picker default-panel="day" :clearable="false" style="width: 95px" prefix-class="xmx" type="date" v-model="filterDate" format="DD/MM/YYYY"></date-picker>
      </th>
      <th><date-picker :clearable="false"  style="width: 60px" prefix-class="xmx" type="time" v-model="filterTime" format="HH:mm" ></date-picker></th>
      <th>
        <select v-model="filteredServer" class="form-control form-control-dark" id="filteredServer" name="filteredServer" >
          <option selected value="null">Todos os servidores</option>
          <option v-for="option in serverOptions" v-bind:value="option" v-bind:key="option">
            {{ option }}
          </option>
        </select>
      </th>
      <th>
        <select v-model="filteredStatus" class="form-control form-control-dark" id="filteredStatus" name="filteredStatus" >
          <option selected value="null">Todos os status</option>
          <option v-for="option in statusOptions" v-bind:value="option" v-bind:key="option">
            {{ statusTypes[option] }}
          </option>
        </select>
      </th>
      <th >
        <div class="input-group input-group-dark">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-credit-card tx-16 lh-0 op-6"></i>
            </div>
          </div>
          <input id="card" type="number" class="form-control" placeholder="Buscar n° cartão" v-model="filteredPan">
        </div>
      </th>
      <th style="width: 130px;">
        <div style="width: 130px;" class="input-group input-group-dark right">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <i class="fas fa-book-open tx-16 lh-0 op-6"></i>
            </div>
          </div>
          <input style="padding: 0 0 0 5px" id="pag" type="number" class="form-control" name="pag" min="1" v-model="pageSize">
          <div class="input-group-append">
            <button :disabled="loading" class="btn btn-primary btn-block form-submit" style="background-color: rgb(23, 162, 184)" title="Filtrar" type="submit" @click="handleFilterSubmit">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </th>
    </tr>
    </thead>
  </table>
</template>

<script>
import DatePicker from 'vue2-datepicker'
export default {
  name: 'GridFilter',
  components: { DatePicker },
  props: ['pageable'],
  beforeMount () {
    this.pageSize = parseInt(window.innerHeight / 50)
    this.$store.dispatch('statusType/fetch')
    this.$store.dispatch('status/fetch')
    this.$store.dispatch('system/fetch')
  },
  data () {
    const now = new Date()
    // now.setHours(23, 59, 59, 999)
    return {
      filteredServer: null,
      filteredStatus: null,
      loading: false,
      filteredPan: null,
      filterDate: now,
      filterTime: now,
      pageSize: 20,
      sortAsc: true
    }
  },
  methods: {
    handleFilterSubmit () {
      this.loading = true
      const dateTime = this.filterDate
      // dateTime.setHours(this.filterTime.getHours(), this.filterTime.getMinutes(), this.filterTime.getSeconds())
      if (this.filteredPan && !(this.filteredPan.length === 6 || this.filteredPan.length === 19)) {
        this.loading = false
        return window.alert('Para realizar busca pelo número do cartão, você deve inserir o BIN (6 dígitos) ou os 19 dígitos')
      } else {
        this.$store.dispatch('logs/search', {
          date: dateTime,
          size: this.pageSize,
          server: this.filteredServer,
          status: this.filteredStatus,
          pan: this.filteredPan
        })
          .then(() => { this.loading = true })
          .catch(() => { this.loading = false })
      }
    },
    previousPage () {
      if (this.sortAsc && this.pageable.currentPage === 0) {
        this.sortAsc = !this.sortAsc
      } else if (this.sortAsc) {
        this.pageable.currentPage -= 1
      } else if (!this.sortAsc) {
        this.pageable.currentPage += 1
      }
      this.fetch(this.pageable.currentPage)
    },
    nextPage () {
      if (!this.sortAsc && this.pageable.currentPage === 0) {
        this.sortAsc = !this.sortAsc
      } else if (this.sortAsc) {
        this.pageable.currentPage += 1
      } else if (!this.sortAsc) {
        this.pageable.currentPage -= 1
      }
      this.fetch(this.pageable.currentPage)
    },
    fetch (page) {
      console.log(page)
      this.loading = true
      const dateTime = this.filterDate
      dateTime.setHours(this.filterTime.getHours(), this.filterTime.getMinutes(), this.filterTime.getSeconds())
      this.$store.dispatch('logs/search', {
        date: dateTime,
        page: this.pageable.currentPage,
        size: this.pageSize,
        server: this.filteredServer,
        status: this.filteredStatus,
        pan: this.filteredPan,
        sortAsc: this.sortAsc
      })
        .then(() => { this.loading = false })
        .catch(() => { this.loading = false })
    }
  },
  computed: {
    serverOptions () { return this.$store.getters['system/list'] },
    statusOptions () { return this.$store.getters['status/list'] },
    statusTypes () { return this.$store.getters['statusType/types'].dict }
  },
  watch: {
    filterDate (newDate, oldDate) { this.filterDate = newDate || oldDate },
    filterTime (newTime, oldTime) { this.filterTime = newTime || oldTime }
  }
}
</script>

<style scoped>
.page-link:disabled, .form-submit:disabled {
  background-color: grey!important;
}
.header-form th {
  padding: 5px 1px;
}
/*Escondendo as setas do input numerico*/
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.right {
  float: right;
}
</style>
