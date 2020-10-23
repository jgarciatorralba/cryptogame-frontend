<template>
  <div class="container cont-register">
    <div class="text-center w-100">
      <form class="form-register" autocomplete="off">
        <router-link to="/" class="text-decoration-none text-body">
          <img
            class="mb-2"
            src="../assets/img/cryptos.png"
            alt=""
            width="100"
            height="100"
          />
        </router-link>

        <h1 class="h3 mb-3 font-weight-normal">User registration</h1>

        <label for="registerName" class="sr-only"> Full Name </label>
        <input
          type="text"
          v-model="name"
          id="registerName"
          name="registerName"
          class="form-control"
          placeholder="Full Name"
          required
          autofocus
        />

        <label for="registerEmail" class="sr-only"> Email address </label>
        <input
          type="email"
          v-model="email"
          id="registerEmail"
          name="registerEmail"
          class="form-control"
          placeholder="Email address"
          required
        />

        <label for="registerPassword" class="sr-only"> Password </label>
        <input
          type="password"
          v-model="password"
          id="registerPassword"
          name="registerPassword"
          class="form-control"
          placeholder="Password"
          minlength="6"
          required
        />

        <errors v-bind:errors="errors"></errors>

        <button
          @click="sendForm"
          class="btn btn-lg btn-primary btn-block"
          type="submit"
        >
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
import Errors from "../components/partials/Errors.vue";

export default {
  data() {
    return {
      name: "",
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

      let name = this.name;
      if (name.length == 0) {
        let error = new Error("Full name is empty");
        errors.push(error);
      }

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
@import "../assets/scss/register.scss";
</style>