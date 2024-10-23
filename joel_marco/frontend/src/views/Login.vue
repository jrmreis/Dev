<template>
  <div class="d-flex align-items-center justify-content-center ht-100v">
    <div class="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-br-primary rounded bd bd-white-1">
      <div class="signin-logo tx-center tx-28 tx-bold tx-white"><span class="tx-normal">[</span> Spark <span class="tx-info">WEB</span> <span class="tx-normal">]</span></div>
      <div class="tx-center mg-b-60">Central de Acesso</div>
      <div class="form-group">
        <form name="login" class="form" @submit.prevent="handleLoginSubmit" >
          <div class="form-group">
            <label for="username" hidden>Usuário</label>
            <input v-model="user" type="text" class="form-control form-control-dark" placeholder="Usuário" id="username" name="username">
          </div>
          <div class="form-group">
            <label for="password" hidden>Senha</label>
            <input v-model="password" type="password" class="form-control form-control-dark" placeholder="Senha" id="password" name="password">
          </div>
          <a hidden> <span style="color:red">Senha Incorreta</span></a>
          <button type="submit" class="btn btn-info btn-block">Login</button>
        </form>
      </div><!-- form-group -->
    </div><!-- login-wrapper -->
  </div><!-- d-flex -->
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    handleLoginSubmit () {
      const { user, password } = this
      this.$store.dispatch('auth/login', { user, password })
        .then(() => {
          this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped>

</style>
