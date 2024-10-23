<template>
  <div class="d-flex align-items-center justify-content-center ht-100v">
    <div class="login-wrapper wd-300 wd-xs-400 pd-25 pd-xs-40 bg-br-primary bd bd-white-1 rounded">
      <div class="signin-logo tx-center tx-28 tx-bold tx-white"><span class="tx-normal">[</span> Spark <span class="tx-info">WEB</span> <span class="tx-normal">]</span></div>
      <div class="tx-center mg-b-40">Cadastro de Usuários</div>
      <form class="form" method="post" action="handleSubmitForm" name="userForm">
        <div class="form-group">
          <label for="username" hidden>Usuário</label>
          <input type="text" class="form-control form-control-dark" placeholder="Usuário" id="username" name="username" v-model="user">
        </div><!-- form-group -->
        <div class="form-group">
          <label for="password" hidden>Senha</label>
          <input type="password" class="form-control form-control-dark" placeholder="Senha" id="password" name="password" v-model="password">
        </div><!-- form-group -->
        <div class="form-group">
          <label for="passwordConfirmation" hidden>Confirmação da Senha</label>
          <input type="password" class="form-control form-control-dark" placeholder="Repita a Senha" id="passwordConfirmation" name="passwordConfirmation" v-model="passwordConfirmation">
        </div><!-- form-group -->
        <button name="newUser" id="newUser" type="button" class="btn btn-info btn-block">Cadastrar</button>
      </form>
      <div class="mg-t-40 tx-center">Deseja modificar algum usuário? <a href="Atualizar.jsp" class="tx-info">Clique Aqui</a></div>
      <div class="mg-t-40 tx-center"> <a class="tx-info" href="<%=request.getContextPath()%>/LogoutServlet">Logout</a></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'UserForm',
  data () {
    return {
      user: '',
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    handleSubmitForm () {
      if (this.validatePassword()) {
        return true
      }
    },
    validatePassword () {
      if (this.password === this.passwordConfirmation) {
        return true
      } else {
        window.alert('Senhas se diferem!')
        return false
      }
    }
  }
}
</script>

<style scoped>

</style>
