<template>
  <div class="container cont-reset">
    <div class="text-center w-100">
      <form class="form-reset" autocomplete="off">
        <router-link to="/" class="text-decoration-none text-body">
          <img
            class="mb-2"
            src="../assets/img/cryptos.png"
            alt=""
            width="100"
            height="100"
          />
        </router-link>

        <h1 class="h3 font-weight-normal">Forgot your password?</h1>
        <p class="mb-3 text-black-50">
          Enter your email to reset your password.
        </p>

        <label for="resetEmail" class="sr-only"> Email address </label>
        <input
          type="email"
          v-model="email"
          id="resetEmail"
          name="resetEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />

        <errors v-bind:errors="errors"></errors>

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
import Errors from "../components/partials/Errors.vue";

export default {
  data() {
    return {
      email: "",
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
@import "../assets/scss/reset.scss";
</style>