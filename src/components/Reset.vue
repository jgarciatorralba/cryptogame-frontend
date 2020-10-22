<template>
  <div class="container cont-reset">
    <div class="text-center w-100">
      <form class="form-reset" autocomplete="off" method="POST" action="">

        <router-link to="/" class="text-decoration-none text-body">
          <img class="mb-2" src="./assets/img/cryptos.png" alt="" width="100" height="100">
        </router-link>

        <h1 class="h3 font-weight-normal">
          Forgot your password?
        </h1>
        <p class="mb-3 text-black-50">
          Enter your email to reset your password.
        </p>

        <label for="resetEmail" class="sr-only">
          Email address
        </label>
        <input 
          type="email" 
          id="resetEmail" 
          name="resetEmail" 
          class="form-control" 
          placeholder="Email address" 
          required 
          autofocus
        >

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Reset password
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
  /* GENERAL STYLES */
  html,
  body {
    height: 100%;
    background-color: #f5f5f5;
  }

  /* RESET PAGE */
  .cont-reset {
    height: 100vh;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;

    .form-reset {
      width: 100%;
      max-width: 330px;
      padding: 15px;
      margin: auto;
      .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
        &:focus {
          z-index: 2;
        }
        &[type="email"] {
          margin-bottom: 10px;
        }
      }
    }
  }
</style>