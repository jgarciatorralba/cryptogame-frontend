<template>
  <div>
    <div class="cont-message">
      <div
        v-if="error !== null"
        class="alert alert-danger alert-dismissible fade hide show"
      >
        <strong>Error! </strong>{{ error }}
        <button @click="dismissAlert" type="button" class="close">
          &times;
        </button>
      </div>

      <div
        v-if="success !== null"
        class="alert alert-success alert-dismissible fade hide show"
      >
        <strong>Success! </strong>{{ success }}
        <button @click="dismissAlert" type="button" class="close">
          &times;
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error", "success"],
  methods: {
    dismissAlert() {
      $(".cont-message").fadeOut(400);
    },
  },
  updated() {
    $(".cont-message").fadeIn(400);
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/errors.scss";
</style>