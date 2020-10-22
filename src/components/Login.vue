<template>
  <div class="container cont-login">
    <div class="text-center w-100">
      <form class="form-login" autocomplete="off" method="POST" action="">
        <img class="mb-2" src="./assets/img/cryptos.png" alt="" width="100" height="100">
        <h1 class="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>
        <label for="loginEmail" class="sr-only">
          Email address
        </label>
        <input type="email" id="loginEmail" name="loginEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="loginPassword" class="sr-only">
          Password
        </label>
        <input type="password" id="loginPassword" name="loginPassword" class="form-control" placeholder="Password" required>

        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
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

<style lang="scss" scoped>
  /* GENERAL LOGIN-PAGES STYLES */
  html,
  body {
    height: 100%;
    background-color: #f5f5f5;
  }

  /* LOGIN PAGE */
  .cont-login {
    height: 100vh;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .form-login {
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
    }
    .form-control:focus{
      z-index: 2;
    }
    input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
</style>