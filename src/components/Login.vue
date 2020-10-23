<template>
  <div class="container cont-login">
    <div class="text-center w-100">
      <form class="form-login" autocomplete="off">
        <router-link to="/" class="text-decoration-none text-body">
          <img
            class="mb-2"
            src="../assets/img/cryptos.png"
            alt=""
            width="100"
            height="100"
          />
        </router-link>

        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label for="loginEmail" class="sr-only"> Email address </label>
        <input
          type="email"
          v-model="email"
          id="loginEmail"
          name="loginEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />

        <label for="loginPassword" class="sr-only"> Password </label>
        <input
          type="password"
          v-model="password"
          id="loginPassword"
          name="loginPassword"
          class="form-control"
          placeholder="Password"
          required
        />

        <errors v-bind:errors="errors"></errors>

        <button
          @click="sendForm"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
        >
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
import Errors from "../components/partials/Errors.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  components: {
    Errors,
  },
  methods: {
    validateForm(e) {
      e.preventDefault();

      let errors = [];

      let email = this.email;
      const regExEmail = /\S+@\S+/;
      if (!regExEmail.test(email)) {
        let error = new Error("Invalid email");
        errors.push(error);
      }

      let password = this.password;
      const regExPassword = /^.{6,}$/;
      if (!regExPassword.test(password)) {
        let error = new Error("Invalid password");
        errors.push(error);
      }

      return errors.length > 0 ? errors : null;
    },
    sendForm(e) {
      let errors = this.validateForm(e);
      if (errors == null) {
        console.log("Form OK! Send data to server");
        //TODO ajax request
      } else {
        this.errors = errors;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/login.scss";
</style>