<template>
  <div class="container cont-login">
    <div class="text-center w-100">
      <form class="form-login" autocomplete="off">
        
        <router-link to="/" class="text-decoration-none text-body">
          <img class="mb-2" src="../assets/img/cryptos.png" alt="" width="100" height="100">
        </router-link>

        <h1 class="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>

        <label for="loginEmail" class="sr-only">
          Email address
        </label>
        <input 
          type="email" 
          id="loginEmail" 
          name="loginEmail" 
          class="form-control" 
          placeholder="Email address" 
          required 
          autofocus
        >

        <label for="loginPassword" class="sr-only">
          Password
        </label>
        <input 
          type="password" 
          id="loginPassword" 
          name="loginPassword" 
          class="form-control" 
          placeholder="Password" 
          required
        >

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>

        <p class="my-1">
          Forgot your password?
          <router-link to="/reset" class="text-decoration-none text-body">
            <b>Reset here</b>.
          </router-link>
        </p>
        <p class="my-1">
          Don't have an account?
          <router-link to="/register" class="text-decoration-none text-body">
            <b>Register here</b>.
          </router-link>
        </p>
        <p class="mt-5 mb-3 text-muted">&copy; Cryptogame 2020</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  @import '../assets/scss/general.scss';
</style>

<style lang="scss" scoped>
  @import '../assets/scss/login.scss';
</style>