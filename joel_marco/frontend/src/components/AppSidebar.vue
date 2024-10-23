<template>
  <section class="app-sidebar">
    <div class="br-logo">
      <a href=""><span>[</span>Spark <i>Web</i><span>]</span></a>
    </div>
    <div class="br-sideleft sideleft-scrollbar">
      <label class="sidebar-label"></label>
      <ul class="br-sideleft-menu">
        <li class="br-menu-item">
          <router-link to="/charts" class="br-menu-link">
            <ion-icon name="pie-chart-outline" class="tx-20"></ion-icon>
            <span class="menu-item-label">Gráficos</span>
          </router-link>
        </li><!-- br-menu-item -->
        <li class="br-menu-item">
          <router-link to="/logs" class="br-menu-link">
            <ion-icon name="analytics-outline" class="tx-20"></ion-icon>
            <span class="menu-item-label">Trilha</span>
          </router-link><!-- br-menu-link -->
        </li><!-- br-menu-item -->
        <li class="br-menu-item">
          <router-link to="/cont" class="br-menu-link">
            <ion-icon name="file-tray-full-outline" class="tx-20"></ion-icon>
            <span class="menu-item-label">Conteúdo</span>
          </router-link><!-- br-menu-link -->
        </li><!-- br-menu-item -->
      </ul>
      <br>
    </div>
  </section>
</template>

<script>
import JQuery from 'jquery'
const $ = JQuery
export default {
  name: 'AppSidebar',
  mounted () {
    const body = $('body')
    const menuItens = $('.menu-item-label')
    body.toggleClass('collapsed-menu')
    menuItens.toggleClass('op-lg-0-force d-lg-none')
    document.querySelectorAll('.br-sideleft').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.hasClass('collapsed-menu')) {
          body.toggleClass('collapsed-menu automatic')
          menuItens.toggleClass('op-lg-0-force d-lg-none')
        }
      })
      el.addEventListener('mouseout', function () {
        if (!body.hasClass('collapsed-menu') && body.hasClass('automatic')) {
          body.toggleClass('collapsed-menu automatic')
          menuItens.toggleClass('op-lg-0-force d-lg-none')
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
