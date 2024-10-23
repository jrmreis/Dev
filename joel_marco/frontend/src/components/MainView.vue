<template>
  <section class="main-view">
    <div class="container-scroller">
      <app-header/>
      <div class="container-fluid page-body-wrapper">
        <app-sidebar/>
        <div class="main-panel br-mainpanel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div>
          <app-footer/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
import AppHeader from './AppHeader'
import AppSidebar from './AppSidebar'
import AppFooter from './AppFooter'
export default {
  components: {
    AppFooter,
    AppHeader,
    AppSidebar
  }
}
</script>

<style scoped>

</style>
