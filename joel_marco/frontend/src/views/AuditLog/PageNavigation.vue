<!--<template>-->
<!--  <div class="e-pagertemplate">-->
<!--    <div v-if="pageable.sortAsc === false" class="pagination-label"> Paginação: Retrocedendo &#45;&#45; {{ pageable.currentPage + 1}} de {{ pageable.totalPages }} páginas ({{ pageable.totalElements }} itens) </div>-->
<!--    <div v-else class="pagination-label"> Paginação: Avançando &#45;&#45; {{ pageable.currentPage + 1}} de {{ pageable.totalPages }} páginas ({{ pageable.totalElements }} itens)</div>-->
<!--    <div class="control-section">-->
<!--      <div class="content-wrapper">-->

        <!--        <ul class="pagination" style="margin: 0">-->
        <!--          <li role="presentation" class="page-item">-->
        <!--              <span style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF" role="menuitem"-->
        <!--                    class="page-link" @click="goToPage(0)"> Primeira</span>-->
        <!--          </li>-->
        <!--          <li role="presentation" class="page-item">-->
        <!--              <span style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF" role="menuitem" class="page-link"-->
        <!--                    @click="goToPage(pageable.currentPage - 1)"> Anterior-->
        <!--              </span>-->
        <!--          </li>-->
        <!--          <li  v-show="pageable.currentPage > 1" role="separator" class="page-item disabled bv-d-xs-down-none">-->
        <!--            <span style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF" class="page-link">…</span>-->
        <!--          </li>-->
        <!--          <li v-show="pageable.currentPage > 0" role="presentation" class="page-item">-->
        <!--            <button-->
        <!--              style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF"-->
        <!--              role="menuitemradio" type="button" class="page-link" @click="goToPage(pageable.currentPage - 1)">-->
        <!--              {{ pageable.currentPage }}-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li role="presentation" class="page-item active">-->
        <!--            <button style="background-color: rgb(23, 162, 184); border-color: #1d2939; color: #FFFFFF"-->
        <!--                    role="menuitemradio" type="button" class="page-link">-->
        <!--              {{ pageable.currentPage + 1 }}-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li v-show="pageable.totalPages - pageable.currentPage > 0" role="presentation" class="page-item">-->
        <!--            <button style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF"-->
        <!--                    role="menuitemradio" type="button" class="page-link" @click="goToPage(pageable.currentPage + 1)">-->
        <!--              {{ pageable.currentPage + 2 }}-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li v-show="pageable.currentPage === 1 && pageable.totalPages - pageable.currentPage + 1 > 1" role="presentation" class="page-item">-->
        <!--            <button style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF"-->
        <!--                    role="menuitemradio" type="button" class="page-link" @click="goToPage(pageable.currentPage + 2)">-->
        <!--              {{ pageable.currentPage + 3 }}-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li v-show="pageable.totalPages - pageable.currentPage > 1"-->
        <!--              role="separator" class="page-item disabled bv-d-xs-down-none">-->
        <!--            <span style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF" class="page-link">…</span>-->
        <!--          </li>-->
        <!--          <li role="presentation" class="page-item">-->
        <!--            <button style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF"-->
        <!--                    role="menuitem" type="button" class="page-link" @click="goToPage(pageable.currentPage + 1)">-->
        <!--              Próxima-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li role="presentation" class="page-item">-->
        <!--            <button style="background-color: #1d2939; border-color: #2c3e50; color: #FFFFFF"-->
        <!--                    role="menuitem" type="button" class="page-link" @click="goToPage(pageable.totalPages - 1)">-->
        <!--              Última-->
        <!--            </button>-->
        <!--          </li>-->
        <!--          <li style="margin: 7px 0 0 15px; color: white">-->
        <!--            {{ pageable.currentPage + 1}} de {{ pageable.totalPages }} páginas ({{ pageable.totalElements }} itens)-->
        <!--          </li>-->
        <!--        </ul>-->

<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'PageNavigation',-->
<!--  props: ['fetch', 'pageable'],-->
<!--  methods: {-->
<!--    goToPage (page) {-->
<!--      this.fetch(page)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.pagination-label {-->
<!--  color: white;-->
<!--  text-align: left!important;-->
<!--  margin: 5px;-->
<!--}-->
<!--</style>-->
