<template>
  <div class="container cont-register">
    <div class="text-center w-100">
      <form class="form-register" autocomplete="off">
        
        <router-link to="/" class="text-decoration-none text-body">
          <img class="mb-2" src="../assets/img/cryptos.png" alt="" width="100" height="100">
        </router-link>

        <h1 class="h3 mb-3 font-weight-normal">
          User registration
        </h1>

        <label for="registerName" class="sr-only">
          Full Name
        </label>
        <input 
          type="text" 
          id="registerName" 
          name="registerName" 
          class="form-control" 
          placeholder="Full Name" 
          required 
          autofocus 
        >

        <label for="registerEmail" class="sr-only">
          Email address
        </label>
        <input 
          type="email" 
          id="registerEmail" 
          name="registerEmail" 
          class="form-control" 
          placeholder="Email address" 
          required 
        >

        <label for="registerPassword" class="sr-only">
          Password
        </label>
        <input 
          type="password" 
          id="registerPassword" 
          name="registerPassword" 
          class="form-control" 
          placeholder="Password" 
          minlength="6" 
          required 
        >

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Create account
        </button>

        <p class="my-1">
          Back to
          <router-link to="/login" class="text-decoration-none text-body">
            <b>login</b>.
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

<style lang="scss" scoped>
  @import '../assets/scss/register.scss';
</style>