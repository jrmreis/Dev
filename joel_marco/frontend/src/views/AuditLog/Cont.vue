<template>
<!--  <table class="table table-striped table-hover" id="logs-grid" style="margin-bottom: 0">-->
<!--    <thead>-->
<!--    <tr class="header-form">-->
<!--      <th style="max-width: 55px!important; min-width: 55px!important;">-->
<!--        <ul class="pagination" style="margin: 0">-->
<!--          <li role="presentation" class="page-item">-->
<!--            <button :disabled="loading" style="background-color: rgb(23, 162, 184); border-color: #2c3e50; color: #FFFFFF"-->
<!--                    role="menuitem" class="page-link form-control" @click="previousPage()">-->
<!--              <i class="fas fa-chevron-left"></i>-->
<!--            </button>-->
<!--          </li>-->
<!--          <li role="presentation" class="page-item">-->
<!--            <button :disabled="loading" style="background-color: rgb(23, 162, 184); border-color: #2c3e50; color: #FFFFFF"-->
<!--                    role="menuitem" type="button" class="page-link form-control" @click="nextPage()">-->
<!--              <i class="fas fa-chevron-right"></i>-->
<!--            </button>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </th>-->
<!--      <th>-->
      <section class="logs" style="margin-top: 73px; margin-bottom: 10px">
        <div class="br-pagebody" style="padding: 0">
          <div class="br-section-wrapper" style="padding: 5px 10px 5px 10px">
            <div class="row">
              <div class="col-12">
                <form id="filter-logs-form" @submit.prevent="nothing">
                  <grid-filter :pageable="pageable"/>
                  <cont-grid/>
                  <page-navigation :pageable="pageable" :fetch="fetch" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <log-details :id="selected" v-show="selected != null" ref='details'/>
      </section>
    </template>
<script>
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'
// import LogDetails from '../LogDetails'
import GridFilter from '@/views/AuditLog/GridFilter'
import ContGrid from '@/views/AuditLog/ContGrid'
// import PageNavigation from '@/views/AuditLog/PageNavigation'

export default {
  name: 'Cont',
  components: { ContGrid, GridFilter },
  computed: {
    pageable () { return this.$store.getters['cont/pageable'] }
  },
  methods: {
    nothing () {
      return false
    },
    fetch (page) {
      this.$children[0].fetch(page)
    }
  },
  data () {
    return {
      selected: null
    }
  }
}
</script>

<style scoped>
</style>
