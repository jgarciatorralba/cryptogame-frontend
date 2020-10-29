<template>
  <div class="container cont-reset">
    <div class="text-center w-100">
      <form class="form-reset" autocomplete="off">
        <router-link to="/" class="text-decoration-none text-body">
          <img
            class="mb-2"
            src="../../assets/img/cryptos.png"
            alt=""
            width="100"
            height="100"
          />
        </router-link>

        <h1 class="h3 font-weight-normal">Password reset</h1>
        <p class="mb-3 text-black-50">
          Enter your new password and take a note!
        </p>

        <label for="resetPassword" class="sr-only"> New Password </label>
        <input
          type="password"
          v-model="password"
          id="resetPassword"
          name="password"
          class="form-control"
          placeholder="New Password"
          required
          autofocus
        />

        <errors v-bind:error="error" v-bind:success="success"></errors>

        <button
          @click="sendForm"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
        >
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
import Errors from "../partials/Errors.vue";

export default {
  data() {
    return {
      password: "",
      error: null,
      success: null,
      token: this.$route.query.token
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

      return error !== "" ? error : null;
    },
    sendForm(e) {
      let error = this.validateForm(e);
      if (error == null) {

        this.$http("http://localhost:3000/password/reset", {
          method: "POST",
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
          data: { password: this.password },
        })
          .then((data) => {
            this.$router.push({
              name: "Login",
              params: {
                success: data.data.data,
              },
            });
          })
          .catch((e) => {
            this.error = e.message;
          });
      } else {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/reset.scss";
</style>