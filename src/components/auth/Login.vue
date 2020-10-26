<template>
  <div class="container cont-login">
    <div class="text-center w-100">
      <form class="form-login" autocomplete="off">
        <router-link to="/" class="text-decoration-none text-body">
          <img
            class="mb-2"
            src="../../assets/img/cryptos.png"
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

        <errors v-bind:error="error" v-bind:success="success"></errors>

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
import Errors from "../partials/Errors.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      success: null,
    };
  },
  components: {
    Errors,
  },
  methods: {
    validateForm(e) {
      e.preventDefault();

      let error = "";

      let password = this.password;
      const regExPassword = /^.{6,}$/;
      if (!regExPassword.test(password)) {
        error = "Password length must be 6 characters or more";
      }

      let email = this.email;
      const regExEmail = /\S+@\S+/;
      if (!regExEmail.test(email)) {
        error = "Invalid email format";
      }

      return error !== "" ? error : null;
    },
    sendForm(e) {
      let error = this.validateForm(e);
      if (error == null) {
        //Ajax request
        this.$http({
          method: "post",
          url: "http://localhost:3000/login",
          data: {
            email: this.email,
            password: this.password,
          },
          validateStatus: function (status) {
            return status >= 200 && status <= 500;
          },
        })
          .then((response) => {
            console.log(response);
            if (response.data.error !== null) {
              this.error = response.data.error;
            } else {
              //TODO JWT
            }
          })
          .catch((err) => {
            this.error = err.message;
          });
      } else {
        this.error = error;
      }
    },
  },
  mounted() {
    if (this.$route.params.success == undefined) {
      this.success = null;
    } else {
      this.success = this.$route.params.success;
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/login.scss";
</style>