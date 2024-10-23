<template lang="html">
  <section class="app-header br-header">
    <div class="br-header-left">
      <div class="navicon-left hidden-md-down">
        <a id="btnLeftMenu" href="#" @click="toggleSidebar()" >
          <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
      </div>
      <div class="navicon hidden-md-down" style="margin-left: 20px">
        <div class="row" v-show="route === 'Logs'">
          <div class="col-3" style="margin-top: 10px">
            <ion-icon name="analytics-outline" class="tx-50" style="color: #17A2B8"></ion-icon>
          </div>
          <div class="col-9" style="margin-top: 20px">
            <h4 align="left" style="color: white">Trilha de Auditoria</h4>
          </div>
        </div>
        <div class="row" v-show="route === 'Cont'">
          <div class="col-3" style="margin-top: 10px">
            <ion-icon name="file-tray-full-outline" class="tx-40" style="color: #17A2B8"></ion-icon>
          </div>
          <div class="col-9" style="margin-top: 20px; padding-left: 35px">
            <h4 align="left" style="color: white">Conteúdo</h4>
          </div>
        </div>
        <div class="row" v-show="route === 'Charts'">
          <div class="col-3" style="margin-top: 10px">
            <ion-icon name="pie-chart-outline" class="tx-40" style="color: #17A2B8"></ion-icon>
          </div>
          <div class="col-9" style="margin-top: 20px; padding-left: 35px">
            <h4 align="left" style="color: white">Gráficos</h4>
          </div>
        </div>
      </div>
      <div class="navicon-left hidden-lg-up">
        <a id="btnLeftMenuMobile" href="#">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
      </div>
    </div><!-- br-header-left -->
  </section>
</template>

<script lang="js">
import JQuery from 'jquery'
export default {
  name: 'AppHeader',
  computed: {
    route () {
      return this.$route.name
    }
  },
  methods: {
    toggleSidebar () {
      const menuText = JQuery('.menu-item-label,.menu-item-arrow')
      const body = JQuery('body')
      if (body.hasClass('collapsed-menu')) {
        body.removeClass('collapsed-menu')
        JQuery('.show-sub + .br-menu-sub').slideDown()
        JQuery('.br-sideleft').one('transitionend', function (e) {
          menuText.removeClass('op-lg-0-force')
          menuText.removeClass('d-lg-none')
        })
      } else {
        body.addClass('collapsed-menu')
        JQuery('.show-sub + .br-menu-sub').slideUp()
        menuText.addClass('op-lg-0-force')
        JQuery('.br-sideleft').one('transitionend', function (e) {
          menuText.addClass('d-lg-none')
        })
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
