<template>
  <section class="charts" style="margin-top: 73px; margin-bottom: 10px">
    <div class="br-pagebody" style="padding: 0">
      <div class="br-section-wrapper" style="padding: 5px 10px 5px 10px; height:88vh;">
        <h6 class="br-section-label" style="margin-top: 10px">{{ title }}</h6>
        <form id="filter-charts-form" @submit.prevent="handleFilterSubmit">
          <table width="50%" align="center">
            <thead>
            <tr>
              <th width="25%" style="color: white"> Data Final</th>
              <th width="25%" style="color: white"> Hora Final</th>
              <th width="40%" style="color: white"> Intervalo / Tempo</th>
              <th width="10%" style="color: white"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <date-picker
                  default-panel="day"
                  style="width: 100%"
                  :clearable="false"
                  prefix-class="xmx"
                  type="date"
                  v-model="endDatetime"
                  id="end-date"
                  format="DD/MM/YYYY">
                </date-picker>
              </td>
              <td>
                <date-picker
                  style="width: 100%"
                  :clearable="false"
                  prefix-class="xmx"
                  type="time"
                  v-model="endDatetime"
                  id="end-time"
                  format="HH:mm:ss">
                </date-picker>
              </td>
              <td>
                <div class="input-group input-group-dark" >
                  <input type="number" class="form-control" v-model="interval">
                  <select v-model="intervalType" class="form-control form-control-dark" id="intervalType" name="intervalType" >
                    <option value="seconds">Segundos</option>
                    <option selected value="minutes">Minutos</option>
                    <option value="hours">Horas</option>
                    <option value="days">Dias</option>
                    <option value="months">Meses</option>
                    <option value="years">Anos</option>
                  </select>
                </div>
              </td>
              <td>
                <button class="btn btn-primary btn-block" title="Filtrar">
                  <i class="fa fa-search"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
        <div v-show="loading" style="margin-top: 150px">
          <h4 style="color: white"> Carregando </h4>
          <div class="loader"></div>
        </div>
        <div v-show="!loading" class="chart-container" style="height:68vh;">
          <canvas ref="myChart"></canvas>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import parseISO from 'date-fns/parseISO'
import subSeconds from 'date-fns/subSeconds'
import subMinutes from 'date-fns/subMinutes'
import subHours from 'date-fns/subHours'
import subDays from 'date-fns/subDays'
import subWeeks from 'date-fns/subWeeks'
import subMonths from 'date-fns/subMonths'
import subYears from 'date-fns/subYears'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'
import Chart from 'chart.js'
// import { Line, mixins } from 'vue-chartjs' //https://vue-chartjs.org/guide/#updating-charts
// const { reactiveProp } = mixins            //https://vue-chartjs.org/guide/#updating-charts

export default {
  // extends: Line,                           //https://vue-chartjs.org/guide/#updating-charts
  // mixins: [reactiveProp],                  //https://vue-chartjs.org/guide/#updating-charts
  // props: ['options'],                      //https://vue-chartjs.org/guide/#updating-charts
  name: 'Charts',
  components: { DatePicker },
  beforeMount () {
    const to = new Date()
    const from = subHours(to, 42)
    // this.renderChart(this.chartData, this.options)   //https://vue-chartjs.org/guide/#updating-charts
    this.loading = true
    this.$store.dispatch('statistics/fetchChartData', { intervalType: this.intervalType, to: to, from: from })
      .then(resp => {
        // this.endDatetime = parseISO(resp[resp.length - 1].split(',')[1])
        this.chart = this.createChart()
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  data () {
    const now = new Date()
    return {
      title: 'Volumetria por período de tempo',
      interval: 42,
      intervalType: 'hours',
      endDatetime: now,
      chart: null,
      loading: false
    }
  },
  computed: {
    labels () {
      return this.$store.getters['statistics/labels']
    },
    datasets () {
      return this.$store.getters['statistics/datasets']
    }
  },
  methods: {
    handleFilterSubmit () {
      this.loading = true
      let from = null
      switch (this.intervalType) {
        case 'seconds':
          from = subSeconds(this.endDatetime, this.interval)
          break
        case 'minutes':
          from = subMinutes(this.endDatetime, this.interval)
          break
        case 'hours':
          from = subHours(this.endDatetime, this.interval)
          break
        case 'days':
          from = subDays(this.endDatetime, this.interval)
          break
        case 'weeks':
          from = subWeeks(this.endDatetime, this.interval)
          break
        case 'months':
          from = subMonths(this.endDatetime, this.interval)
          break
        case 'years':
          from = subYears(this.endDatetime, this.interval)
          break
      }
      this.$store.dispatch('statistics/fetchChartData', {
        intervalType: this.intervalType,
        from: from,
        to: this.endDatetime
      })
        .then(() => {
          this.chart.destroy()
          this.chart = this.createChart()
          this.loading = false
          // Ativar config
          this.chart = this.update(10)
        })
        .catch(() => {
          this.loading = false
        })
    },
    createChart () {
      const ctx = this.$refs.myChart
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: this.datasets
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: 'rgba(255,255,255,0.7)',
              fontStyle: 'bold'
            }
          },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Somatório de TPS dos Agentes'
              }
            }]
          }
        }
      })
    },
    watch: {
      // endDatetime (newDate, oldDate) { this.endDatetime = newDate || oldDate }
      endDatetime (newDate, oldDate) { this.endDatetime = newDate || oldDate }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 50vh;
  width: 100%;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
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
  100% { transform: rotate(1080deg); }
}
</style>
